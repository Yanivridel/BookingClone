import express, { Request, Response } from "express";
import {
    createProperty,
    getSearchProperties,
    getPropertyById,
    getPropertyByIdForCard,
    test,
} from '../controllers/propertyController';
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", createProperty)

router.post("/", getSearchProperties);

router.get("/test", test);

router.get("/:id", getPropertyById);

router.get("/card/:id", getPropertyByIdForCard);




export default router;
