import mongoose from 'mongoose'

import { IUser } from 'src/types/userTypes';
import { CoinType, Country, Language } from 'src/utils/stractures';


const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    role: { type: String, required: true, enum: Object.values(Country) },
    coinType: {
        type: String,
        enum: Object.values(CoinType),
        required: true,
        },
        language: {
        type: String,
        enum: Object.values(Language), 
        required: true,
        },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;

