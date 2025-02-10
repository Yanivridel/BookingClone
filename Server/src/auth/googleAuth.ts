// Google Auth imports
import express, { Request, Response } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20';
import { userModel } from '../models/userModel';
import jwt from 'jsonwebtoken';
import { IUser } from '../types/userTypes';

const JTW_EXPIRATION = { expiresIn: process.env.JTW_EXPIRATION};
const isProduction = process.env.NodeEnv === "production";
const CLIENT_URL = isProduction ? process.env.CLIENT_URL_CLOUD : process.env.CLIENT_URL_LOCAL;
const SERVER_URL = isProduction ? process.env.SERVER_URL_CLOUD : process.env.SERVER_URL_LOCAL;

declare module 'express-session' {
    interface SessionData {
        passport: { user: any }
    }
}

interface UserProfile {
    id: string;
    email: string;
    displayName: string;
    googleId: string;
}

interface GoogleAuthenticatedRequest extends Request {
    user?: any;
}

const router = express.Router();

passport.use(
    new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: `${SERVER_URL}/api/auth/google/callback`,
    },
    async (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
        try {
            // Find or create user by email
            const email = profile.emails?.[0]?.value;
            if (!email) {
                return done(new Error('No email found'), undefined);
        }

        let user = await userModel.findOne({ email });
        
        if(!user) {
            user = new userModel({
                email,
                fName: profile.name.givenName || "",
                lName: profile.name.familyName || "",
                username: profile.displayName,
                user_image: profile.photos[0].value || "",
            });
        
            await user.save();
        }

        return done(null, user!);
        } catch (error) {
        return done(error as Error, undefined);
        }
    }
    )
);

passport.serializeUser((user: any, done: Function) => done(null, user));

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await userModel.findById(id) as IUser;
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

router.get('/api/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));


router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/api/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {

        let jwtSecretKey = process.env.JWT_SECRET_KEY as string;
        const user = req.user as IUser;

        const token = jwt.sign(
        {
            userId: user._id,
        },
        jwtSecretKey,
        JTW_EXPIRATION
        );

        res.cookie("token", token, {
            httpOnly: false,  // Should generally be true for security
            secure: isProduction, // true in production, false in development
            sameSite: isProduction ? 'strict' : 'lax',
            maxAge: Number(process.env.COOKIE_EXPIRATION),
            // domain: isProduction ? 'booking-clone-client.vercel.app' : 'localhost'
        });

        // res.cookie("token", token, {
        //     httpOnly: false, // process.env.NodeEnv === 'production'
        //     secure: true, // process.env.NodeEnv === 'production'
        //     sameSite: "lax",
        //     maxAge: Number(process.env.COOKIE_EXPIRATION), // Cookie lifespan of 1 hour
        // });

        console.log("isProduction", isProduction)
        console.log("CLIENT_URL", CLIENT_URL)
        res.redirect(`${CLIENT_URL}`);
    }
);


export default router;
