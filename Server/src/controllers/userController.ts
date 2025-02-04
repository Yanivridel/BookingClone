import { Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import { MongoError, ObjectId } from 'mongodb'; 
import { userModel } from "../models/userModel";
import jwt from 'jsonwebtoken';

// utils imports
import { generateVerificationCode, verifyVerificationCode } from '../utils/auth';
import { AuthenticatedRequest } from '../types/expressTypes';
import { getCoordinatesByLocation } from '../utils/maps';
import { ILocation, ICoordinates } from '../types/propertyTypes';

const JTW_EXPIRATION = { expiresIn: process.env.JTW_EXPIRATION};

// Send Email Code - Done
interface ISendEmailCodeBody {
    email: string;
    isLogin: boolean; // true - login, false - register 
}
export const sendEmailCode = async (req: Request<{}, {}, ISendEmailCodeBody>, res: Response): Promise<void> => {
    const { email } = req.body;
    let isLogin = false;

    if (!email) {
        res.status(400).send({status: "error", message: "Missing required parameters"});
        return;
    }
    const user = await userModel.findOne({email});
    
    if(user) isLogin = true;

    try {
        await generateVerificationCode(email, isLogin);
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
export const signinUser = async (req: Request<{}, {}, IEmailCodeBody>, res: Response): Promise<void> => {
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

        let user = await userModel.findOne({email});
    
        if(!user) {
            user = new userModel({
                email,
            });
        
            await user.save();
        }

        let jwtSecretKey = process.env.JWT_SECRET_KEY as string;
    
        const token = jwt.sign(
            {
                userId: user._id,
            },
            jwtSecretKey,
            JTW_EXPIRATION
            );

        // Set the JWT as a cookie in the response.
        res.cookie("token", token, {
        httpOnly: false, // process.env.NodeEnv === 'production'
        secure: true, // process.env.NodeEnv === 'production'
        sameSite: "lax",
        maxAge: Number(process.env.COOKIE_EXPIRATION), // Cookie lifespan of 1 hour
        });

        res.status(201).send({
            status: "success",
            message: "user signed in successfully",
            token,
            data: user
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

// Get Self Token - Done
export const getSelf = async (req: Request, res: Response): Promise<void> => {
    try {
        const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
    
        if(!req.headers.authorization) {
            res.status(400).send({status: "error", message: "Missing required authorization token"});
            return;
        }
    
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, jwtSecretKey) as { userId: string };
    
        const user = await userModel.findById(decoded.userId);
    
        res.status(200).json({
            status: "success",
            data: user,
        });
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
    password?: string;
    phoneNumber?: string;
    email?: string;
    birthday?: string | Date;
    gender?: string; // can be "male", "female", or "other"
    user_image?: string;
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
    geniusLevel?: number;
}
export const editProfile = async (req: Request<{},{}, IEditProfileBody>, res: Response): Promise<void> => {
    try {
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;

        const { 
            fName, lName, username, password, phoneNumber, birthday, gender, user_image, location,
            passport, creditCard, coinType, language, notifications, geniusLevel, email
        } = req.body;

        const fieldsToUpdate: IEditProfileBody = {};

        if (fName) fieldsToUpdate.fName = fName;
        if (lName) fieldsToUpdate.lName = lName;
        if (username) fieldsToUpdate.username = username;
        if (email) fieldsToUpdate.email = email;
        if (password) fieldsToUpdate.password = password;
        if (phoneNumber) fieldsToUpdate.phoneNumber = phoneNumber;
        if (birthday) fieldsToUpdate.birthday = new Date(birthday);
        if (gender) fieldsToUpdate.gender = gender;
        if (user_image) fieldsToUpdate.user_image = user_image;
        if (passport) fieldsToUpdate.passport = passport;
        if (creditCard) fieldsToUpdate.creditCard = creditCard;
        if (coinType) fieldsToUpdate.coinType = coinType;
        if (language) fieldsToUpdate.language = language;
        if (geniusLevel) fieldsToUpdate.geniusLevel = geniusLevel;
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
            data: updatedUser,
        });
    } catch (error) {
        console.log(error); // dev
        if (error instanceof MongoError  && error.code === 11000) {
            res.status(409).json({
                status: "error",
                message: "Phone number already exists",
            });
        }
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// Modify User Arrays - Done
interface IModifyUserArraysBody {
    action: "add" | "delete";
    search?: {
        location: ILocation;
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
        const updateOptions: any = { new: true };

        if (search && action === "add") {
            updateQuery["$push"] = { search };
        }
        else if (interested) {
            // Add at the end
            await userModel.updateOne(
                { _id: userId },
                [{
                    $set: {
                        interested: {
                            $concatArrays: [
                                {
                                    $filter: {
                                        input: "$interested",
                                        as: "item",
                                        cond: { $ne: ["$$item", new Types.ObjectId(interested)] } // Remove existing
                                    }
                                },
                                [new Types.ObjectId(interested)] // Append to end
                            ]
                        }
                    }
                }]
            );
        }
        else if (savedList) {
            const propertyIdObj = savedList.propertyId ? new Types.ObjectId(savedList.propertyId) : null;
            const user = await userModel.findById(userId);

            if (!user) {
                res.status(404).json({ status: "error", message: "User not found" });
                return;
            }

            const userSavedList = user?.savedLists;

            if(!savedList?.name) {
                if(action === "add")
                    savedList.name = "My Next Trip"
                else {
                    const foundList = userSavedList.find((list) => 
                        list.properties.includes(new ObjectId(savedList.propertyId)))
                    if(!foundList) {
                        res.status(400).json({
                            status: "error",
                            message: `The property id wasn't found on any user list`,
                        });
                        return;
                    }
                    savedList.name = foundList.name;
                }
            }

            const existingList = userSavedList.find((list: any) => list.name === savedList.name);


            if (action === "add" && propertyIdObj) {
                if (existingList) {
                    // Update existing list only if property does not exist
                    updateQuery["$addToSet"] = { "savedLists.$[list].properties": propertyIdObj };
                    updateOptions["arrayFilters"] = [{ "list.name": savedList.name }];
                } else {
                    // Create a new list
                    updateQuery["$push"] = { savedLists: { name: savedList.name, properties: [propertyIdObj] } };
                }
            } else if (action === "delete") {
                if (existingList) {
                    if (savedList.propertyId) {
                        // Remove a single property from the list
                        updateQuery["$pull"] = { "savedLists.$[list].properties": propertyIdObj };
                        updateOptions["arrayFilters"] = [{ "list.name": savedList.name }];
                    } else {
                        // Remove entire saved list
                        updateQuery["$pull"] = { savedLists: { name: savedList.name } };
                    }
                }
            }
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, updateQuery, updateOptions);

        if (!updatedUser) {
            res.status(404).json({ status: "error", message: "User not found" });
            return;
        }

        res.status(200).json({
            status: "success",
            message: `Successfully ${action === "add" ? "added to" : "removed from"} user array`,
            data: updatedUser,
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

// Get Last Searches - Done
export const getSearches = async (req: Request, res: Response) : Promise<void> => {
    try {
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;

        const user = await userModel.findById(userId).select('search');

        if (!user) {
            res.status(404).json({
                status: "error",
                message: "User not found",
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: "Successfully found user searches",
            data: user.search,
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

// Get Interested - Done
export const getInterested = async (req: Request, res: Response) : Promise<void> => {
    try {
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;

        const user = await userModel.findById(userId).select('interested');
        // /populate('interested', "title location rating");

        if (!user) {
            res.status(404).json({
                status: "error",
                message: "User not found",
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: "Successfully found user searches",
            data: user.interested,
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

// Get SavedLists - Done
export const getSavedLists = async (req: Request, res: Response) : Promise<void> => {
    try {
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;

        const user = await userModel.findById(userId)
        .select('savedLists')
        .populate({
            path: 'savedLists.properties',
            model: 'Property',
            select: "title location rating"
        });

        if (!user) {
            res.status(404).json({
                status: "error",
                message: "User not found",
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: "Successfully found user searches",
            data: user.savedLists,
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

//! Delete Account - COME BACK LATER FIX RECURSIVE DELETE TO OTHER MODELS
export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;

        // Delete the user by ID
        const deletedUser = await userModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            res.status(404).json({ status: "error", message: 'User not found' });
            return;
        }

        // Delete associated data - complete later
        // await bookingModel.deleteMany({ userId });
        // await reviewModel.deleteMany({ userId });

        res.status(200).json({  status: "success", message: 'User account deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};