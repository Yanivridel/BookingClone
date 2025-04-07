import { model, Schema } from "mongoose";
import { IPayment } from "../types/paymentTypes";
import { ECoinType, EPaymentMethods } from "../utils/structures";

const paymentSchema = new Schema<IPayment>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        bookingId: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
        amount: { type: Number, required: true },
        paymentMethod: { type: String },
        status: {
            type: String,
            enum: ["pending", "completed", "failed", "refunded"],
            default: "pending",
        },
        transactionId: { type: String, required: true },
        paymentDate: { type: Date, default: Date.now },
        currency: { type: String, enum: ECoinType, default: "USD" },
    },
    {
        timestamps: true
    }
);

export const paymentModel = model<IPayment>("Payment", paymentSchema);