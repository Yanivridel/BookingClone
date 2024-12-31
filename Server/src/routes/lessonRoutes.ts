import express, { Request, Response } from "express";
import {
    createLesson,
    getAllLessons,
    // getLessonById,
    editLesson,
    deleteLesson,
    registerForLesson
} from '../controllers/lessonController';
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authenticateToken, createLesson)

router.get("/", getAllLessons);

// router.get('/:id', getLessonById);

router.post('/register/:lessonId', authenticateToken, registerForLesson);


router.patch('/edit', authenticateToken, editLesson);

router.delete('/:id', authenticateToken, deleteLesson);


export default router;
