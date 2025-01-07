import express, { Request, Response } from "express";
import {
    createProperty,
    getCachedProperties,
    getSearchProperties,
} from '../controllers/propertyController';
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", createProperty)

router.post("/", getSearchProperties);

router.post("/cache", getCachedProperties);



export default router;
