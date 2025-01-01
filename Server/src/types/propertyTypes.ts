import { Document, Types } from 'mongoose'
import { IUser } from './userTypes';

export interface IProperty extends Document {
    _id: Types.ObjectId;
    title: string;
    description?: string;
    location: ILocation;
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

export interface ILocation {
    country: string; // enum ECountry
    region?: string;
    city: string;
    addressLine?: string;
    zipCode?: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}