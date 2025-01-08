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

// Get & Filter Properties
interface IGetPropertiesBody {
    primary: {
        location: IFilterPropertiesLocation
        date: IFilterPropertiesDate
        options: IFilterPropertiesOptions
        
    };
    secondary: {

    };
}
interface IFilterPropertiesLocation {
    country?: string;
    region?: string;
    city?: string;
    addressLine?: string;
}
interface IFilterPropertiesDate {
    startDate?: string;
    endDate?: string;
    length?: number;
    isWeekend?: boolean;
    fromDay?: number;
    yearMonths: [{
        year: number,
        month: number
    }];
}
interface IFilterPropertiesOptions {
    adults?: number;
    children?: number;
    childrenAges?: number[];
    rooms?: number;
    isAnimalAllowed?: boolean;
    distance?: number; // km
    isBaby?: boolean;
}
interface IGetPropertiesQuery {
    page?: string;
    limit?: string;
}
export const getSearchProperties = async (req: Request<{},{},IGetPropertiesBody, IGetPropertiesQuery> , res: Response): Promise<void> => {
    try {
        const { location, date, options } = req.body.primary;
        let { country, region, city, addressLine } = location || {};
        let { startDate, endDate, length, isWeekend, fromDay, yearMonths} = date || {};
        let {  adults, childrenAges, rooms, distance, isAnimalAllowed} = options || {};

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
            startDate, endDate, length, isWeekend, fromDay, yearMonths,
            adults, children, rooms, distance, isAnimalAllowed
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

        const filteredProperties = await filterPropertiesPrimary(properties,
            { startDate, endDate, length, isWeekend, fromDay, yearMonths }, // date
            { adults, children, rooms, isBaby, isAnimalAllowed }, // options
        );
        
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Transfer-Encoding', 'chunked');
        res.flushHeaders();

        res.write(JSON.stringify({ firstResults: filteredProperties }) + "\n"); 

        // Background Task: Fetch all properties & filter & store in Redis
        setImmediate(async () => {
            const allProperties = await setCacheMainSearch(cacheKey, coordinates, distance,
                { startDate, endDate, length, isWeekend, fromDay, yearMonths }, // date
                { adults, children, rooms, isBaby, isAnimalAllowed }, // options
            );
            res.write(JSON.stringify(allProperties) + "\n"); 
            res.end();
        });

        // Return the 15 first results
        // res.status(200).json({
        //     status: "success",
        //     message: "Properties found successfully",
        //     data: filteredProperties,
        // });
        
    } catch (error) {
        console.log(error); // dev mode
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}

//* Done
export const getPropertyById =  async (req: Request , res: Response): Promise<void> => {
    try {
        const propertyId = req.params.id;

        // Find property by ID
        const property = await propertyModel.findById(propertyId).populate("rooms");

        // If property doesn't exist, return 404
        if (!property) {
            res.status(404).json({
                status: "error",
                message: "Property not found",
            });
            return
        }

        // Send success response
        res.status(200).json({
            status: "success",
            message: "Property with rooms found successfully",
            data: property,
        });
    } catch (error) {
        console.error("Error fetching property:", error);
        res.status(500).json({
            status: "error",
            message: "Server error",
        });
    }
};

// Help Functions
//* Done
async function getPropertyCoordinates(country?: string, region?: string, city?: string, addressLine?: string) {
    let locationQuery: any = {};
        if (country) locationQuery["location.country"] = { $regex: new RegExp(country, 'i') };
        if (region) locationQuery["location.region"] = { $regex: new RegExp(region, 'i') };
        if (city) locationQuery["location.city"] = { $regex: new RegExp(city, 'i') };
        if (addressLine) locationQuery["location.addressLine"] = { $regex: new RegExp(addressLine, 'i') };

        return await getCoordinatesByLocation(`${addressLine}, ${city}, ${region}, ${country}`);
}
//* Done
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
//* Done
async function filterPropertiesPrimary(
    properties: IProperty[], 
    dateFilter: IFilterPropertiesDate,
    options: IFilterPropertiesOptions
    )/*: Promise<IProperty[]> */{

    const filteredProperties = await Promise.all(properties.map(async (property: IProperty) => {
        // Check pet policy
        if (options.isAnimalAllowed && !property.houseRules.pets) return null;

        // Step 1: Find all rooms for this property
        const propertyRooms = await roomModel.find({ _id: { $in: property.rooms } });

        // Step 2: Get availability for each room
        const roomsWithAvailability = await Promise.all(propertyRooms.map(async (room) => {
            const availability = await getAvailability(
                room, 
                { startDate : dateFilter.startDate, 
                endDate: dateFilter.endDate, 
                length: dateFilter.length, 
                isWeekend: dateFilter.isWeekend, 
                fromDay: dateFilter.fromDay, 
                yearMonths: dateFilter.yearMonths }
            );

            return {
                room,
                maxGuests: room.max_guests as number,
                availability
            };
        }));

        // Step 3: Filter rooms that have availability
        const availableRooms: any = roomsWithAvailability
            .filter(({ availability }) => 
                availability.startDate !== null && 
                availability.availableRooms > 0
            )
            // .sort((a, b) => a.maxGuests - b.maxGuests); // Sort by capacity for optimal distribution

        let targetGuests = options.adults! + options.children!;
        let targetRooms = options.rooms!;
        let needsBaby = options.isBaby!;

        const selectedRooms = findBestRoomCombinationDP(availableRooms, targetGuests, targetRooms, needsBaby);

        console.log(selectedRooms);
        if(!selectedRooms) return null;
        
        console.log("count:", countOccurrences(selectedRooms));

        return {
            ...property.toObject(),
            selectedRooms: countOccurrences(selectedRooms),
        };
    }));

    // Filter out null values and return valid properties
    return filteredProperties.filter((property): property is IProperty => property !== null);
}
//* Done
function getAvailability(
    room: IRoom,
    { startDate, endDate, length, isWeekend, fromDay, yearMonths }: IFilterPropertiesDate
) {
    // If startDate and endDate are provided
    if (startDate && endDate) {
        let minAvailable = room.overall_count;
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        // Loop through each date in the range and find minimum availability
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            const availability = room.available.find(av => av.date.toISOString().split('T')[0] === dateStr);
            const count = availability ? availability.count : room.overall_count;
            minAvailable = Math.min(minAvailable, count);
        }
        return {
            startDate,
            availableRooms: minAvailable
        }
    }
    // If isWeekend is true, consider only weekends (Friday & Saturday)
    else if (isWeekend) {
        yearMonths.forEach(ym => {
            if (ym.month < 0 || ym.month > 11 || !Number.isInteger(ym.year)) {
                throw new Error('Invalid year or month. Month should be 0-11, year should be a valid integer');
            }
        });
    
        const totalRooms = room.overall_count;
        
        // Get tomorrow's date
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);  // Reset time to start of day
    
        // Get all weekend dates for specified year-months
        const weekendDates = yearMonths.reduce((dates: Date[], yearMonth) => {
            const daysInMonth = new Date(yearMonth.year, yearMonth.month + 1, 0).getDate();
            
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(yearMonth.year, yearMonth.month, day);
                const dayOfWeek = date.getDay();
                
                // Check if it's Friday (5) or Saturday (6) and after tomorrow
                if ((dayOfWeek === 5 || dayOfWeek === 6) && date >= tomorrow) {
                    dates.push(date);
                }
            }
            return dates;
        }, []);
    
        // Sort dates to ensure we get the earliest valid date
        weekendDates.sort((a, b) => a.getTime() - b.getTime());
    
        // If no availability records exist or no weekend dates found
        if (!room.available || room.available.length < 1) {
            return {
                startDate: weekendDates.length > 0 ? weekendDates[0] : null,
                availableRooms: totalRooms
            };
        }
    
        let bestResult: any = {
            startDate: null,
            availableRooms: 0
        };
    
        for (const weekendDate of weekendDates) {
            // Find if there's an availability record for this date
            const availabilityRecord = room.available.find(a => 
                a.date.getFullYear() === weekendDate.getFullYear() &&
                a.date.getMonth() === weekendDate.getMonth() &&
                a.date.getDate() === weekendDate.getDate()
            );
    
            // If record exists, use its count, otherwise use total rooms
            const availableRooms = availabilityRecord ? availabilityRecord.count : totalRooms;
    
            // Update best result if we found better availability
            if (availableRooms >= bestResult.availableRooms) {
                bestResult = {
                    startDate: weekendDate,
                    availableRooms: availableRooms
                };
    
                // If we found maximum availability, we can stop searching
                if (availableRooms === totalRooms) {
                    break;
                }
            }
        }
    
        return bestResult;
    }

    // If fromDay and length are provided, check availability starting from a specific day
    else if (typeof fromDay === "number" && length) {
        if (fromDay < 0 || fromDay > 6 || length < 1) {
            throw new Error('Invalid fromDay (should be 0-6) or length (should be positive)');
        }
    
        yearMonths.forEach(ym => {
            if (ym.month < 0 || ym.month > 11 || !Number.isInteger(ym.year)) {
                throw new Error('Invalid year or month. Month should be 0-11, year should be a valid integer');
            }
        });
    
        const totalRooms = room.overall_count;
        
        // Get tomorrow's date
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);  // Reset time to start of day
    
        // Get all possible starting dates for the specified year-months
        const potentialStartDates = yearMonths.reduce((dates: Date[], yearMonth) => {
            const daysInMonth = new Date(yearMonth.year, yearMonth.month + 1, 0).getDate();
            
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(yearMonth.year, yearMonth.month, day);
                // Only include dates from tomorrow onwards that match the required day of week
                if (date >= tomorrow && date.getDay() === fromDay) {
                    dates.push(date);
                }
            }
            return dates;
        }, []);
    
        // Sort dates to ensure we get the earliest valid sequence
        potentialStartDates.sort((a, b) => a.getTime() - b.getTime());
    
        let bestResult: any = {
            startDate: null,
            availableRooms: 0
        };
    
        // For each potential start date, check the sequence
        for (const startDate of potentialStartDates) {
            let minAvailability = totalRooms;
            let isValidSequence = true;
            
            // Check each day in the sequence
            for (let i = 0; i < length; i++) {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + i);
    
                // Skip if date is outside the specified months
                const currentYearMonth = {
                    year: currentDate.getFullYear(),
                    month: currentDate.getMonth()
                };
                
                if (!yearMonths.some(ym => 
                    ym.year === currentYearMonth.year && 
                    ym.month === currentYearMonth.month
                )) {
                    isValidSequence = false;
                    break;
                }
    
                // Check availability for this date
                const availabilityRecord = room.available?.find(a => 
                    a.date.getFullYear() === currentDate.getFullYear() &&
                    a.date.getMonth() === currentDate.getMonth() &&
                    a.date.getDate() === currentDate.getDate()
                );
    
                // Update minimum availability
                const currentAvailability = availabilityRecord ? availabilityRecord.count : totalRooms;
                minAvailability = Math.min(minAvailability, currentAvailability);
            }
    
            // If valid sequence and better than current best, update result
            if (isValidSequence && minAvailability >= bestResult.availableRooms) {
                bestResult = {
                    startDate: startDate,
                    availableRooms: minAvailability
                };
    
                // If we found maximum availability, we can stop searching
                if (minAvailability === totalRooms) {
                    break;
                }
            }
        }
    
        return bestResult;
    }
}
//* Done
async function setCacheMainSearch(
    cacheKey: string, coordinates: number[], distance: number,
    dateFilter: IFilterPropertiesDate,
    options: IFilterPropertiesOptions
    ) {

    let properties: IProperty[] = await getPropertiesByRadius(coordinates, distance);

    properties = await filterPropertiesPrimary(properties, dateFilter, options);

    setCache(cacheKey, properties);
    return properties;
}
//* Done
type WasteAndRooms = [number, number[]];  // [wastedSpace, roomIds]
type RoomCounts = Map<number, number>;    // Map of roomId to count used
type DPMap = Map<string, WasteAndRooms>;
function findBestRoomCombinationDP(rooms: IRoom[], targetGuests: number, targetRooms: number, needsBaby: boolean) {
    const n = rooms.length;
    
    // State: [roomIndex][currentGuests][roomsUsed][hasBabyRoom][roomCountsUsed]
    // Value: [minWastedSpace, previousState]
    const dp: DPMap = new Map();
    
    function getKey(index: number, guests: number, usedRooms: number, hasBaby: boolean, roomCountsStr: string) {
        return `${index},${guests},${usedRooms},${hasBaby},${roomCountsStr}`;
    }
    
    function solve(index: number, currentGuests: number, usedRooms: number, hasBaby: boolean, roomCounts: RoomCounts): any {
        // Base cases
        // If used all rooms -> if all good return the spent space , [] else return infinity (bad solution)
        if (usedRooms === targetRooms) {
            if (currentGuests >= targetGuests && (!needsBaby || hasBaby)) {
                return [currentGuests - targetGuests, []];
            }
            return [Infinity, []];
        }
        // If reached the end or used too many rooms
        if (index === n || usedRooms > targetRooms) {
            return [Infinity, []];
        }
        
        // Convert roomCounts to string for the key
        const roomCountsStr = JSON.stringify([...roomCounts]);
        const key = getKey(index, currentGuests, usedRooms, hasBaby, roomCountsStr);
        if (dp.has(key)) {
            return dp.get(key);
        }
        
        const { room }: any = rooms[index];
        const currentRoomCount = roomCounts.get(room._id) || 0;
        
        // Don't use current room
        const [skipWaste, skipRooms] = solve(
            index + 1, 
            currentGuests, 
            usedRooms, 
            hasBaby, 
            new Map(roomCounts)
        );
        
        let useWaste = Infinity;
        let useRooms = [];
        const roomCount = (rooms[index] as any).availability.availableRooms;

        // Use current room if we haven't exceeded its count
        if (currentRoomCount < roomCount) {
            const newRoomCounts = new Map(roomCounts);
            newRoomCounts.set(room._id, currentRoomCount + 1);
            
            const newGuests = currentGuests + room.max_guests!;
            const newBaby = hasBaby || room.baby;
            
            [useWaste, useRooms] = solve(
                index,  // Stay at same index since we might use this room again
                newGuests,
                usedRooms + 1,
                newBaby,
                newRoomCounts
            );
            
            if (useWaste !== Infinity) {
                useRooms = [room._id, ...useRooms];
            }
        }
        
        // Choose better option
        let result: WasteAndRooms;
        if (useWaste < skipWaste) {
            result = [useWaste, useRooms];
        } else {
            result = [skipWaste, skipRooms];
        }
        
        dp.set(key, result);
        return result;
    }
    
    const [waste, selectedRooms] = solve(0, 0, 0, false, new Map());
    
    if (waste === Infinity || selectedRooms.length !== targetRooms) {
        return null;
    }
    
    return selectedRooms;
}
function countOccurrences(arr: string[]): { id: string; count: number } | { id: string; count: number }[] {
    const countMap = arr.reduce<Record<string, number>>((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
    }, {});

    const result = Object.entries(countMap).map(([id, count]) => ({ id, count }));

    return result.length === 1 ? result[0] : result;
}