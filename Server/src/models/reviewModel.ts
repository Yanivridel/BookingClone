import { model, Schema } from 'mongoose';
import { IReview } from 'src/types/reviewTypes';
import { ELanguage } from 'src/utils/structures';

const ReviewSchema = new Schema<IReview>(
    {
        propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        passenger_type: {
            type: String,
            enum: ["family", "couple", "friends", "single", "business"],
            required: true,
        },
        language: { type: String, enum: ELanguage, required: true },
        rating: { type: Number, min: 0, max: 10, required: true },
        room_type: {
            type: String,
            enum: ["room", "studio", "suite", "bed", "villa"],
            required: true,
        },
        nights_num: { type: Number, min: 1, required: true },
        reviewText: { type: String },
        responseFromProperty: { type: String },
        helpfulVotes: { type: Number, default: 0, min: 0 },
        createdAt: { type: Date, default: Date.now, immutable: true },
    },
    { timestamps: true }
);

export const reviewModel = model<IReview>("Review", ReviewSchema);