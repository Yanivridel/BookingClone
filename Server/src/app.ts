import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// Google Auth imports
import session from 'express-session';
import passport from 'passport';
import cookieParser from "cookie-parser";

dotenv.config();

import { connectRedis } from './utils/redisClient';
import './utils/stripe'

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware Configuration
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:4173',
    'https://booking-clone-client-emw671yyq-yanivs-projects-d091535c.vercel.app',
    'https://booking-clone-client.vercel.app'
];

app.use(cors({
    origin: function(origin, callback) {
        // If no origin (like server-to-server requests), allow
        if (!origin) {
            return callback(null, true);
        }

        // Check if the origin is in the allowed list
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by Booking CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.options('*', cors());

app.use(express.json());
app.use(cookieParser());

// Database Connection
if (process.env.DB_URI) {
    mongoose.connect(process.env.DB_URI)
    .then(() => console.log("Successfully Connected to DB"))
    .catch((err) => console.error("Connection to DB failed", err));
} else {
    console.error("DB_URI environment variable is not defined");
}

if(process.env.USE_CACHE === "true")
    connectRedis();

// Server Check
app.get('/test', (req: Request, res: Response): void => {
    res.status(200).send({ message: "Server is alive !" });
});

app.use(session({ 
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));


// Passport middleware at app level
app.use(passport.initialize());
app.use(passport.session());

// Routes
import googleAuth from './auth/googleAuth'
import userRoutes from './routes/userRoutes'
import propertyRoutes from './routes/propertyRoutes'
import roomRoutes from './routes/roomRoutes'
import reviewRoutes from './routes/reviewRoutes'
import paymentRoutes from './routes/paymentRoutes'
import bookingRoutes from './routes/bookingRoutes'

app.use(googleAuth);

app.use('/api/users', userRoutes);

app.use('/api/property', propertyRoutes);

app.use('/api/room', roomRoutes);

app.use('/api/review', reviewRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/booking", bookingRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});