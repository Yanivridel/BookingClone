import express, { Request, Response } from "express";
import {
    createProperty,
    // getProperties,
} from '../controllers/propertyController';
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authenticateToken, createProperty)

// router.get("/", getProperties);



export default router;
