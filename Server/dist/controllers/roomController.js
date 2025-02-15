"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoom = void 0;
const roomModel_1 = require("../models/roomModel");
// Create Property
const createRoom = async (req, res) => {
    try {
        let roomData = req.body;
        // Validate required fields
        if (!roomData.title || !roomData.type || !roomData.desc || !roomData.images?.length || !roomData.offers?.length || !roomData.overall_count) {
            res.status(400).json({
                status: "error",
                message: "Missing required fields.",
            });
            console.log(roomData.title, roomData.type, roomData.desc, roomData.images?.length, roomData.offers?.length, roomData.overall_count);
            return;
        }
        // Create new property with full schema
        const newRoom = new roomModel_1.roomModel(roomData);
        await newRoom.save();
        console.log("New Room created : ", newRoom._id);
        res.status(201).json({
            status: "success",
            message: "Room created successfully",
            data: newRoom,
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
exports.createRoom = createRoom;
//# sourceMappingURL=roomController.js.map