"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.getSavedLists = exports.getInterested = exports.getSearches = exports.modifyUserArrays = exports.editProfile = exports.getSelf = exports.logout = exports.signinUser = exports.sendEmailCode = void 0;
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// utils imports
const auth_1 = require("../utils/auth");
const maps_1 = require("../utils/maps");
const JTW_EXPIRATION = { expiresIn: process.env.JTW_EXPIRATION };
const isProduction = process.env.NodeEnv === "production";
const sendEmailCode = async (req, res) => {
    const { email } = req.body;
    let isLogin = false;
    if (!email) {
        res.status(400).send({ status: "error", message: "Missing required parameters" });
        return;
    }
    const user = await userModel_1.userModel.findOne({ email });
    if (user)
        isLogin = true;
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
const signinUser = async (req, res) => {
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
        let user = await userModel_1.userModel.findOne({ email });
        if (!user) {
            user = new userModel_1.userModel({
                email,
            });
            await user.save();
        }
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = jsonwebtoken_1.default.sign({
            userId: user._id,
        }, jwtSecretKey, JTW_EXPIRATION);
        // Set the JWT as a cookie in the response.
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: Number(process.env.COOKIE_EXPIRATION),
        });
        res.status(201).send({
            status: "success",
            message: "user signed in successfully",
            token,
            data: user
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
exports.signinUser = signinUser;
const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.status(200).json({ status: "success", message: "Logged out successfully" });
};
exports.logout = logout;
// Get Self Token - Done
const getSelf = async (req, res) => {
    try {
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = req.cookies?.token;
        if (!token) {
            res.status(400).json({ status: "error", message: "Missing required authorization token" });
            return;
        }
        // const token = req.headers.authorization.split(' ')[1];
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
        const { fName, lName, username, password, phoneNumber, birthday, gender, user_image, location, passport, creditCard, coinType, language, notifications, geniusLevel, email } = req.body;
        const fieldsToUpdate = {};
        if (fName)
            fieldsToUpdate.fName = fName;
        if (lName)
            fieldsToUpdate.lName = lName;
        if (username)
            fieldsToUpdate.username = username;
        if (email)
            fieldsToUpdate.email = email;
        if (password)
            fieldsToUpdate.password = password;
        if (phoneNumber)
            fieldsToUpdate.phoneNumber = phoneNumber;
        if (birthday)
            fieldsToUpdate.birthday = new Date(birthday);
        if (gender)
            fieldsToUpdate.gender = gender;
        if (user_image)
            fieldsToUpdate.user_image = user_image;
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
        console.log(error); // dev
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
            // Add at the end
            await userModel_1.userModel.updateOne({ _id: userId }, [{
                    $set: {
                        interested: {
                            $concatArrays: [
                                {
                                    $filter: {
                                        input: "$interested",
                                        as: "item",
                                        cond: { $ne: ["$$item", new mongoose_1.Types.ObjectId(interested)] } // Remove existing
                                    }
                                },
                                [new mongoose_1.Types.ObjectId(interested)] // Append to end
                            ]
                        }
                    }
                }]);
        }
        else if (savedList) {
            const propertyIdObj = savedList.propertyId ? new mongoose_1.Types.ObjectId(savedList.propertyId) : null;
            const user = await userModel_1.userModel.findById(userId);
            if (!user) {
                res.status(404).json({ status: "error", message: "User not found" });
                return;
            }
            const userSavedList = user?.savedLists;
            if (!savedList?.name) {
                if (action === "add")
                    savedList.name = "My Next Trip";
                else {
                    const foundList = userSavedList.find((list) => list.properties.includes(new mongodb_1.ObjectId(savedList.propertyId)));
                    if (!foundList) {
                        res.status(400).json({
                            status: "error",
                            message: `The property id wasn't found on any user list`,
                        });
                        return;
                    }
                    savedList.name = foundList.name;
                }
            }
            const existingList = userSavedList.find((list) => list.name === savedList.name);
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
// Get Last Searches - Done
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
        const user = await userModel_1.userModel.findById(userId).select('interested');
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
//! Delete Account - COME BACK LATER FIX RECURSIVE DELETE TO OTHER MODELS
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
//# sourceMappingURL=userController.js.map