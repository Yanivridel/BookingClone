import { Schema, model } from "mongoose";
import { IVerification } from "src/types/verificationTypes";

const verificationSchema = new Schema<IVerification>({
    email: { type: String, required: true, unique: true },
    verificationCode: { type: String, required: true },
    expiresAt: { type: Date, required: true },
});

// Set TTL index on `expiresAt` field to 5 minutes (300 seconds)
verificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 300  });

export const verificationModel = model<IVerification>('Verification', verificationSchema);
