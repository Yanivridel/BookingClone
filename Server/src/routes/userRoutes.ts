import express, { Request, Response } from "express";
import {
    sendEmailCode,
    signinUser,
    getSelf,
    editProfile,
    modifyUserArrays,
    getSearches,
    getInterested,
    getSavedLists,
    deleteUserById,
} from '../controllers/userController';
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post('/send-code', sendEmailCode);

router.post("/signin", signinUser);

router.get('/get-self', getSelf);

router.patch('/edit-profile', authenticateToken, editProfile);

router.patch('/modify-arrays', authenticateToken, modifyUserArrays);

router.get('/search', authenticateToken, getSearches);

router.get('/interested', authenticateToken, getInterested);

router.get('/saved-lists', authenticateToken, getSavedLists);

router.delete('/delete-account', authenticateToken, deleteUserById);


export default router;
