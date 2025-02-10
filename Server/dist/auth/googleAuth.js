"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Google Auth imports
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JTW_EXPIRATION = { expiresIn: process.env.JTW_EXPIRATION };
const isProduction = process.env.NodeEnv === "production";
const CLIENT_URL = isProduction ? process.env.CLIENT_URL_CLOUD : process.env.CLIENT_URL_LOCAL;
const SERVER_URL = isProduction ? process.env.SERVER_URL_CLOUD : process.env.SERVER_URL_LOCAL;
const router = express_1.default.Router();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${SERVER_URL}/api/auth/google/callback`,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Find or create user by email
        const email = profile.emails?.[0]?.value;
        if (!email) {
            return done(new Error('No email found'), undefined);
        }
        let user = await userModel_1.userModel.findOne({ email });
        if (!user) {
            user = new userModel_1.userModel({
                email,
                fName: profile.name.givenName || "",
                lName: profile.name.familyName || "",
                username: profile.displayName,
                user_image: profile.photos[0].value || "",
            });
            await user.save();
        }
        return done(null, user);
    }
    catch (error) {
        return done(error, undefined);
    }
}));
passport_1.default.serializeUser((user, done) => done(null, user));
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await userModel_1.userModel.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error, null);
    }
});
router.get('/api/auth/google', passport_1.default.authenticate('google', {
    scope: ['profile', 'email']
}));
router.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/api/auth/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const user = req.user;
    const token = jsonwebtoken_1.default.sign({
        userId: user._id,
    }, jwtSecretKey, JTW_EXPIRATION);
    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: Number(process.env.COOKIE_EXPIRATION),
    });
    res.redirect(CLIENT_URL);
});
exports.default = router;
//# sourceMappingURL=googleAuth.js.map