import mongoose from 'mongoose'

import { IUser } from 'src/types/userTypes';

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    role: { type: String, required: true, enum: ["guest", "host"] },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
