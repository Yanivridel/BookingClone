import { Document, Types } from 'mongoose'

export interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
    role: "guest" | "host";
    createdAt: Date;
    updatedAt: Date;
}