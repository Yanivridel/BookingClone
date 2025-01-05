import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { MongoError } from 'mongodb'; 
import { userModel } from "../models/userModel";
import jwt from 'jsonwebtoken';

// utils imports
import { AuthenticatedRequest } from 'src/types/expressTypes';
import { IProperty, TPartialProperty } from 'src/types/propertyTypes';
import { propertyModel } from './../models/propertyModel';
console.log(require.resolve("src/utils/maps"));
import { getCoordinatesByLocation } from 'src/utils/maps';
import { roomModel } from 'src/models/roomModel';
import { IRoom } from 'src/types/roomTypes';

// Create Property
export const createProperty = async (req: Request<{},{},TPartialProperty> , res: Response): Promise<void> => {
    try {
        let propertyData = req.body;

        // Validate required fields
        if (!propertyData.title || !propertyData.type || !propertyData.location || !propertyData.images?.length || !propertyData.popularFacilities?.length || !propertyData.host) {
            res.status(400).json({
                status: "error",
                message: "Missing required fields: title, location, images, popularFacilities, and host are required.",
            });
            return;
        }

        let completeAddress = propertyData.location.country || "";
        if(propertyData.location.region) completeAddress += " " + propertyData.location.region;
        if(propertyData.location.city) completeAddress += " " + propertyData.location.city;
        if(propertyData.location.addressLine) completeAddress += " " + propertyData.location.addressLine;
        const coordinates = await getCoordinatesByLocation(completeAddress);

        if (!coordinates) {
            res.status(400).json({status: "error", message: 'Invalid location provided' });
            return;
        }

        propertyData.location.coordinates = { 
            type: "Point",
            coordinates
        };

        // Create new property with full schema
        const newProperty = new propertyModel(propertyData);
        await newProperty.save();

        res.status(201).json({
            status: "success",
            message: "Property created successfully",
            data: newProperty,
        });

    } catch (error) {
        console.log(error); // dev mode
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}

// Get / Filter Properties
interface getPropertiesBody {
    country: string;
    region: string;
    city: string;
    addressLine: string;
    startDate: string;
    endDate: string;
    adults: number;
    children: number;
    childrenAges: number[];
    room_num: number;
    isAnimalAllowed: boolean;
}
export const getProperties = async (req: Request<{},{},getPropertiesBody> , res: Response): Promise<void> => {
    try {
        // Missing: child ages / need child bed
        const { country, region, city, addressLine, startDate, endDate, adults, children, childrenAges, room_num, isAnimalAllowed } = req.body;

        // Build initial location query
        let locationQuery: any = {};
        if (country) locationQuery["location.country"] = { $regex: new RegExp(country, 'i') };
        if (region) locationQuery["location.region"] = { $regex: new RegExp(region, 'i') };
        if (city) locationQuery["location.city"] = { $regex: new RegExp(city, 'i') };
        if (addressLine) locationQuery["location.addressLine"] = { $regex: new RegExp(addressLine, 'i') };

        // Step 1: Search for properties by location
        let properties: any = await propertyModel.find(locationQuery);

        // If no properties found or too few, apply 15km radius search
        // if (properties.length === 0) {
        //     const coordinates = await getCoordinatesByLocation(`${addressLine}, ${city}, ${region}, ${country}`);
        //     if (!coordinates) {
        //         res.status(400).json({ status: "error", message: "Invalid address or coordinates not found" });
        //         return;
        //     }

        //     properties = await propertyModel.find({
        //         "location.coordinates": {
        //             $near: {
        //                 $geometry: { type: "Point", coordinates },
        //                 $maxDistance: 15000, // 15km radius
        //             },
        //         },
        //     });
        // }

        properties = await Promise.all(properties.map(async (property: IProperty) => {
            // Step 2: Find all available rooms for this property
            const rooms = await roomModel.find({ _id: { $in: property.rooms } });

            // Step 3: Try to find the best fit combination of rooms
            const selectedRooms: string[] = [];
            const totalGuests = req.body.adults + req.body.children;
            const roomNumRequired = req.body.room_num;

            // Step 4: Sort rooms by closest fit (ascending order by max_guests)
            const sortedRooms = rooms
                .map(room => ({
                    room,
                    maxGuests: room.max_guests as number,
                    minAvailable: getMinimumAvailability(room, req.body.startDate, req.body.endDate)
                }))
                .filter(({ minAvailable }) => minAvailable > 0) // Ensure at least one room is available
                .sort((a, b) => a.maxGuests - b.maxGuests); // Prioritize best-fit rooms

            let remainingGuests = totalGuests;
            let remainingRooms = roomNumRequired ?? Infinity; // If no room number is specified, allow any combination

            for (const { room, maxGuests } of sortedRooms) {
                if (remainingGuests <= 0 || remainingRooms <= 0) break;

                let effectiveGuests = maxGuests;

                // Step 5: Check if babies don't need a dedicated space
                if (childrenAges.some(age => age <= 3) && room.baby) {
                    effectiveGuests += childrenAges.filter(age => age <= 3).length;
                }

                if (effectiveGuests >= remainingGuests) {
                    // This room alone is sufficient
                    selectedRooms.push(room._id.toString());
                    remainingGuests = 0;
                    remainingRooms--;
                    break;
                } else {
                    // Partial fit, take this room and continue searching
                    selectedRooms.push(room._id.toString());
                    remainingGuests -= effectiveGuests;
                    remainingRooms--;
                }
            }

            // If not enough rooms found, discard property
            if (remainingGuests > 0) return null;

            // Step 6: Check pet policy
            if (req.body.isAnimalAllowed && !property.houseRules.pets) return null;

            return { ...property.toObject(), selectedRooms };
        }));

        // Step 2: Filter properties by availability based on rooms and date range
        // properties = await Promise.all(properties.map(async (property: IProperty) => {
        //     const availableRoom: IRoom[] = await roomModel.find({
        //         _id: { $in: property.rooms },
        //         "available.date": { $gte: new Date(startDate), $lte: new Date(endDate) },
        //         "available.count": { $gte: 1 }, // Ensure room availability on each date
        //     });

        //     // Check if the rooms meet the required capacity (adults, children, rooms)
        //     const totalGuests = adults + children;
        //     let isValid = false;
        //     for (const room of availableRoom) {
        //         const maxGuests = room.max_guests as number;
        //         if (room.rooms.length >= room_num && maxGuests >= totalGuests) {
        //             isValid = true;
        //             break;
        //         }
        //     }

        //     // Step 3: Check if the property allows pets
        //     if (isAnimalAllowed && !property.houseRules.pets) {
        //         isValid = false;
        //     }

        //     // Step 4: Return only valid properties
        //     return isValid ? property : null;
        // }));

        // Filter out null values (invalid properties)
        properties = properties.filter((property: IProperty) => property !== null);

        // Return the results
        res.status(200).json({
            status: "success",
            message: "Properties found successfully",
            data: properties,
        });
        
    } catch (error) {
        console.log(error); // dev mode
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}

// Help Function
function getMinimumAvailability(room: IRoom, startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let minAvailable = room.overall_count;

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        const availability = room.available.find(av => av.date.toISOString().split('T')[0] === dateStr);
        const count = availability ? availability.count : room.overall_count;
        minAvailable = Math.min(minAvailable, count);
    }
    
    return minAvailable;
};

/*
export const getAllLessons = async (req: Request, res: Response): Promise<void> => {
    try {

        const lessons = await lessonModel.find().populate("teacher");

        if (!lessons) {
            res.status(404).json({ status:"error", message: 'There are no lessons' });
            return;
        }

        res.status(200).send({
            status: "success",
            message: "Lessons found successfully",
            lessons
        })
    } catch (error) {
        console.log(error); // dev mode
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}

// REGISTER FOR LESSON
export const registerForLesson = async (req: Request, res: Response): Promise<void> => {
    try {
        const { lessonId } = req.params;
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;

        if (!userId || !lessonId) {
            res.status(400).send({status: "error", message: "Missing required parameters"});
            return;
        }

        const lesson = await lessonModel.findById(lessonId);
        if (!lesson) {
            res.status(404).json({ status: 'error', message: 'Lesson not found' });
            return;
        }

        const userIdObjectId = new mongoose.Types.ObjectId(userId);

        if (lesson.participants.includes(userIdObjectId)) {
            res.status(400).json({ status: 'error', message: 'User already registered for this lesson' });
            return;
        }

        lesson.participants.push(userIdObjectId);
        await lesson.save();

        await userModel.findByIdAndUpdate({ _id: userId }, { $addToSet: { schedule: lessonId } });

        res.status(200).json({ status: 'success', message: 'User registered for the lesson successfully', lesson });
    
    } catch (error) {
        console.log(error); // dev mode
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};


// EDIT LESSON
interface editLessonRequestBody {
    lessonId ?: string;
    description?: string;
    startDate?: string;
    duration?: string;
}
export const editLesson = async (req: Request<{},{}, editLessonRequestBody>, res: Response): Promise<void> => {
    try {
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;
        const { description, startDate, duration, lessonId } = req.body;

        if(!lessonId) {
            res.status(400).send({status: "error", message: "Missing required parameters"});
            return;
        }

        const fieldsToUpdate: editLessonRequestBody = {  } ;
        if(description) fieldsToUpdate["description"] = description;
        if(startDate) fieldsToUpdate["startDate"] = startDate;
        if(duration) fieldsToUpdate["duration"] = duration;

        const updatedLesson = await lessonModel.findOneAndUpdate(
            { _id: lessonId, teacher: userId },
            fieldsToUpdate,
            { new: true }
        );

        if (!updatedLesson) {
            res.status(404).json({
                status: "error",
                message: "Lesson not found",
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: "Lesson updated successfully",
            user: updatedLesson,
        });
    } catch (error) {
        console.log(error); // dev mode
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}

//  DELETE LESSON
export const deleteLesson = async (req: Request, res: Response): Promise<void> => {
    try {
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;
        const { id: lessonId } = req.params;

        if(!lessonId || !userId) {
            res.status(400).send({status: "error", message: "Missing required parameters"});
            return;
        }

        const updatedLesson = await lessonModel.findOneAndDelete(
            { _id: lessonId, teacher: userId }
        );

        if (!updatedLesson) {
            res.status(404).json({
                status: "error",
                message: "Lesson not found",
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: "Lesson deleted successfully",
        });
    } catch (error) {
        console.log(error); // dev mode
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}

*/