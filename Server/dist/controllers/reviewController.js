"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllReviewsForProperty = exports.createReview = void 0;
const reviewModel_1 = require("../models/reviewModel");
const mongoose_1 = __importDefault(require("mongoose"));
// Create a new review
const createReview = async (req, res) => {
    try {
        const authenticatedReq = req;
        const { userId } = authenticatedReq;
        const { propertyId, rating } = req.body;
        if (!propertyId || !userId || rating === undefined) {
            res.status(400).send({ status: "error", message: "Missing required parameters" });
            return;
        }
        const newReview = new reviewModel_1.reviewModel({
            userId: new mongoose_1.default.Types.ObjectId(userId),
            ...req.body
        });
        await newReview.save();
        res.status(201).json({ status: "success", message: "Review created successfully", data: newReview });
    }
    catch (error) {
        console.log(error); // dev mode
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.createReview = createReview;
// Get all reviews
const getAllReviewsForProperty = async (req, res) => {
    try {
        const { id: propertyId } = req.params;
        if (!propertyId) {
            res.status(400).send({ status: "error", message: "Missing required parameters" });
            return;
        }
        const reviews = await reviewModel_1.reviewModel.find({ propertyId })
            .populate({
            path: "userId",
            select: "user_image fName location.country",
            options: { virtuals: true },
        });
        res.status(200).json({
            status: "success",
            data: reviews
        });
    }
    catch (error) {
        console.log(error); // dev mode
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.getAllReviewsForProperty = getAllReviewsForProperty;
//# sourceMappingURL=reviewController.js.map