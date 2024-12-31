import mongoose, { Document, Schema, Types } from 'mongoose'

interface ILesson extends Document {
    subject: string;
    title: string;
    startDate: Date;
    duration: number;
    teacher: Types.ObjectId;
    description: string;
    level: string;
    price: number;
    membersLimit: number;
    participants: Types.ObjectId[];
    createdAt: Date
}

const lessonSchema = new Schema<ILesson>({
    subject: {
        type: String,
        required: true,
        enum: [ "Mathematics", "Science", "Computer Science", "Engineering", "History", "Geography", "Languages", "Literature", "Arts", "Music", "Physical Education", "Health and Wellness", "Business", "Economics", "Finance", "Law", "Political Science", "Philosophy", "Psychology", "Sociology", "Anthropology", "Environmental Studies", "Religious Studies", "Vocational Skills", "Technology", "Media Studies", "Communication", "Public Speaking", "Creative Writing", "Architecture" ]
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true,
        default: "",
    },
    level: {
        type: String,
        required: true,
        enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
        default: 'beginner'
    },
    price: {
        type: Number,
        required: true
    },
    membersLimit: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model<ILesson>('Lesson', lessonSchema);
