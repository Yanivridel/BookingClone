"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePayment = exports.createPayment = void 0;
const stripe_1 = require("../utils/stripe");
const paymentModel_1 = require("../models/paymentModel");
const bookingModel_1 = require("../models/bookingModel");
const createPayment = async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const authenticatedReq = req;
        const { userId } = authenticatedReq;
        if (!amount || !currency || !userId) {
            res.status(400).json({ status: "Error", message: "Missing required parameters" });
            return;
        }
        const paymentIntent = await (0, stripe_1.createPaymentIntent)(amount, currency, userId);
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            transactionId: paymentIntent.id,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.createPayment = createPayment;
const savePayment = async (req, res) => {
    try {
        const { amount, currency, transactionId, paymentMethod, bookingId } = req.body;
        const authenticatedReq = req;
        const { userId } = authenticatedReq;
        if (!userId || !amount || !currency || !transactionId) {
            res.status(400).json({ status: "Error", message: "Missing required parameters" });
            return;
        }
        const booking = await bookingModel_1.bookingModel.findById(bookingId);
        if (!booking) {
            res.status(404).json({ status: "Error", message: "Booking not found" });
            return;
        }
        if (booking.status !== "on going") {
            res.status(400).json({ status: "Error", message: "Booking is not in 'on going' status" });
            return;
        }
        const newPayment = new paymentModel_1.paymentModel({
            userId,
            bookingId,
            transactionId,
            amount,
            currency,
            paymentMethod,
            status: "completed",
        });
        await newPayment.save();
        booking.status = "confirmed";
        await booking.save();
        res.status(201).send({
            status: "success",
            message: "Payment created successfully",
            data: newPayment
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.savePayment = savePayment;
//# sourceMappingURL=paymentController.js.map