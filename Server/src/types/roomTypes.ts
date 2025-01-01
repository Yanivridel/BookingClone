import { Types } from "mongoose";

export interface IRoom {
    _id: Types.ObjectId;
    property_id: Types.ObjectId; // ref: property
    type: string; // enum: 

    available: number;
}