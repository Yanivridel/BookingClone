import { Schema, model } from "mongoose";
import { IVerification } from "src/types/verificationTypes";

const verificationSchema = new Schema<IVerification>({
    email: { type: String, required: true, unique: true },
    verificationCode: { type: String, required: true },
    expiresAt: { type: Date, required: true },
});

// Auto delete document as soon as expiresAt over
verificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0  });

export const verificationModel = model<IVerification>('Verification', verificationSchema);
