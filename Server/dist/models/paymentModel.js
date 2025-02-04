"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentModel = void 0;
const mongoose_1 = require("mongoose");
const structures_1 = require("../utils/structures");
const paymentSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    bookingId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Booking", required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true, enum: structures_1.EPaymentMethods },
    status: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending",
    },
    transactionId: { type: String, required: true },
    paymentDate: { type: Date, default: Date.now },
    currency: { type: String, enum: structures_1.ECoinType, default: "USD" },
}, {
    timestamps: true
});
exports.paymentModel = (0, mongoose_1.model)("Payment", paymentSchema);
//# sourceMappingURL=paymentModel.js.map