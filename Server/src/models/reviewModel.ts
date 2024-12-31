import mongoose, { Document, Schema, Types } from 'mongoose';


interface IReview extends Document {
    user: Types.ObjectId;
    reviewer: Types.ObjectId;
    rating: number;
    reviewText?: string;
    createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    reviewText: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model<IReview>('Review', reviewSchema);

export default Review;
