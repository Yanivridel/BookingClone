import express, { Request, Response } from "express";
import {
    createProperty,
    getProperties,
} from '../controllers/propertyController';
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", createProperty)

router.post("/", getProperties);



export default router;
