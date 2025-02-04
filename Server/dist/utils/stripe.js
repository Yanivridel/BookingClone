"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentIntent = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia",
});
const createPaymentIntent = async (amount, currency, userId) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            metadata: { userId },
        });
        return paymentIntent;
    }
    catch (error) {
        throw new Error(`Error creating payment intent: ${error.message}`);
    }
};
exports.createPaymentIntent = createPaymentIntent;
// createPaymentIntent(1200, "USD", "12324")
// .then(intent => console.log("INTENT", intent))
//# sourceMappingURL=stripe.js.map