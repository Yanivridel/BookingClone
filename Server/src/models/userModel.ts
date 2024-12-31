import mongoose, { Document, Schema, Types } from 'mongoose'

// Define the User interface
interface IUser extends Document {
    fName: string;
    lName: string;
    email: string;
    password: string;
    phone: string;
    userImage: string | null;
    video: string | null;
    role: 'teacher' | 'student';
    myTeachers: Types.ObjectId[];
    rating: number | null;
    coins: number;
    schedule: Types.ObjectId[];
    tradeable: boolean;
    location: string;
    coordinates: number[];
    bio: string;
    createdAt: Date;
}

const userSchema = new Schema<IUser>({
    fName: {
        type: String,
        required: true,
        trim: true
    },
    lName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    userImage: {
        type: String,
        trim: true,
        default: null
    },
    video: {
        type: String,
        trim: true,
        default: null
    },
    role: {
        type: String,
        required: true,
        enum: ['teacher', 'student']
    },
    myTeachers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: null
    },
    coins: {
        type: Number,
        required: true,
        default: 0
    },
    schedule: [{
        type: Schema.Types.ObjectId,
        ref: 'Lesson',
        default: []
    }],
    tradeable: {
        type: Boolean,
        default: false
    },
    location: {
        type: String,
        default: ''
    },
    coordinates: {
        type: [Number],
        default: []
    },
    bio: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model<IUser>('User', userSchema);
