import { Schema, model, Types } from "mongoose";
import { IAvailableRoomsProps, unTakeAvailableRooms } from "src/controllers/bookingController";
import { IBooking, TBookingStringified } from "src/types/bookingTypes";
import cron from 'node-cron';

const BookingSchema = new Schema<IBooking>(
    {
        propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
        rooms: [{
            roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
            count: { type: Number, required: true },
        }],
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

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
            roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
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
            room_id: { type: Types.ObjectId, ref: "Room", required: true },
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
    },
    {
        timestamps: true
    }
);

// Runs every minute
cron.schedule('* * * * *', async () => {
    try {
        const expiringBookings = await bookingModel.find({
            createdAt: {
                $lt: new Date(Date.now() - 15 * 60 * 1000) // 15 minute expired
            },
            status: "on going"
        }) as TBookingStringified[];

        for (const booking of expiringBookings) {
            const { rooms, checkIn, checkOut } = booking;
            await unTakeAvailableRooms({ rooms, checkIn, checkOut } as IAvailableRoomsProps);
            console.log(`Handled expiration for booking: ${booking._id}`);
        }
    } catch (error) {
        console.error('Error handling expired bookings:', error);
    }
});

export const bookingModel = model<IBooking>("Booking", BookingSchema);