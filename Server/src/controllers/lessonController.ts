import { Request, Response, NextFunction } from 'express';
import { MongoError } from 'mongodb'; 
import userModel from "../models/userModel";
import Lesson from '../models/lessonModel';
import jwt from 'jsonwebtoken';

// utils imports
import { hashPassword, comparePassword } from "../utils/auth";
import { AuthenticatedRequest } from 'src/types/expressTypes';
import mongoose from 'mongoose';
import lessonModel from '../models/lessonModel';

const JTW_EXPIRATION = { expiresIn: '1d'};

// CREATE LESSON
interface createLessonType {
    subject: string;
    title: string;
    startDate: Date;
    duration: number;
    description: string;
    level: string;
    price: number;
    membersLimit: number;
}
export const createLesson = async (req: Request<{},{},createLessonType> , res: Response): Promise<void> => {
    try {
        let { subject, title, startDate, duration, description, level, membersLimit, price } = req.body
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;

        if(!subject || !title || !startDate || !duration || !level || !membersLimit || !price || !userId) {
            res.status(400).send({status: "error", message: "Missing required parameters"});
            return;
        }
        if(!description) description = '';

        const newLesson = new lessonModel({
            teacher: new mongoose.Types.ObjectId(userId),
            subject,
            title,
            startDate,
            duration,
            description,
            level,
            price,
            membersLimit
        });
    
        await newLesson.save();
    
        res.status(201).send({
            status: "success",
            message: "lesson created successfully",
            newLesson
        });

    } catch (error) {
        console.log(error); // dev mode
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}

// GET ALL LESSONS
export const getAllLessons = async (req: Request, res: Response): Promise<void> => {
    try {

        const lessons = await lessonModel.find().populate("teacher");

        if (!lessons) {
            res.status(404).json({ status:"error", message: 'There are no lessons' });
            return;
        }

        res.status(200).send({
            status: "success",
            message: "Lessons found successfully",
            lessons
        })
    } catch (error) {
        console.log(error); // dev mode
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}

// REGISTER FOR LESSON
export const registerForLesson = async (req: Request, res: Response): Promise<void> => {
    try {
        const { lessonId } = req.params;
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;

        if (!userId || !lessonId) {
            res.status(400).send({status: "error", message: "Missing required parameters"});
            return;
        }

        const lesson = await lessonModel.findById(lessonId);
        if (!lesson) {
            res.status(404).json({ status: 'error', message: 'Lesson not found' });
            return;
        }

        const userIdObjectId = new mongoose.Types.ObjectId(userId);

        if (lesson.participants.includes(userIdObjectId)) {
            res.status(400).json({ status: 'error', message: 'User already registered for this lesson' });
            return;
        }

        lesson.participants.push(userIdObjectId);
        await lesson.save();

        await userModel.findByIdAndUpdate({ _id: userId }, { $addToSet: { schedule: lessonId } });

        res.status(200).json({ status: 'success', message: 'User registered for the lesson successfully', lesson });
    
    } catch (error) {
        console.log(error); // dev mode
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};


// EDIT LESSON
interface editLessonRequestBody {
    lessonId ?: string;
    description?: string;
    startDate?: string;
    duration?: string;
}
export const editLesson = async (req: Request<{},{}, editLessonRequestBody>, res: Response): Promise<void> => {
    try {
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;
        const { description, startDate, duration, lessonId } = req.body;

        if(!lessonId) {
            res.status(400).send({status: "error", message: "Missing required parameters"});
            return;
        }

        const fieldsToUpdate: editLessonRequestBody = {  } ;
        if(description) fieldsToUpdate["description"] = description;
        if(startDate) fieldsToUpdate["startDate"] = startDate;
        if(duration) fieldsToUpdate["duration"] = duration;

        const updatedLesson = await lessonModel.findOneAndUpdate(
            { _id: lessonId, teacher: userId },
            fieldsToUpdate,
            { new: true }
        );

        if (!updatedLesson) {
            res.status(404).json({
                status: "error",
                message: "Lesson not found",
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: "Lesson updated successfully",
            user: updatedLesson,
        });
    } catch (error) {
        console.log(error); // dev mode
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}

//  DELETE LESSON
export const deleteLesson = async (req: Request, res: Response): Promise<void> => {
    try {
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;
        const { id: lessonId } = req.params;

        if(!lessonId || !userId) {
            res.status(400).send({status: "error", message: "Missing required parameters"});
            return;
        }

        const updatedLesson = await lessonModel.findOneAndDelete(
            { _id: lessonId, teacher: userId }
        );

        if (!updatedLesson) {
            res.status(404).json({
                status: "error",
                message: "Lesson not found",
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: "Lesson deleted successfully",
        });
    } catch (error) {
        console.log(error); // dev mode
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}