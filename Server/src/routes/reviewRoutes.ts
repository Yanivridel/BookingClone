import express, { Request, Response } from "express";
import {
    createReview,
    getAllReviewsForTeacher,
} from '../controllers/reviewController';
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authenticateToken, createReview);

// router.get('/', authenticateToken, getReviewsByUser);

// router.get("/:id", getReivewsByProperty);


export default router;
