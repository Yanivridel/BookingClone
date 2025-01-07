"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllReviewsForTeacher = exports.createReview = void 0;
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createReview = async (req, res) => {
    try {
        const { teacherId, reviewer, rating, reviewText } = req.body;
        if (!teacherId || !reviewer || !rating) {
            res.status(400).send({ status: "error", message: "Missing required parameters" });
            return;
        }
        const newReview = new reviewModel_1.default({
            user: new mongoose_1.default.Types.ObjectId(teacherId),
            reviewer,
            rating,
            reviewText: reviewText ? reviewText : "",
            createdAt: new Date()
        });
        await newReview.save();
        res.status(201).json({ status: "success", message: "Review created successfully", review: newReview });
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
const getAllReviewsForTeacher = async (req, res) => {
    try {
        const { id: teacherId } = req.params;
        if (!teacherId) {
            res.status(400).send({ status: "error", message: "Missing required parameters" });
            return;
        }
        const reviews = await reviewModel_1.default.find({ user: teacherId }).populate("user reviewer", "fName lName");
        res.status(200).json({
            status: "success",
            reviews
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
exports.getAllReviewsForTeacher = getAllReviewsForTeacher;
//# sourceMappingURL=reviewController.js.map