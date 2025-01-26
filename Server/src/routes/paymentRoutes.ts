import express from "express";
import {
    createPayment,
    savePayment,
} from '../controllers/paymentController';
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authenticateToken, createPayment);

router.post("/save", authenticateToken, savePayment);

// router.get("/:id", getAllReviewsForProperty);


export default router;
