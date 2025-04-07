"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unTakeAvailableRooms = exports.takeAvailableRooms = exports.takeUnTakeRooms = exports.getOrdersByUserId = exports.createBooking = void 0;
const mongoose_1 = require("mongoose");
const bookingModel_1 = require("../models/bookingModel");
const roomModel_1 = require("../models/roomModel");
const redisClient_1 = require("utils/redisClient");
const createBooking = async (req, res) => {
    try {
        const { propertyId, rooms, reserver, is_paperless, for_work, rooms_details, add_to_stay, special_req, children_beds, guests, checkIn, checkOut, } = req.body;
        const authenticatedReq = req;
        const { userId } = authenticatedReq;
        if (!propertyId ||
            !rooms ||
            !reserver ||
            !rooms_details ||
            !checkIn ||
            !checkOut ||
            !guests) {
            res
                .status(400)
                .json({ status: "Error", message: "Missing required parameters" });
            return;
        }
        // Delete existing other "on going" booking for the same user
        const existingBooking = (await bookingModel_1.bookingModel.findOneAndDelete({
            userId,
            status: "on going",
        }));
        if (existingBooking) {
            const { rooms: existingRooms, checkIn: existingCheckIn, checkOut: existingCheckOut, } = existingBooking;
            await (0, exports.unTakeAvailableRooms)({
                rooms: existingRooms,
                checkIn: existingCheckIn,
                checkOut: existingCheckOut,
            });
            console.log(`Deleted existing booking: ${existingBooking._id}`);
        }
        await (0, exports.takeAvailableRooms)({
            rooms,
            checkIn,
            checkOut,
        });
        const fieldsToAdd = {
            userId,
            propertyId,
            rooms,
            reserver,
            rooms_details,
            guests,
            checkIn,
            checkOut,
            status: "on going",
        };
        if (is_paperless)
            fieldsToAdd["is_paperless"] = is_paperless;
        if (for_work)
            fieldsToAdd["for_work"] = for_work;
        if (add_to_stay)
            fieldsToAdd["add_to_stay"] = add_to_stay;
        if (special_req)
            fieldsToAdd["special_req"] = special_req;
        if (children_beds)
            fieldsToAdd["children_beds"] = children_beds;
        const newBooking = new bookingModel_1.bookingModel(fieldsToAdd);
        await newBooking.save();
        if (process.env.USE_CACHE !== "false")
            (0, redisClient_1.clearAll)();
        res.status(201).send({
            status: "success",
            message: "Booking created successfully",
            data: newBooking,
        });
    }
    catch (error) {
        console.error(error);
        if (error && typeof error === "object" && "status" in error) {
            res.status(Number(error.status)).json(error);
            return;
        }
        res.status(500).json({
            status: "Error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.createBooking = createBooking;
const getOrdersByUserId = async (req, res) => {
    try {
        const authenticatedReq = req;
        const { userId } = authenticatedReq;
        const orders = await bookingModel_1.bookingModel.find({ userId })
            .sort({ createdAt: 1 })
            .populate({
            path: 'propertyId',
            select: 'title images'
        });
        const groupedOrders = orders.reduce((acc, order) => {
            if (!acc[order.status]) {
                acc[order.status] = [];
            }
            acc[order.status].push(order);
            return acc;
        }, {});
        res.status(200).json(groupedOrders);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
exports.getOrdersByUserId = getOrdersByUserId;
// * Done
const takeUnTakeRooms = async (req, res) => {
    const { checkIn, checkOut, rooms, action } = req.body;
    if (!checkIn ||
        !checkOut ||
        !rooms ||
        !action ||
        !["take", "untake"].includes(action)) {
        res
            .status(400)
            .json({ status: "Error", message: "Missing required parameters" });
        return;
    }
    try {
        if (new Date(checkIn) > new Date(checkOut))
            throw new Error("Checkin cannot be greater than checkout");
        if (action === "take")
            await (0, exports.takeAvailableRooms)({
                rooms,
                checkIn,
                checkOut,
            });
        else
            await (0, exports.unTakeAvailableRooms)({
                rooms,
                checkIn,
                checkOut,
            });
        if (process.env.USE_CACHE !== "false")
            (0, redisClient_1.clearAll)();
        res.status(200).send("Success");
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            status: "Error",
            message: err.message,
        });
    }
};
exports.takeUnTakeRooms = takeUnTakeRooms;
const takeAvailableRooms = async ({ rooms, checkIn, checkOut, }) => {
    const daysToBook = getDatesToBook(checkIn, checkOut);
    // Fetch all rooms at once
    const roomIds = rooms.map(({ roomId }) => new mongoose_1.Types.ObjectId(roomId));
    const allRooms = await roomModel_1.roomModel.find({ _id: { $in: roomIds } });
    // Map to hold updated room data
    const updatedRooms = new Map();
    for (const { roomId, count } of rooms) {
        const room = allRooms.find((r) => r._id.equals(roomId));
        if (!room)
            throw {
                status: 404,
                message: `Room with ID ${roomId} not found`,
                roomId,
            };
        for (const day of daysToBook) {
            const availability = room.available.find((entry) => new Date(entry.date).toDateString() === day.toDateString());
            if (availability) {
                if (availability.count < count) {
                    throw {
                        status: 400,
                        message: `Not enough availability for room ${roomId} on ${day.toDateString()}`,
                        roomId,
                        notAvailableDate: day.toDateString(),
                    };
                }
                availability.count -= count;
            }
            else {
                if (room.overall_count < count) {
                    throw {
                        status: 400,
                        message: `Not enough overall availability for room ${roomId} on ${day.toDateString()}`,
                        roomId,
                        notAvailableDate: day.toDateString(),
                    };
                }
                room.available.push({ date: day, count: room.overall_count - count });
            }
        }
        // Store updated room in the map
        updatedRooms.set(roomId, room);
    }
    // Save all updated rooms to the database
    for (const room of updatedRooms.values()) {
        await room.save();
    }
};
exports.takeAvailableRooms = takeAvailableRooms;
const unTakeAvailableRooms = async ({ rooms, checkIn, checkOut, }) => {
    const daysToBook = getDatesToBook(checkIn, checkOut);
    // Fetch all rooms at once
    const roomIds = rooms.map(({ roomId }) => new mongoose_1.Types.ObjectId(roomId));
    const allRooms = await roomModel_1.roomModel.find({ _id: { $in: roomIds } });
    // Map to hold updated room data
    const updatedRooms = new Map();
    for (const { roomId, count } of rooms) {
        const room = allRooms.find((r) => r._id.equals(roomId));
        if (!room)
            throw {
                status: 404,
                message: `Room with ID ${roomId} not found`,
                roomId,
            };
        for (const day of daysToBook) {
            const availabilityIndex = room.available.findIndex((entry) => new Date(entry.date).toDateString() === day.toDateString());
            if (availabilityIndex !== -1) {
                const availability = room.available[availabilityIndex];
                availability.count += count;
                if (availability.count >= room.overall_count) {
                    room.available.splice(availabilityIndex, 1);
                }
            }
        }
        // Store updated room in the map
        updatedRooms.set(roomId, room);
    }
    // Save all updated rooms to the database
    for (const room of updatedRooms.values()) {
        await room.save();
    }
};
exports.unTakeAvailableRooms = unTakeAvailableRooms;
const getDatesToBook = (checkIn, checkOut) => {
    const daysToBook = [];
    const currentDate = new Date(checkIn);
    const lastDate = new Date(checkOut);
    while (currentDate <= lastDate) {
        daysToBook.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return daysToBook;
};
//# sourceMappingURL=bookingController.js.map