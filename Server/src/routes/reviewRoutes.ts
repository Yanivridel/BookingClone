import express, { Request, Response } from "express";
import {
    createReview,
    getAllReviewsForProperty,
} from '../controllers/reviewController';
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authenticateToken, createReview);

router.get("/:id", getAllReviewsForProperty);


export default router;
