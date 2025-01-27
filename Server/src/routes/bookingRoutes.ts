import express from "express";
import { 
    createBooking,
    takeUnTakeRooms
} from '../controllers/bookingController';
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authenticateToken, createBooking);

router.patch("/take-rooms", takeUnTakeRooms);

export default router;





