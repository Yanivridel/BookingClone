"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingModel = void 0;
const mongoose_1 = require("mongoose");
const bookingController_1 = require("../controllers/bookingController");
const node_cron_1 = __importDefault(require("node-cron"));
const BookingSchema = new mongoose_1.Schema({
    propertyId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Property", required: true },
    rooms: [{
            roomId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Room", required: true },
            count: { type: Number, required: true },
        }],
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    reserver: {
        fName: { type: String, required: true },
        lName: { type: String, required: true },
        email: { type: String, required: true },
        country: { type: String, required: true },
        phoneNumber: { type: String, required: true },
    },
    is_paperless: { type: Boolean, default: false },
    for_work: {
        company_name: { type: String },
        vat_number: { type: Number },
    },
    rooms_details: [{
            roomId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Room", required: true },
            fullName: { type: String, required: true },
            email: { type: String },
        }],
    add_to_stay: {
        taxi: { type: Boolean, default: false },
        car_rent: { type: Boolean, default: false },
        shuttle: { type: Boolean, default: false },
    },
    special_req: {
        text: { type: String },
        close_rooms: { type: Boolean, default: false },
    },
    children_beds: [{
            room_id: { type: mongoose_1.Types.ObjectId, ref: "Room", required: true },
            baby: { type: Number },
            extra: { type: Number },
        }],
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true },
    status: {
        type: String,
        enum: ["on going", "confirmed", "cancelled", "checked-in", "completed"],
        required: true,
    }
}, {
    timestamps: true
});
// Runs every minute
node_cron_1.default.schedule('* * * * *', async () => {
    try {
        const expiringBookings = await exports.bookingModel.find({
            createdAt: {
                $lt: new Date(Date.now() - 15 * 60 * 1000) // 15 minute expired
            },
            status: "on going"
        });
        for (const booking of expiringBookings) {
            const { rooms, checkIn, checkOut } = booking;
            await (0, bookingController_1.unTakeAvailableRooms)({ rooms, checkIn, checkOut });
            console.log(`Handled expiration for booking: ${booking._id}`);
        }
    }
    catch (error) {
        console.error('Error handling expired bookings:', error);
    }
});
exports.bookingModel = (0, mongoose_1.model)("Booking", BookingSchema);
//# sourceMappingURL=bookingModel.js.map