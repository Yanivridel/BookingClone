import express from "express";
import { 
    createBooking,
    getOrdersByUserId,
    takeUnTakeRooms
} from '../controllers/bookingController';
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authenticateToken, createBooking);

router.get("/", authenticateToken, getOrdersByUserId);

router.patch("/take-rooms", takeUnTakeRooms);

export default router;





