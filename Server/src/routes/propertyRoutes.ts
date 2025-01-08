import express, { Request, Response } from "express";
import {
    createProperty,
    getSearchProperties,
    getPropertyById,
} from '../controllers/propertyController';
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", createProperty)

router.post("/", getSearchProperties);

router.get("/:id", getPropertyById);



export default router;
