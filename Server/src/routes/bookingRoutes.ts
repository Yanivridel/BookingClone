import express from "express";
import {
    // createReview,
} from '../controllers/bookingController';
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// router.post("/create", authenticateToken, createReview);

// router.get('/booking', authenticateToken, getBookingByUser);

// router.get("/:id", getAllReviewsForProperty);

export default router;





