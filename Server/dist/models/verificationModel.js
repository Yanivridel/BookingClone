"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationModel = void 0;
const mongoose_1 = require("mongoose");
const verificationSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    verificationCode: { type: String, required: true },
    expiresAt: { type: Date, required: true },
});
// Auto delete document as soon as expiresAt over
verificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
exports.verificationModel = (0, mongoose_1.model)('Verification', verificationSchema);
//# sourceMappingURL=verificationModel.js.map