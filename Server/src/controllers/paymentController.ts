import { Request, Response } from "express";
import { createPaymentIntent } from "../utils/stripe";
import { paymentModel } from "../models/paymentModel";
import { IPayment } from "../types/paymentTypes";
import { AuthenticatedRequest } from "../types/expressTypes";
import { bookingModel } from "../models/bookingModel";

export const createPayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { amount, currency } = req.body;
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;

        if (!amount || !currency || !userId) {
            res.status(400).json({ status: "Error", message: "Missing required parameters" });
            return;
        }

        const paymentIntent = await createPaymentIntent(amount, currency, userId);

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            transactionId: paymentIntent.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const savePayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { amount, currency, transactionId, paymentMethod, bookingId } = req.body;
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;

        if (!userId || !amount || !currency || !transactionId) {
            res.status(400).json({ status: "Error", message: "Missing required parameters" });
            return;
        }

        const booking = await bookingModel.findById(bookingId);

        if (!booking) {
            res.status(404).json({ status: "Error", message: "Booking not found" });
            return;
        }

        if (booking.status !== "on going") {
            res.status(400).json({ status: "Error", message: "Booking is not in 'on going' status" });
            return;
        }

        const newPayment: IPayment = new paymentModel({
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
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};