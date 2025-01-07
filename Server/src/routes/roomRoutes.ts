import express, { Request, Response } from "express";
import {
    createRoom
} from '../controllers/roomController';
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", createRoom);




export default router;
