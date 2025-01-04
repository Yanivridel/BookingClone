import { Schema } from "mongoose";
import { ICoordinates, ILocation } from "src/types/propertyTypes";


const CoordinatesSchema = new Schema<ICoordinates>({
    type: {
        type: String,
        enum: ['Point'],
        default: "Point",
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

export const LocationSchema = new Schema<ILocation>({
    country: { type: String, required: true },
    region: { type: String },
    city: { type: String},
    area: { type: String },
    addressLine: { type: String },
    zipCode: { type: String },
    coordinates: {
        type: CoordinatesSchema,
        required: false
    }
});

// For geographical queries
LocationSchema.index({ coordinates: "2dsphere" }, { sparse: true });