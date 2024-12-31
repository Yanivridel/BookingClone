import mongoose from 'mongoose'

import { IProperty } from 'src/types/propertyTypes';

const propertySchema = new mongoose.Schema<IProperty>({
    title: { type: String, required: true },
    description: { type: String },
    location: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        coordinates: { type: [Number], required: true },
    },
    pricePerNight: { type: Number, required: true },
    photos: { type: [String], required: true },
    amenities: { type: [String], required: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    maxGuests: { type: Number, required: true },
    rooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    rating: { type: Number, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const Property = mongoose.model<IProperty>("Property", propertySchema);

export default Property;