import { Request, Response, NextFunction } from 'express';
import { MongoError } from 'mongodb'; 
import userModel from "../models/userModel";
import Lesson from '../models/lessonModel';
import jwt from 'jsonwebtoken';

// utils imports
import { hashPassword, comparePassword } from "../utils/auth";
import { AuthenticatedRequest } from 'src/types/expressTypes';
import mongoose from 'mongoose';
import { getCoordinatesByLocation } from './../utils/maps';

const JTW_EXPIRATION = { expiresIn: '1d'};

// CREATE USER - Done
interface CreateUserRequestBody {
    fName: string;
    lName: string;
    email: string;
    password: string;
    phone: string;
    role: string;
}
export const createUser = async (req: Request<{/*params*/}, {/*res body*/}, CreateUserRequestBody>, res: Response): Promise<void> => {
    try {
        const { fName, lName, email, password, phone, role } = req.body;
    
        if(!fName || !lName || !phone || !email || !password || !role) {
            res.status(400).send({status: "error", message: "Missing required parameters"});
            return;
        }
        
        const newUser = new userModel({
            fName,
            lName,
            email,
            password: await hashPassword(password),
            phone,
            role
        });
    
        await newUser.save();
    
        res.status(201).send({
            status: "success",
            message: "user created successfully",
        });
    } catch (error: unknown) {
        console.log(error); // dev mode
        if (error instanceof MongoError  && error.code === 11000) {
            res.status(409).json({
                status: "error",
                message: "email or phone already exists",
            });
        }
        else {
            res.status(500).json({
                status: "error",
                message: "An unexpected error occurred",
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
}

// LOGIN USER - Done
interface LoginUserRequestBody {
    email: string;
    password: string;
}
export const loginUser = async (req: Request<{},{}, LoginUserRequestBody>, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            res.status(400).send({status: "error", message: "Missing required parameters"});
            return;
        }
    
        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            res.status(404).send({status: "error", message: "User not found"});
            return;
        }
    
        const isCorrectPassword = await comparePassword(password,user.password);

        if (isCorrectPassword) {
            let jwtSecretKey = process.env.JWT_SECRET_KEY as string;
    
            const token = jwt.sign(
            {
                email: user.email,
            },
            jwtSecretKey,
            JTW_EXPIRATION
            );
    
            // Set the JWT as a cookie in the response.
            res.cookie("token", token, {
            httpOnly: false, // NOTE: For production, set this to `true` to prevent JavaScript access.
            secure: true, // Ensure the cookie is sent over HTTPS.
            sameSite: "strict", // Prevent cross-site requests.
            maxAge: 3600000, // Cookie lifespan of 1 hour (in milliseconds).
            });
            res.json({ 
                status: "succuss",
                message: "Logged in successfully", 
                token: token,
                user
            });
        } 
        else {
            res.status(401).json({
                status: "error",
                message: "Invalid credentials",
            });
            return;
        }
    } catch (error: unknown) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message: "Unknown",
        });
    }
}

// GET SELF TOKEN - Done
export const getSelf = async (req: Request, res: Response): Promise<void> => {
    try {
        const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
    
        if(!req.headers.authorization) {
            res.status(400).send({status: "error", message: "Missing required authorization token"});
            return;
        }
    
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, jwtSecretKey) as { email: string };
    
        const user = await userModel.findOne({ email: decoded.email });
    
        res.send(user);
    } catch (error) {
        console.log(error); // dev mode logging
        res.status(500).json({
            status: 'error',
            message: 'An unexpected error occurred',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// EDIT PROFILE - Done
interface ChangeProfileRequestBody {
    fName?: string;
    lName?: string;
    userImage?: string;
    video?: string;
    tradeable?: boolean;
    location?: string;
    bio?: string;
    coordinates?: number[];
}
export const editProfile = async (req: Request<{},{}, ChangeProfileRequestBody>, res: Response): Promise<void> => {
    try {
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;
        const { fName, lName, userImage, video, tradeable, location, bio } = req.body;
        let coordinates;

        const fieldsToUpdate : ChangeProfileRequestBody = {} ;
        if(fName) fieldsToUpdate["fName"] = fName;
        if(lName) fieldsToUpdate["lName"] = lName;
        if(userImage) fieldsToUpdate["userImage"] = userImage;
        if(tradeable) fieldsToUpdate["tradeable"] = tradeable;
        if(video) fieldsToUpdate["video"] = video;
        if (bio && bio.trim() !== '') fieldsToUpdate["bio"] = bio;
        if (location && location.trim() !== '') {
            fieldsToUpdate["location"] = location;

            coordinates = await getCoordinatesByLocation(location);
            if (!coordinates) {
                res.status(400).json({status: "error", message: 'Invalid location provided' });
                return;
            }
            fieldsToUpdate["coordinates"] = coordinates;
        }

        const updatedUser = await userModel.findOneAndUpdate(
            { _id: userId },
            fieldsToUpdate,
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({
                status: "error",
                message: "User not found",
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: "User updated successfully",
            user: updatedUser,
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

//  LIKE TEACHER - Done
export const likeTeacher = async (req: Request, res: Response): Promise<void> => {
    try {
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;
        const { id:teacherId } = req.params;

        if(!userId || !teacherId) {
            res.status(400).send({status: "error", message: "Missing required parameters"});
            return;
        }

        const teacher = await userModel.findById(teacherId);
        if (!teacher) {
            res.status(404).json({ status: "error", message: 'Teacher not found' });
            return
        }

        const user = await userModel.findById(userId);
        if (!user) {
            res.status(404).json({ status: "error", message: 'User not found' });
            return;
        }

        if ((!user.myTeachers.some((teacher: mongoose.Types.ObjectId) => teacher.equals(new mongoose.Types.ObjectId(teacherId))))) {
            user.myTeachers.push(new mongoose.Types.ObjectId(teacherId));
            await user.save();
            res.status(200).json({ message: 'Teacher liked successfully', myTeachers: user.myTeachers });
        } else {
            res.status(400).json({ status: "error", message: 'Teacher already liked' });
        }
    } catch (error) {
        console.log(error); // dev mode
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}

//  UNLIKE TEACHER - Done
export const unlikeTeacher = async (req: Request, res: Response): Promise<void> => {
    try {
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;
        const { id:teacherId } = req.params;

        if(!userId || !teacherId) {
            res.status(400).send({status: "error", message: "Missing required parameters"});
            return;
        }

        const user = await userModel.findById(userId);
        if (!user) {
            res.status(404).json({ status:"error", message: 'User not found' });
            return;
        }

        if ((user.myTeachers.some((teacher: mongoose.Types.ObjectId) => teacher.equals(new mongoose.Types.ObjectId(teacherId))))) {
            user.myTeachers = user.myTeachers.filter((id) => id.toString() !== teacherId);
            await user.save();
            res.status(200).json({ status:"success", message: 'Teacher unliked successfully', myTeachers: user.myTeachers });
        } else {
            res.status(400).json({ status:"error", message: 'Teacher not found in liked list' });
        }
    } catch (error) {
        console.log(error); // dev mode
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}


// GET TEACHERS - Done
export const getTeachers = async (req: Request, res: Response): Promise<void> => {
    try {

        const teachers = await userModel.find({ role: "teacher"});

        if (!teachers) {
            res.status(404).json({ status:"error", message: 'There are no teachers' });
            return;
        }

        res.status(200).send({
            status: "success",
            message: "teachers found successfully",
            teachers
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

//  GET USER BY ID - PROGRESS
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id:userId } = req.params;

        if(!userId) {
            res.status(400).send({status: "error", message: "Missing required parameters"});
            return;
        }

        const user = await userModel.findOne({ _id: userId }).populate("myTeachers").populate("schedule");

        if (!user) {
            res.status(404).json({ status:"error", message: 'User not Found' });
            return;
        }

        res.status(200).send({
            status: "success",
            message: "teachers found successfully",
            user
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


// HANDLE COINS - 
export const handleCoins = async (req: Request, res: Response): Promise<void> => {
    try {
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;
        let { number } = req.params;

        if(!userId || !number) {
            res.status(400).send({status: "error", message: "Missing required parameters"});
            return;
        }
        
        const user = await userModel.findOne({ _id: userId });

        if (!user) {
            res.status(404).json({ status:"error", message: 'User not Found' });
            return;
        }

        if(user.coins + parseFloat(number) < 0) {
            res.status(400).send({ status:"error", message: 'Not enough coins' })
            return;
        }

        user.coins += parseFloat(number);
        await user.save();

        res.status(200).send({
            status: "success",
            message: "Coins handled successfully",
            coins: user.coins
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