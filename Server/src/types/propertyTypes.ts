import { Document, Types } from 'mongoose'
import { IUser } from './userTypes';

export interface IProperty extends Document {
    _id: Types.ObjectId;
    title: string;
    description?: string;
    location: {
        address: string;
        city: string;
        country: string;
        coordinates: [number, number];
    };
    pricePerNight: number;
    photos: string[];
    amenities: string[];
    host: IUser["_id"];
    maxGuests: number;
    rooms: number;
    bathrooms: number;
    rating: number;
    reviews: Types.ObjectId[];
}