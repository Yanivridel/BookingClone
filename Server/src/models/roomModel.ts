import mongoose, { Schema, model} from "mongoose";
import cron from 'node-cron'; // Import the node-cron library

import { IRoom } from "../types/roomTypes";
import { EFacility, EFeatures } from "../utils/structures";

const RoomSchema = new Schema<IRoom>({
        title: { type: String, required: true },
        type: { 
            type: String, 
            enum: ["room", "studio", "suite", "bed", "villa"], 
            required: true
        },
        desc: { type: String, required: true },
        images: { type: [String], default: [] },
        rooms: [{
            type: { type: String, enum: ["sleep", "shower", "living"], required: true, default: "sleep"},
            room_num: { type: Number, min: 1 },
            beds: {
                sofa: { type: Number, default: 0 },
                single: { type: Number, default: 0 },
                double: { type: Number, default: 0 },
                queen: { type: Number, default: 0 },
                bunk: { type: Number, default: 0 }
            }
        }],
        baby: { type: Boolean, default: false },
        facilities: [{ type: String, enum: EFacility }],
        features: [{
            category: { type: String, enum: EFeatures, required: true },
            sub: { type: [String], default: [] }
        }],
        available: {
            type: [{
                date: { type: Date, required: true },
                count: { type: Number, min: 0, required: true }
            }],
            default: []
        },
        offers: [{
            price_per_night: { type: Number, required: true },
            discount: {
                percentage: { type: Number, required: true },
                expires: { type: Date, required: true }
            },
            is_genius: { type: Boolean, default: false },
            group_adults: { type: Number, required: true },
            group_children: { type: Number, required: true },
            ages: [{ type: Number, min: 0, required: true }],
            meals: [{
                type: { 
                    type: String, 
                    enum: ["morning", "noon", "afternoon", "evening", "self-service", "all-inclusive", "morning and evening"], 
                    required: true 
                },
                rating: { type: Number, min: 0, max: 10, required: true },
                review_num: { type: Number, min: 0, required: true }
            }],
            cancellation: { type: String, required: true },
            prepayment: {
                type: { type: [String], required: true },
                text: { type: String, required: true }
            },
            internet: { type: String, required: true }
        }],
        overall_count: { type: Number, min: 0, required: true }
    },
    { timestamps: true }
);

RoomSchema.set('toJSON', { virtuals: true });
RoomSchema.set('toObject', { virtuals: true });

// Virtual Property: max_guests
RoomSchema.virtual("max_guests").get(function (this: IRoom) {
    return this.rooms.reduce((total, room) => {
        return total + 
            room.beds.sofa + 
            room.beds.single + 
            (room.beds.queen + room.beds.bunk + room.beds.double) * 2; 
    }, 0);
});

// Once a day (midnight), cleanup the old booked rooms data
cron.schedule('0 0 * * *', async () => { 
    try {
        const rooms = await roomModel.find({}); 
        for (const room of rooms) {
            room.set({ available: room.available.filter(availability => availability.date >= new Date())});
            await room.save();
        }
        console.log('Daily cleanup of past available dates completed.');
    } catch (error) {
        console.error('Error cleaning up past available dates:', error);
    }
});


export const roomModel = model<IRoom>("Room", RoomSchema);