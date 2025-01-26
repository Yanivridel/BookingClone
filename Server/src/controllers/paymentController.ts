import { Request, Response } from "express";
import { createPaymentIntent } from "./../utils/stripe";
import { paymentModel } from "src/models/paymentModel";
import { IPayment } from "src/types/paymentTypes";
import { AuthenticatedRequest } from "src/types/expressTypes";

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
        const { amount, currency, transactionId, paymentMethod } = req.body;
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;

        if (!userId || !amount || !currency || !transactionId) {
            res.status(400).json({ status: "Error", message: "Missing required parameters" });
            return;
        }

        const newPayment: IPayment = new paymentModel({
            userId,
            transactionId,
            amount,
            currency,
            paymentMethod,
            status: "completed",
        });

        await newPayment.save();

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