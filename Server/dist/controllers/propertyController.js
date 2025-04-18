"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAutocompleteLocations = exports.getSearchProperties = exports.getPropertyByIdForCard = exports.getPropertyById = exports.createProperty = void 0;
const propertyModel_1 = require("../models/propertyModel");
const maps_1 = require("../utils/maps");
const roomModel_1 = require("../models/roomModel");
const redisClient_1 = require("../utils/redisClient");
//* Done - Create
const createProperty = async (req, res) => {
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
        if (propertyData.location.region)
            completeAddress += " " + propertyData.location.region;
        if (propertyData.location.city)
            completeAddress += " " + propertyData.location.city;
        if (propertyData.location.addressLine)
            completeAddress += " " + propertyData.location.addressLine;
        const coordinates = await (0, maps_1.getCoordinatesByLocation)(completeAddress);
        if (!coordinates) {
            res.status(400).json({ status: "error", message: 'Invalid location provided' });
            return;
        }
        propertyData.location.coordinates = {
            type: "Point",
            coordinates
        };
        // Create new property with full schema
        const newProperty = new propertyModel_1.propertyModel(propertyData);
        await newProperty.save();
        console.log("property created");
        res.status(201).json({
            status: "success",
            message: "Property created successfully",
            data: newProperty,
        });
    }
    catch (error) {
        console.log(error); // dev mode
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.createProperty = createProperty;
//* Done - Get By Id
const getPropertyById = async (req, res) => {
    try {
        const propertyId = req.params.id;
        // Find property by ID
        const property = await propertyModel_1.propertyModel.findById(propertyId).populate("rooms reviews_num");
        // If property doesn't exist, return 404
        if (!property) {
            res.status(404).json({
                status: "error",
                message: "Property not found",
            });
            return;
        }
        // Send success response
        res.status(200).json({
            status: "success",
            message: "Property with rooms found successfully",
            data: property,
        });
    }
    catch (error) {
        console.error("Error fetching property:", error);
        res.status(500).json({
            status: "error",
            message: "Server error",
        });
    }
};
exports.getPropertyById = getPropertyById;
//* Done - Get By Id For Card
const getPropertyByIdForCard = async (req, res) => {
    try {
        const propertyId = req.params.id;
        // Find property by ID
        const property = await propertyModel_1.propertyModel.findById(propertyId)
            .select("title location images rating reviews_num")
            .populate('reviews_num');
        // If property doesn't exist, return 404
        if (!property) {
            res.status(404).json({
                status: "error",
                message: "Property not found",
            });
            return;
        }
        // Send success response
        res.status(200).json({
            status: "success",
            message: "Property with rooms found successfully",
            data: property,
        });
    }
    catch (error) {
        console.error("Error fetching property:", error);
        res.status(500).json({
            status: "error",
            message: "Server error",
        });
    }
};
exports.getPropertyByIdForCard = getPropertyByIdForCard;
//* Done
const getSearchProperties = async (req, res) => {
    try {
        const { location, date, options } = req.body.primary;
        let { country, region, city, addressLine } = location || {};
        let { startDate, endDate, length, isWeekend, fromDay, yearMonths } = date || {};
        let { adults, childrenAges, rooms, distance, isAnimalAllowed } = options || {};
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : 15;
        const skip = (page - 1) * limit;
        // Default parameters
        let isBaby = false, children = 0;
        adults ?? (adults = 1);
        rooms ?? (rooms = 1);
        isAnimalAllowed ?? (isAnimalAllowed = false);
        if (childrenAges) {
            isBaby = childrenAges.some((age) => typeof age === "number" && age <= 3);
            children = (childrenAges.filter((age) => typeof age === "number" && age > 3)).length;
        }
        if (!startDate && !endDate && !length && !isWeekend && !fromDay && !yearMonths) {
            startDate = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
            endDate = new Date(new Date(new Date().setDate(new Date().getDate() + 5)).setHours(0, 0, 0, 0)).toISOString();
        }
        const cacheKey = JSON.stringify({
            country, region, city, addressLine,
            startDate, endDate, length, isWeekend, fromDay, yearMonths,
            adults, children, rooms, distance, isAnimalAllowed
        }, (_, value) => value === undefined ? null : value);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Transfer-Encoding', 'chunked');
        res.flushHeaders();
        // * Get Cache / Fetch New
        let filteredProperties;
        if (process.env.USE_CACHE === "true") {
            filteredProperties = await (0, redisClient_1.getCache)(cacheKey);
        }
        let isCached = !!filteredProperties; //! Dev Mode - Remove Later !//
        if (!filteredProperties) {
            const coordinates = await getPropertyCoordinates(country, region, city, addressLine);
            // check coordinates (in client -> if fail take default)
            if (!coordinates) {
                res.status(400).json({ status: "error", message: "Invalid address or coordinates not found" });
                return;
            }
            let properties = [];
            if (!region && !city && !addressLine && !distance) {
                properties = await propertyModel_1.propertyModel.find({ "location.country": { $regex: country, $options: "i" } })
                    .populate("rooms reviews_num");
            }
            else {
                // Get sorted paginated properties sorted by distance (closest first)
                properties = await getPropertiesByRadius(coordinates, distance);
            }
            filteredProperties = await filterPropertiesPrimary(properties, { startDate, endDate, length, isWeekend, fromDay, yearMonths }, // date
            { adults, children, rooms, isBaby, isAnimalAllowed });
            setTimeout(() => {
                if (process.env.USE_CACHE === "true") {
                    (0, redisClient_1.setCache)(cacheKey, filteredProperties);
                }
            }, 1000); // in 1 sec
        }
        //console.log("isCached:", isCached); //! Dev Mode - Remove Later !//
        let secondFiltered = filteredProperties;
        if (req.body?.secondary)
            secondFiltered = filterPropertiesSecondary(filteredProperties, req.body);
        const paginatedProperties = secondFiltered.slice(skip, skip + limit);
        res.write(JSON.stringify({ filteredProperties: paginatedProperties }) + "\t");
        res.flush && res.flush();
        process.nextTick(async () => {
            try {
                const filterCount = await getFiltersFromProperties(secondFiltered);
                console.log(" "); //! DO NOT REMOVE EVER
                res.write(JSON.stringify({ Filters: filterCount }) + "\t");
                res.end();
            }
            catch (err) {
                console.error("Error in nextTick callback:", err);
                res.end();
            }
        });
    }
    catch (error) {
        console.log(error); // dev mode
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.getSearchProperties = getSearchProperties;
// Help Functions
//* Done
async function getPropertyCoordinates(country, region, city, addressLine) {
    let completeAddress = country || "";
    if (region)
        completeAddress += " " + region;
    if (city)
        completeAddress += " " + city;
    if (addressLine)
        completeAddress += " " + addressLine;
    return await (0, maps_1.getCoordinatesByLocation)(completeAddress);
}
//* Done
async function getPropertiesByRadius(coordinates, distance) {
    console.log(coordinates, distance);
    distance = 20;
    return await propertyModel_1.propertyModel.find({
        "location.coordinates": {
            $near: {
                $geometry: { type: "Point", coordinates },
                $maxDistance: distance ? distance * 1000 : process.env.SEARCH_RADIUS // 100km radius default
            },
        },
    }).populate("rooms reviews_num");
}
//* Done
async function filterPropertiesPrimary(properties, dateFilter, options) {
    const filteredProperties = await Promise.all(properties.map(async (property) => {
        // Check pet
        if (options.isAnimalAllowed && !property.houseRules.pets)
            return null;
        // Find all rooms for this property
        const propertyRooms = await roomModel_1.roomModel.find({ _id: { $in: property.rooms } });
        // Get availability for each room
        const roomsWithAvailability = await Promise.all(propertyRooms.map(async (room) => {
            const availability = await getAvailability(room, { startDate: dateFilter.startDate,
                endDate: dateFilter.endDate,
                length: dateFilter.length,
                isWeekend: dateFilter.isWeekend,
                fromDay: dateFilter.fromDay,
                yearMonths: dateFilter.yearMonths });
            return {
                room,
                maxGuests: room.max_guests,
                availability
            };
        }));
        // Step 3: Filter rooms that have availability
        const availableRooms = roomsWithAvailability
            .filter(({ availability }) => availability?.startDate &&
            availability?.availableRooms > 0);
        let targetGuests = options.adults + options.children;
        let targetRooms = options.rooms;
        let needsBaby = options.isBaby;
        const selectedRooms = findBestRoomCombinationDP(availableRooms, targetGuests, targetRooms, needsBaby);
        if (!selectedRooms)
            return null;
        return {
            ...property.toObject(),
            selectedRooms: countOccurrences(selectedRooms, availableRooms),
        };
    }));
    // Filter out null values and return valid properties
    return filteredProperties.filter((property) => property !== null);
}
function filterPropertiesSecondary(properties, body) {
    const { type, rating, popularFacilities, roomType, roomFacilities, meals, freeCancellation, onlinePayment, region, price, doubleBeds, singleBeds, bathrooms, bedrooms } = body.secondary || {};
    return properties.filter(property => {
        const selectedRooms = property.rooms
            .filter(room => property.selectedRooms?.some(selected => selected.id === room._id))
            .map(room => {
            const selected = property.selectedRooms?.find(selected => selected.id === room._id);
            return { ...room, ...selected };
        });
        const discountedPrice = selectedRooms.reduce((total, currRoom) => {
            const offer = currRoom.offers?.[0];
            const discount = offer?.discount?.percentage || 0;
            return total + (offer ? offer.price_per_night * (1 - discount / 100) : 0);
        }, 0);
        return ((!type || type.includes(property.type)) &&
            (!rating || rating.includes(Math.ceil(property.total_rating / 2))) &&
            (!popularFacilities ||
                popularFacilities.every((facility) => property.popularFacilities.includes(facility))) &&
            (!roomType ||
                roomType.every((type) => property.rooms.some((room) => room.type === type))) &&
            (!roomFacilities ||
                roomFacilities.every((facility) => property.rooms.some((room) => room.facilities?.includes(facility)))) &&
            (!meals ||
                meals.every((meal) => property.rooms.some((room) => room.offers.some((offer) => offer.meals.some(type => type.type.toLowerCase() === meal))))) &&
            (!freeCancellation ||
                property.rooms.some((room) => room.offers.some((offer) => offer.cancellation.toLocaleLowerCase().includes("free")))) &&
            (!onlinePayment ||
                property.rooms.some((room) => room.offers.some((offer) => offer.prepayment.type.length > 0))) &&
            (!region ||
                property.location.region === region) &&
            (!price || !price.min || !price.max ||
                (price.min <= discountedPrice &&
                    price.max >= discountedPrice)) &&
            (!doubleBeds ||
                property.rooms.some((room) => room.rooms.some(insideRoom => insideRoom.beds.double > 0 ||
                    insideRoom.beds.queen > 0))) &&
            (!singleBeds ||
                property.rooms.some((room) => room.rooms.some(insideRoom => insideRoom.beds.double === 0 ||
                    insideRoom.beds.queen === 0 &&
                        (insideRoom.beds.single > 0 ||
                            insideRoom.beds.sofa > 0 ||
                            insideRoom.beds.bunk > 0)))) &&
            (!bedrooms || bedrooms === 0 ||
                property.rooms.some((room) => room.rooms.filter(insideRoom => insideRoom.type === "sleep").length >= bedrooms)) &&
            (!bathrooms || bathrooms === 0 ||
                property.rooms.some((room) => room.rooms.filter(insideRoom => insideRoom.type === "shower").length >= bathrooms)));
    });
}
//* Done
function getAvailability(room, { startDate, endDate, length, isWeekend, fromDay, yearMonths }) {
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
        };
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
        tomorrow.setHours(0, 0, 0, 0); // Reset time to start of day
        // Get all weekend dates for specified year-months
        const weekendDates = yearMonths.reduce((dates, yearMonth) => {
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
        let bestResult = {
            startDate: null,
            availableRooms: 0
        };
        for (const weekendDate of weekendDates) {
            // Find if there's an availability record for this date
            const availabilityRecord = room.available.find(a => a.date.getFullYear() === weekendDate.getFullYear() &&
                a.date.getMonth() === weekendDate.getMonth() &&
                a.date.getDate() === weekendDate.getDate());
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
    else if (length) {
        if (length < 1) {
            throw new Error('Invalid length (should be positive)');
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
        tomorrow.setHours(0, 0, 0, 0); // Reset time to start of day
        // Get all possible starting dates for the specified year-months
        const potentialStartDates = yearMonths.reduce((dates, yearMonth) => {
            const daysInMonth = new Date(yearMonth.year, yearMonth.month + 1, 0).getDate();
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(Date.UTC(yearMonth.year, yearMonth.month, day, 0));
                // Only include dates from tomorrow onwards that match the required day of week if provided
                if (!(typeof fromDay === "number") || date >= tomorrow && date.getDay() === fromDay) {
                    dates.push(date);
                }
            }
            return dates;
        }, []);
        // Sort dates to ensure we get the earliest valid sequence
        potentialStartDates.sort((a, b) => a.getTime() - b.getTime());
        let bestResult = {
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
                if (!yearMonths.some(ym => ym.year === currentYearMonth.year &&
                    ym.month === currentYearMonth.month)) {
                    isValidSequence = false;
                    break;
                }
                // Check availability for this date
                const availabilityRecord = room.available?.find(a => a.date.getFullYear() === currentDate.getFullYear() &&
                    a.date.getMonth() === currentDate.getMonth() &&
                    a.date.getDate() === currentDate.getDate());
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
function getFiltersFromProperties(properties) {
    const filters = {
        overall_count: properties.length,
        type: {},
        rating: {},
        popularFacilities: {},
        roomType: {},
        roomFacilities: {},
        meals: {},
        freeCancellation: 0,
        onlinePayment: 0,
        region: {},
        price: {
            min: Infinity,
            max: 0
        },
        doubleBeds: 0,
        singleBeds: 0,
    };
    const result = properties.reduce((filters, property) => {
        // Type
        filters.type[property.type] = (filters.type[property.type] || 0) + 1;
        // Region
        if (property.location.region)
            filters.region[property.location.region] = (filters.region[property.location.region] || 0) + 1;
        // Rating
        const rating = Math.ceil(property.total_rating / 2);
        filters.rating[rating] = (filters.rating[rating] || 0) + 1;
        // Online Payment
        if (property.houseRules.accepted_payments.length > 0)
            filters.onlinePayment += 1;
        // Popular Facilities
        property.popularFacilities.forEach((facility) => {
            filters.popularFacilities[facility] = (filters.popularFacilities[facility] || 0) + 1;
        });
        // Unique Map for Rooms
        const countedCategories = {
            types: new Set(),
            freeCancellation: false,
            meals: new Set(),
            roomFacilities: new Set(),
            isDoubleBed: false,
            isSingleBed: false
        };
        // Min Max Prices
        const selectedRooms = property.rooms
            .filter(room => property.selectedRooms?.some(selected => selected.id === room._id.toString()))
            .map(room => {
            const selected = property.selectedRooms?.find(selected => selected.id === room._id.toString());
            return { ...room, ...selected };
        });
        const discountedPrice = selectedRooms.reduce((total, currRoom) => {
            const offer = currRoom.offers?.[0];
            const discount = offer?.discount?.percentage || 0;
            return total + (offer ? offer.price_per_night * (1 - discount / 100) : 0);
        }, 0);
        filters.price.min = Math.min(filters.price.min, discountedPrice);
        filters.price.max = Math.max(filters.price.max, discountedPrice);
        // * For Each Room: * //
        property.rooms.forEach((room) => {
            // Room Type
            countedCategories.types.add(room.type);
            // Room Facilities
            room.facilities?.forEach((facility) => {
                countedCategories.roomFacilities.add(facility);
            });
            //  Room Beds
            room.rooms.forEach((insideRoom) => {
                if (insideRoom.beds.double > 0 || insideRoom.beds.queen > 0)
                    countedCategories.isDoubleBed = true;
                if (insideRoom.beds.double === 0 && insideRoom.beds.queen === 0 &&
                    (insideRoom.beds.bunk > 0 || insideRoom.beds.single > 0 || insideRoom.beds.sofa > 0))
                    countedCategories.isSingleBed = true;
            });
            // * For Each Offer: * //
            room.offers.forEach((offer) => {
                // Free Cancellation
                if (offer.cancellation.toLowerCase().includes("free")) {
                    countedCategories.freeCancellation = true;
                }
                // Meals
                offer.meals.forEach((meal) => {
                    countedCategories.meals.add(meal.type);
                });
            });
        });
        // * Update Unique Categories:
        countedCategories.types.forEach((type) => {
            filters.roomType[type] = (filters.roomType[type] || 0) + 1;
        });
        if (countedCategories.freeCancellation) {
            filters.freeCancellation += 1;
        }
        if (countedCategories.isDoubleBed) {
            filters.doubleBeds += 1;
        }
        if (countedCategories.isSingleBed) {
            filters.singleBeds += 1;
        }
        countedCategories.meals.forEach((meal) => {
            filters.meals[meal] = (filters.meals[meal] || 0) + 1;
        });
        countedCategories.roomFacilities.forEach((facility) => {
            filters.roomFacilities[facility] = (filters.roomFacilities[facility] || 0) + 1;
        });
        return filters;
    }, filters);
    return result;
}
function findBestRoomCombinationDP(rooms, targetGuests, targetRooms, needsBaby) {
    const n = rooms.length;
    // State: [roomIndex][currentGuests][roomsUsed][hasBabyRoom][roomCountsUsed]
    // Value: [minWastedSpace, previousState]
    const dp = new Map();
    function getKey(index, guests, usedRooms, hasBaby, roomCountsStr) {
        return `${index},${guests},${usedRooms},${hasBaby},${roomCountsStr}`;
    }
    function solve(index, currentGuests, usedRooms, hasBaby, roomCounts) {
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
        const { room } = rooms[index];
        const currentRoomCount = roomCounts.get(room._id) || 0;
        // Don't use current room
        const [skipWaste, skipRooms] = solve(index + 1, currentGuests, usedRooms, hasBaby, new Map(roomCounts));
        let useWaste = Infinity;
        let useRooms = [];
        const roomCount = rooms[index].availability.availableRooms;
        // Use current room if we haven't exceeded its count
        if (currentRoomCount < roomCount) {
            const newRoomCounts = new Map(roomCounts);
            newRoomCounts.set(room._id, currentRoomCount + 1);
            const newGuests = currentGuests + room.max_guests;
            const newBaby = hasBaby || room.baby;
            [useWaste, useRooms] = solve(index, // Stay at same index since we might use this room again
            newGuests, usedRooms + 1, newBaby, newRoomCounts);
            if (useWaste !== Infinity) {
                useRooms = [room._id, ...useRooms];
            }
        }
        // Choose better option
        let result;
        if (useWaste < skipWaste) {
            result = [useWaste, useRooms];
        }
        else {
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
function countOccurrences(arr, availableRooms) {
    const countMap = arr.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
    }, {});
    return Object.entries(countMap).map(([id, count]) => ({ id, count,
        available: availableRooms.find((el) => String(el.room._id) === id).availability
    }));
}
const getAutocompleteLocations = async (req, res) => {
    const lowerSearchText = req.params.searchText.toLowerCase();
    try {
        const locations = await propertyModel_1.propertyModel.aggregate([
            {
                $match: {
                    // Match properties where any location field contains the search text (case-insensitive)
                    $or: [
                        { 'location.country': { $regex: lowerSearchText, $options: 'i' } },
                        { 'location.city': { $regex: lowerSearchText, $options: 'i' } },
                        { 'location.region': { $regex: lowerSearchText, $options: 'i' } },
                        { 'location.addressLine': { $regex: lowerSearchText, $options: 'i' } },
                    ],
                },
            },
            {
                $project: {
                    location: 1, // Only include location fields
                },
            },
            {
                $addFields: {
                    // Determine where the search text was found
                    matchedIn: {
                        $cond: {
                            if: { $regexMatch: { input: { $toLower: '$location.country' }, regex: lowerSearchText } },
                            then: 'country',
                            else: {
                                $cond: {
                                    if: { $regexMatch: { input: { $toLower: '$location.region' }, regex: lowerSearchText } },
                                    then: 'region',
                                    else: {
                                        $cond: {
                                            if: { $regexMatch: { input: { $toLower: '$location.city' }, regex: lowerSearchText } },
                                            then: 'city',
                                            else: 'addressLine',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    location: 1,
                    matchedIn: 1, // Add the matchedIn field to indicate where the match occurred
                },
            },
            {
                $match: {
                    // Ensure we are returning valid locations
                    'location': { $ne: null },
                },
            },
            {
                $sort: {
                    // Sort by matched field order (country > region > city > addressLine)
                    matchedIn: -1,
                },
            },
        ]);
        // Format the result based on where the match was found
        const result = locations.map((item) => {
            const location = item.location;
            const matchedIn = item.matchedIn;
            // Return the full location but only include relevant parts based on the match
            if (matchedIn === 'country') {
                return { country: location.country, matchedIn, fullLocation: location };
            }
            else if (matchedIn === 'region') {
                return { country: location.country, region: location.region, matchedIn, fullLocation: location };
            }
            else if (matchedIn === 'city') {
                return { country: location.country, region: location.region, city: location.city, matchedIn, fullLocation: location };
            }
            else if (matchedIn === 'addressLine') {
                return { country: location.country, region: location.region, city: location.city, addressLine: location.addressLine, matchedIn, fullLocation: location };
            }
        });
        res.status(200).json({
            status: "success",
            message: "Property with rooms found successfully",
            data: locations,
        });
    }
    catch (error) {
        console.error("Error fetching property:", error);
        res.status(500).json({
            status: "error",
            message: "Server error",
        });
    }
};
exports.getAutocompleteLocations = getAutocompleteLocations;
//# sourceMappingURL=propertyController.js.map