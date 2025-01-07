import express, { Request, Response } from "express";
import {
    createProperty,
    getSearchProperties,
    getPropertyById,
    getPossibleFiltersAndCount
} from '../controllers/propertyController';
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", createProperty)

router.post("/", getSearchProperties);

router.get("/:id", getPropertyById);


// router.post("/cache", getCachedProperties);



export default router;
