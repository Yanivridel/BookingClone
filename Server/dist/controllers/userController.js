"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.getSavedLists = exports.getInterested = exports.getSearches = exports.modifyUserArrays = exports.editProfile = exports.getSelf = exports.loginUser = exports.createUser = exports.sendEmailCode = void 0;
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// utils imports
// import { hashPassword, comparePassword } from "../utils/auth";
const auth_1 = require("./../utils/auth");
const maps_1 = require("./../utils/maps");
const JTW_EXPIRATION = { expiresIn: '1d' };
const sendEmailCode = async (req, res) => {
    const { email, isLogin } = req.body;
    if (!email) {
        res.status(400).send({ status: "error", message: "Missing required parameters" });
        return;
    }
    const user = await userModel_1.userModel.findOne({ email });
    if (isLogin && !user) {
        res.status(400).send({ status: "error", message: "User not found" });
        return;
    }
    if (!isLogin && user) {
        res.status(400).send({ status: "error", message: "Email already registered" });
        return;
    }
    try {
        await (0, auth_1.generateVerificationCode)(email, isLogin);
        res.status(200).send({
            status: "success",
            message: "code sent successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to send verification code",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.sendEmailCode = sendEmailCode;
const createUser = async (req, res) => {
    try {
        const { email, code } = req.body;
        if (!email || !code) {
            res.status(400).send({ status: "error", message: "Missing required parameters" });
            return;
        }
        const isValid = await (0, auth_1.verifyVerificationCode)(email, code);
        if (!isValid) {
            res.status(400).send({ status: "error", message: "Invalid or expired code" });
            return;
        }
        const newUser = new userModel_1.userModel({
            email,
        });
        await newUser.save();
        res.status(201).send({
            status: "success",
            message: "user created successfully",
            data: newUser
        });
    }
    catch (error) {
        console.log(error); // dev mode
        if (error instanceof mongodb_1.MongoError && error.code === 11000) {
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
};
exports.createUser = createUser;
// Login User - Done
const loginUser = async (req, res) => {
    try {
        const { email, code } = req.body;
        if (!email || !code) {
            res.status(400).send({ status: "error", message: "Missing required parameters" });
            return;
        }
        const user = await userModel_1.userModel.findOne({ email });
        if (!user) {
            res.status(404).send({ status: "error", message: "User not found" });
            return;
        }
        const isCorrectCode = await (0, auth_1.verifyVerificationCode)(email, code);
        if (isCorrectCode) {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            const token = jsonwebtoken_1.default.sign({
                userId: user._id,
            }, jwtSecretKey, JTW_EXPIRATION);
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
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : "Unknown",
        });
    }
};
exports.loginUser = loginUser;
// Gel Self Token - Done
const getSelf = async (req, res) => {
    try {
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        if (!req.headers.authorization) {
            res.status(400).send({ status: "error", message: "Missing required authorization token" });
            return;
        }
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecretKey);
        const user = await userModel_1.userModel.findById(decoded.userId);
        res.status(200).json({
            status: "success",
            data: user,
        });
    }
    catch (error) {
        console.log(error); // dev mode logging
        res.status(500).json({
            status: 'error',
            message: 'An unexpected error occurred',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.getSelf = getSelf;
const editProfile = async (req, res) => {
    try {
        const authenticatedReq = req;
        const { userId } = authenticatedReq;
        const { fName, lName, username, password, phoneNumber, birthday, gender, location, passport, creditCard, coinType, language, notifications, geniusLevel } = req.body;
        const fieldsToUpdate = {};
        if (fName)
            fieldsToUpdate.fName = fName;
        if (lName)
            fieldsToUpdate.lName = lName;
        if (username)
            fieldsToUpdate.username = username;
        if (password)
            fieldsToUpdate.password = password;
        if (phoneNumber)
            fieldsToUpdate.phoneNumber = phoneNumber;
        if (birthday)
            fieldsToUpdate.birthday = birthday;
        if (gender)
            fieldsToUpdate.gender = gender;
        if (passport)
            fieldsToUpdate.passport = passport;
        if (creditCard)
            fieldsToUpdate.creditCard = creditCard;
        if (coinType)
            fieldsToUpdate.coinType = coinType;
        if (language)
            fieldsToUpdate.language = language;
        if (geniusLevel)
            fieldsToUpdate.geniusLevel = geniusLevel;
        if (notifications)
            fieldsToUpdate.notifications = notifications;
        if (location) {
            fieldsToUpdate.location = location;
            let completeAddress = location.country;
            if (location.region)
                completeAddress += " " + location.region;
            if (location.city)
                completeAddress += " " + location.city;
            if (location.addressLine)
                completeAddress += " " + location.addressLine;
            const coordinates = await (0, maps_1.getCoordinatesByLocation)(completeAddress);
            if (!coordinates) {
                res.status(400).json({ status: "error", message: 'Invalid location provided' });
                return;
            }
            fieldsToUpdate.location.coordinates = {
                type: "Point",
                coordinates
            };
        }
        const updatedUser = await userModel_1.userModel.findOneAndUpdate({ _id: userId }, fieldsToUpdate, { new: true, runValidators: true });
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
    }
    catch (error) {
        console.log(error); // Log for debugging
        if (error instanceof mongodb_1.MongoError && error.code === 11000) {
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
exports.editProfile = editProfile;
const modifyUserArrays = async (req, res) => {
    try {
        const authenticatedReq = req;
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
        const updateQuery = {};
        const updateOptions = { new: true };
        if (search && action === "add") {
            updateQuery["$push"] = { search };
        }
        else if (interested) {
            updateQuery[action === "add" ? "$addToSet" : "$pull"] = {
                interested: new mongoose_1.Types.ObjectId(interested), // Property ID
            };
        }
        else if (savedList) {
            const propertyIdObj = savedList.propertyId ? new mongoose_1.Types.ObjectId(savedList.propertyId) : null;
            const user = await userModel_1.userModel.findById(userId);
            if (!user) {
                res.status(404).json({ status: "error", message: "User not found" });
                return;
            }
            const existingList = user?.savedLists.find((list) => list.name === savedList.name);
            if (action === "add" && propertyIdObj) {
                if (existingList) {
                    // Update existing list only if property does not exist
                    updateQuery["$addToSet"] = { "savedLists.$[list].properties": propertyIdObj };
                    updateOptions["arrayFilters"] = [{ "list.name": savedList.name }];
                }
                else {
                    // Create a new list
                    updateQuery["$push"] = { savedLists: { name: savedList.name, properties: [propertyIdObj] } };
                }
            }
            else if (action === "delete") {
                if (existingList) {
                    if (savedList.propertyId) {
                        // Remove a single property from the list
                        updateQuery["$pull"] = { "savedLists.$[list].properties": propertyIdObj };
                        updateOptions["arrayFilters"] = [{ "list.name": savedList.name }];
                    }
                    else {
                        // Remove entire saved list
                        updateQuery["$pull"] = { savedLists: { name: savedList.name } };
                    }
                }
            }
        }
        const updatedUser = await userModel_1.userModel.findByIdAndUpdate(userId, updateQuery, updateOptions);
        if (!updatedUser) {
            res.status(404).json({ status: "error", message: "User not found" });
            return;
        }
        res.status(200).json({
            status: "success",
            message: `Successfully ${action === "add" ? "added to" : "removed from"} user array`,
            data: updatedUser,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.modifyUserArrays = modifyUserArrays;
// Get Searches - Done
const getSearches = async (req, res) => {
    try {
        const authenticatedReq = req;
        const { userId } = authenticatedReq;
        const user = await userModel_1.userModel.findById(userId).select('search');
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getSearches = getSearches;
// Get Interested - Done
const getInterested = async (req, res) => {
    try {
        const authenticatedReq = req;
        const { userId } = authenticatedReq;
        const user = await userModel_1.userModel.findById(userId).select('interested').populate('interested');
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getInterested = getInterested;
// Get SavedLists - Done
const getSavedLists = async (req, res) => {
    try {
        const authenticatedReq = req;
        const { userId } = authenticatedReq;
        const user = await userModel_1.userModel.findById(userId)
            .select('savedLists')
            .populate({
            path: 'savedLists.properties',
            model: 'Property',
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getSavedLists = getSavedLists;
// Delete Account - COME BACK LATER FIX RECURSIVE DELETE TO OTHER MODELS
const deleteUserById = async (req, res) => {
    try {
        const authenticatedReq = req;
        const { userId } = authenticatedReq;
        // Delete the user by ID
        const deletedUser = await userModel_1.userModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            res.status(404).json({ status: "error", message: 'User not found' });
            return;
        }
        // Delete associated data - complete later
        // await bookingModel.deleteMany({ userId });
        // await reviewModel.deleteMany({ userId });
        res.status(200).json({ status: "success", message: 'User account deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.deleteUserById = deleteUserById;
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
//# sourceMappingURL=userController.js.map