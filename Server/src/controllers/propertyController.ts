import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { MongoError } from 'mongodb'; 
import { userModel } from "../models/userModel";
import jwt from 'jsonwebtoken';

// utils imports
import { AuthenticatedRequest } from 'src/types/expressTypes';
import { IProperty } from 'src/types/propertyTypes';
import { PropertyModel } from 'src/models/propertyModel';

// Create Property
type TCreatePropertyBody = Partial<IProperty>;
export const createProperty = async (req: Request<{},{},TCreatePropertyBody> , res: Response): Promise<void> => {
    try {
        const propertyData: TCreatePropertyBody = req.body;

        // Validate required fields
        if (!propertyData.title || !propertyData.location || !propertyData.images?.length || !propertyData.popularFacilities?.length || !propertyData.host) {
            res.status(400).json({
                status: "error",
                message: "Missing required fields: title, location, images, popularFacilities, and host are required.",
            });
            return;
        }

        // Create new property with full schema
        const newProperty = new PropertyModel(propertyData);
        await newProperty.save();

        res.status(201).json({
            status: "success",
            message: "Property created successfully",
            data: newProperty,
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

/*
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

*/