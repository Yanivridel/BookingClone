import { Document, Types } from 'mongoose'
import { IUser } from './userTypes';
import { IProperty } from './propertyTypes';

export interface IBooking extends Document {
    _id: Types.ObjectId;
    property: IProperty["_id"];
    user: IUser["_id"];
    checkIn: Date;
    checkOut: Date;
    guests: number;
    totalPrice: number;
    status: "pending" | "confirmed" | "cancelled";
    createdAt: Date;
}


