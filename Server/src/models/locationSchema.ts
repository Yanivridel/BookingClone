import { Schema } from "mongoose";

export const LocationSchema = new Schema({
    country: { type: String, required: true },
    region: { type: String },
    city: { type: String, required: true },
    area: { type: String },
    addressLine: { type: String, required: true },
    zipCode: { type: String },
    coordinates: {
        type: {
            type: String,
            default: "Point",
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
});

LocationSchema.index({ coordinates: "2dsphere" });