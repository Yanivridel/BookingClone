import { Types, Document } from "mongoose";

export interface IPayment extends Document {
    userId: Types.ObjectId;
    bookingId: Types.ObjectId;
    amount: number;
    paymentMethod: string; // Enum EPaymentMethods
    status: "pending" | "completed" | "failed" | "refunded";
    transactionId: string; // Payment gateway transaction ID
    paymentDate: Date;
    currency: string; // Enum ECoinType
}