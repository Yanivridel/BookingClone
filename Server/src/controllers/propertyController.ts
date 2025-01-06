import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { MongoError } from 'mongodb'; 
import { userModel } from "../models/userModel";
import jwt from 'jsonwebtoken';

// utils imports
import { AuthenticatedRequest } from 'src/types/expressTypes';
import { IProperty, TPartialProperty } from 'src/types/propertyTypes';
import { propertyModel } from './../models/propertyModel';
import { getCoordinatesByLocation } from 'src/utils/maps';
import { roomModel } from 'src/models/roomModel';
import { IRoom } from 'src/types/roomTypes';
import { getCache, setCache } from 'src/utils/redisClient';

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
// add page / limit - pagination
interface IGetPropertiesBody {
    country?: string;
    region?: string;
    city?: string;
    addressLine?: string;
    startDate: string;
    endDate: string;
    adults?: number;
    children?: number;
    childrenAges?: number[];
    rooms?: number;
    isAnimalAllowed?: boolean;
    distance?: number; // km
}
interface IGetPropertiesQuery {
    page?: string;
    limit?: string;
}
export const getSearchProperties = async (req: Request<{},{},IGetPropertiesBody, IGetPropertiesQuery> , res: Response): Promise<void> => {
    try {
        // Missing: child ages / need child bed
        let { country, region, city, addressLine, startDate, endDate, adults, childrenAges,
            rooms, distance, isAnimalAllowed } = req.body;

        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : 15;
        const skip = (page - 1) * limit;

        // Default parameters
        let isBaby = false, children = 0;
        adults ??= 1
        rooms ??= 1;
        isAnimalAllowed ??= false; 
        distance ??= 15;

        if(childrenAges){
            isBaby = childrenAges.some((age: number) => age <= 3);
            children = (childrenAges.filter((age: number) => age > 3)).length;
        }

        const cacheKey = JSON.stringify({
            country, region, city, addressLine,
            startDate, endDate, adults, children_num: children,
            rooms, distance, isAnimalAllowed
        }, (key, value) => value === undefined ? null : value);

        const cachedProperties = await getCache(cacheKey);
        if (cachedProperties) {
            // If found in cache, LOGIC HERE LATER
            res.status(200).json({
                status: "success",
                message: "Properties found from cache!!!!!",
                data: cachedProperties,
            });
            return
        }

        const coordinates = await getPropertyCoordinates(country,region,city,addressLine);

        // check coordinates (in client -> if fail take default)
        if (!coordinates) {
            res.status(400).json({ status: "error", message: "Invalid address or coordinates not found" });
            return;
        }

        // Get sorted paginated properties by distance
        let properties: IProperty[] = await getPropertiesByRadius(coordinates, distance, limit);
        
        // properties = await filterPropertiesMainSearch(properties, adults_num, children_num,
        //     rooms_num, startDate, endDate, isBaby, isAnimalAllowed)

        // Background Task: Fetch all properties & filter & store in Redis
        setImmediate(async () => {
            await setCacheMainSearch(cacheKey, coordinates, isBaby, children, adults, 
                rooms, startDate, endDate, distance, isAnimalAllowed);
        });

        // Return the 15 first results
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
interface IGetCachedPropertiesBody {
    userIdIp: string,
}
export const getCachedProperties = async (req: Request<{},{},IGetCachedPropertiesBody, IGetPropertiesQuery> , res: Response): Promise<void> => {
    try {
        const { userIdIp } = req.body;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : 15;
        const skip = (page - 1) * limit;

        const properties = await getCache(userIdIp);

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

// Help Functions
async function getPropertyCoordinates(country?: string, region?: string, city?: string, addressLine?: string) {
    let locationQuery: any = {};
        if (country) locationQuery["location.country"] = { $regex: new RegExp(country, 'i') };
        if (region) locationQuery["location.region"] = { $regex: new RegExp(region, 'i') };
        if (city) locationQuery["location.city"] = { $regex: new RegExp(city, 'i') };
        if (addressLine) locationQuery["location.addressLine"] = { $regex: new RegExp(addressLine, 'i') };

        return await getCoordinatesByLocation(`${addressLine}, ${city}, ${region}, ${country}`);
}
async function getPropertiesByRadius(coordinates: number[], distance: number, limit?: number,) {
    let query = propertyModel.find({
        "location.coordinates": {
            $near: {
                $geometry: { type: "Point", coordinates },
                $maxDistance: distance * 1000 // 15km radius default
            },
        },
    })
    if(limit) query.limit(limit);
    return query.exec();
}
async function filterPropertiesMainSearch(properties: IProperty[], adults_num: number, children_num: number,
    rooms_num: number, startDate: string, endDate: string, isBaby:boolean, isAnimalAllowed?:boolean,): Promise<IProperty[]> {

    properties = await Promise.all(properties.map(async (property: IProperty) => {
        // Check pet policy
        if (isAnimalAllowed && !property.houseRules.pets) return null;

        // Step 2: Find all available rooms for this property
        const rooms = await roomModel.find({ _id: { $in: property.rooms } });

        // Step 3: Try to find the best fit combination of rooms
        const selectedRooms: string[] = [];
        const totalGuests = adults_num + children_num;
        const roomNumRequired = rooms_num;

        // Step 4: Sort rooms by closest fit (ascending order by max_guests)
        const sortedRooms = rooms
            .map(room => ({
                room,
                maxGuests: room.max_guests as number,
                minAvailable: getMinimumAvailability(room, startDate, endDate)
            }))
            .filter(({ minAvailable }) => minAvailable > 0) // Ensure at least one room is available
            .sort((a, b) => a.maxGuests - b.maxGuests); // Prioritize best-fit rooms

        let remainingGuests = totalGuests;
        let remainingRooms = roomNumRequired ?? Infinity; // If no room number is specified, allow any combination

        for (const { room, maxGuests } of sortedRooms) {
            if (remainingGuests <= 0 || remainingRooms <= 0) break;

            let effectiveGuests = maxGuests;

            // Step 5: Check if babies don't need a dedicated space
            // if (childrenAges && childrenAges.some(age => age <= 3) && room.baby) {
            //     effectiveGuests += childrenAges.filter(age => age <= 3).length;
            // }

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

        

        return { ...property.toObject(), selectedRooms };
    }));

    // Filter out null values
    return properties.filter((property: IProperty) => property !== null);
} 
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
async function setCacheMainSearch(cacheKey: string, coordinates: number[], isBaby: boolean, children_num: number, 
    adults_num: number, rooms_num: number, startDate: string, endDate: string, distance: number, isAnimalAllowed?: boolean) {

    // Get sorted paginated properties by distance
    let properties: IProperty[] = await getPropertiesByRadius(coordinates, distance);
    
    // properties = await filterPropertiesMainSearch(properties, adults_num, children_num,
    //     rooms_num, startDate, endDate, isBaby, isAnimalAllowed)

    setCache(cacheKey, properties, 60 * 60 * 24);
}

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