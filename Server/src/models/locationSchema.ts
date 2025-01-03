import { Schema } from "mongoose";

export const LocationSchema = new Schema({
    country: { type: String, required: true },
    region: { type: String },
    city: { type: String},
    area: { type: String },
    addressLine: { type: String },
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
            default: []
        },
    },
});

LocationSchema.index({ coordinates: "2dsphere" });