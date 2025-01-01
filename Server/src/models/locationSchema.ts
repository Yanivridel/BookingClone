import { Schema } from "mongoose";

export const LocationSchema = new Schema({
    country: { type: String, required: true },
    region: { type: String },
    city: { type: String, required: true },
    area: { type: String },
    addressLine: { type: String, required: true },
    zipCode: { type: String },
    coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
});