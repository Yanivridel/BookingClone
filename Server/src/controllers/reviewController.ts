import { Request, Response } from "express";
import reviewModel from "../models/reviewModel";
import mongoose from "mongoose";

// Create a new review
interface createReviewBody {
    teacherId: string;
    reviewer: string;
    rating: number;
    reviewText ?: string; 
}
export const createReview = async (req: Request<{},{}, createReviewBody>, res: Response): Promise<void> => {
    try {
        const { teacherId, reviewer, rating, reviewText } = req.body;

        if(!teacherId || !reviewer || !rating) {
            res.status(400).send({status: "error", message: "Missing required parameters"});
            return;
        }

        const newReview = new reviewModel({
            user: new mongoose.Types.ObjectId(teacherId),
            reviewer,
            rating,
            reviewText: reviewText ? reviewText : "",
            createdAt: new Date()
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
export const getAllReviewsForTeacher = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: teacherId } = req.params;

        if(!teacherId) {
            res.status(400).send({status: "error", message: "Missing required parameters"});
            return;
        }

        const reviews = await reviewModel.find({ user: teacherId}).populate("user reviewer", "fName lName");

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