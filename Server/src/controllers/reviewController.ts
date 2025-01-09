import { Request, Response } from "express";
import { reviewModel } from "../models/reviewModel";
import mongoose from "mongoose";
import { IReview } from "src/types/reviewTypes";

// Create a new review
export const createReview = async (req: Request<{},{}, Partial<IReview>>, res: Response): Promise<void> => {
    try {
        const { propertyId, userId, rating } = req.body;

        if(!propertyId || !userId || rating === undefined) {
            res.status(400).send({status: "error", message: "Missing required parameters"});
            return;
        }

        const newReview = new reviewModel({
            ...req.body
        });

        await newReview.save();
        res.status(201).json({ status: "success", message: "Review created successfully", review: newReview });

    } catch (error) {
        console.log(error); // dev mode
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// Get all reviews
export const getAllReviewsForProperty = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: propertyId } = req.params;

        if(!propertyId) {
            res.status(400).send({status: "error", message: "Missing required parameters"});
            return;
        }

        const reviews = await reviewModel.find({ user: propertyId});

        res.status(200).json({ 
            status: "success", 
            reviews 
        });
    } catch (error) {
        console.log(error); // dev mode
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};