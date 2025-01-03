import { Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import { MongoError } from 'mongodb'; 
import { userModel } from "../models/userModel";
import jwt from 'jsonwebtoken';

// utils imports
// import { hashPassword, comparePassword } from "../utils/auth";
import { generateVerificationCode, verifyVerificationCode } from './../utils/auth';
import { AuthenticatedRequest } from 'src/types/expressTypes';
import { getCoordinatesByLocation } from './../utils/maps';
import { ILocation, ICoordinates } from 'src/types/propertyTypes';

const JTW_EXPIRATION = { expiresIn: '1d'};

// Send Email Code - Done
interface ISendEmailCodeBody {
    email: string;
    isLogin: boolean;
}
export const sendEmailCode = async (req: Request<{}, {}, ISendEmailCodeBody>, res: Response): Promise<void> => {
    const { email, isLogin } = req.body;

    if (!email) {
        res.status(400).send({status: "error", message: "Missing required parameters"});
        return;
    }

    if(isLogin && !(await userModel.findOne({email}))) {
        res.status(400).send({status: "error", message: "User not found"});
        return;
    }

    try {
        await generateVerificationCode(email);
        res.status(200).send({
            status: "success",
            message: "code sent successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to send verification code",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}

// CreateUser - Done
interface IEmailCodeBody {
    email: string;
    code: string;
}
export const createUser = async (req: Request<{}, {}, IEmailCodeBody>, res: Response): Promise<void> => {
    try {
        const { email, code } = req.body;
    
        if (!email || !code) {
            res.status(400).send({status: "error", message: "Missing required parameters"});
            return;
        }

        const isValid = await verifyVerificationCode(email, code);
        if (!isValid) {
            res.status(400).send({status: "error", message: "Invalid or expired code"});
            return;
        }

        const newUser = new userModel({
            email,
        });
    
        await newUser.save();
    
        res.status(201).send({
            status: "success",
            message: "user created successfully",
            data: newUser
        });
    } catch (error: unknown) {
        console.log(error); // dev mode
        if (error instanceof MongoError  && error.code === 11000) {
            res.status(409).json({
                status: "error",
                message: "Email already exists",
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

// Login User - Done
export const loginUser = async (req: Request<{},{}, IEmailCodeBody>, res: Response): Promise<void> => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            res.status(400).send({status: "error", message: "Missing required parameters"});
            return;
        }
    
        const user = await userModel.findOne({ email });

        if (!user) {
            res.status(404).send({status: "error", message: "User not found"});
            return;
        }
    
        const isCorrectCode = await verifyVerificationCode(email, code);

        if (isCorrectCode) {
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
            httpOnly: process.env.NodeEnv === 'production',
            secure: process.env.NodeEnv === 'production',
            sameSite: "strict",
            maxAge: 3600000, // Cookie lifespan of 1 hour
            });
            res.json({ 
                status: "success",
                message: "Logged in successfully", 
                token: token,
                data: user
            });
        } 
        else {
            res.status(401).json({
                status: "error",
                message: "Invalid or expired code",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message: "Unknown",
        });
    }
}

// Gel Self Token - Done
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
// Edit Profile - Done
interface IEditProfileBody {
    fName?: string;
    lName?: string;
    username?: string;
    phoneNumber?: string;
    birthday?: Date;
    gender?: string; // can be "male", "female", or "other"
    location?: ILocation;
    passport?: {
        fName?: string;
        lName?: string;
        country?: string;
        number?: string;
        expires?: Date;
    };
    creditCard?: {
        name?: string;
        number?: number;
        expires?: Date;
    };
    coinType?: string; // e.g., USD, EUR, etc.
    language?: string; // e.g., EN, ES, etc.
    notifications?: {
        dealsAndOffers?: { dealDiscovery?: boolean, rewards?: boolean, searchAssistance?: boolean };
        bookingProductsAndServices?: { bookingForBusiness?: boolean, feedbackAndSurveys?: boolean, productsAndNewsNotifications?: boolean };
        attractionsAndTravelDeals?: { dealsAndAttraction?: boolean, flights?: boolean };
        transportation?: { publicTransport?: boolean, taxis?: boolean, rentalCars?: boolean };
        geniusLoyaltyProgram?: { geniusEmails?: boolean, geniusMembershipProgress?: boolean };
        emailNotification?: { soonOrders?: boolean, reviewOrders?: boolean, offerConfirmOrders?: boolean };
    };
}
export const editProfile = async (req: Request<{},{}, IEditProfileBody>, res: Response): Promise<void> => {
    try {
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;

        const { 
            fName, lName, username, phoneNumber, birthday, gender, location,
            passport, creditCard, coinType, language, notifications 
        } = req.body;

        const fieldsToUpdate: IEditProfileBody = {};

        if (fName) fieldsToUpdate.fName = fName;
        if (lName) fieldsToUpdate.lName = lName;
        if (username) fieldsToUpdate.username = username;
        if (phoneNumber) fieldsToUpdate.phoneNumber = phoneNumber;
        if (birthday) fieldsToUpdate.birthday = birthday;
        if (gender) fieldsToUpdate.gender = gender;
        if (passport) fieldsToUpdate.passport = passport;
        if (creditCard) fieldsToUpdate.creditCard = creditCard;
        if (coinType) fieldsToUpdate.coinType = coinType;
        if (language) fieldsToUpdate.language = language;
        if (notifications) fieldsToUpdate.notifications = notifications;
        if (location) {
            fieldsToUpdate.location = location;
            let completeAddress = location.country;
            if(location.region) completeAddress += " " + location.region;
            if(location.city) completeAddress += " " + location.city;
            if(location.addressLine) completeAddress += " " + location.addressLine;
            const coordinates = await getCoordinatesByLocation(completeAddress);

            if (!coordinates) {
                res.status(400).json({status: "error", message: 'Invalid location provided' });
                return;
            }
            fieldsToUpdate.location.coordinates = {
                type: "Point",
                coordinates
            }
        }

        const updatedUser = await userModel.findOneAndUpdate(
            { _id: userId },
            fieldsToUpdate,
            { new: true, runValidators: true }
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
        console.log(error); // Log for debugging
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// Modify User Arrays -
interface IModifyUserArraysBody {
    action: "add" | "delete";
    search?: {
        location: Location;
        checkin: Date;
        checkout: Date;
        group_adults: number;
        group_children: number;
        is_animal: boolean;
    };
    interested?: string; // Property ID
    savedList?: {
        name: string;
        propertyId: string; // Property ID
    };
}
export const modifyUserArrays = async (req: Request<{}, {}, IModifyUserArraysBody>, res: Response): Promise<void> => {
    try {
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;
        const { action, search, interested, savedList } = req.body;

        if (!["add", "delete"].includes(action)) {
            res.status(400).json({ status: "error", message: "Invalid action type" });
            return;
        }
        if (!search && !interested && !savedList) {
            res.status(400).json({ status: "error", message: "Missing required fields" });
            return;
        }

        const updateQuery: any = {};

        if (search && action === "add") {
            updateQuery["$push"] = { search };
        }
        else if (interested) {
            updateQuery[action === "add" ? "$addToSet" : "$pull"] = {
                interested: new Types.ObjectId(interested), // Property ID
            };
        }
        else if (savedList) {
            if (action === "add") {
                updateQuery["$push"] = {
                    savedLists: { name: savedList.name, 
                                properties: [new Types.ObjectId(savedList.propertyId)] },
                };
            } else if (action === "delete") {
                updateQuery["$pull"] = {
                    savedLists: { name: savedList.name,
                                properties: new Types.ObjectId(savedList.propertyId)},
                };
            }
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, updateQuery, { new: true });

        if (!updatedUser) {
            res.status(404).json({ status: "error", message: "User not found" });
            return;
        }

        res.status(200).json({
            status: "success",
            message: `Successfully ${action === "add" ? "added to" : "removed from"} user array`,
            user: updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};







/*
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
*/