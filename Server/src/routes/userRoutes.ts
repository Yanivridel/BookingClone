import express, { Request, Response } from "express";
import {
    createUser,
    loginUser,
    getSelf,
    editProfile,
    getUserById,
    likeTeacher,
    unlikeTeacher,
    handleCoins,
    getTeachers
} from '../controllers/userController';
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signup", createUser);

router.post('/login', loginUser);

router.get('/get-self', getSelf);

router.patch('/edit-profile', authenticateToken, editProfile);

router.get('/:id', getUserById);

router.post('/like-teacher/:id', authenticateToken, likeTeacher);

router.post('/unlike-teacher/:id', authenticateToken, unlikeTeacher);

router.patch('/coins/:number', authenticateToken, handleCoins);

router.get('/teachers', getTeachers);



export default router;
