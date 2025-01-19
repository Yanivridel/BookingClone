import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// Google Auth imports
import session from 'express-session';
import passport from 'passport';

dotenv.config();

import { connectRedis } from './utils/redisClient';

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware Configuration
app.use(express.json());
app.use(cors( {
    origin: "http://localhost:5173",
    credentials: true
}));

// Database Connection
if (process.env.DB_URI) {
    mongoose.connect(process.env.DB_URI)
    .then(() => console.log("Successfully Connected to DB"))
    .catch((err) => console.error("Connection to DB failed", err));
} else {
    console.error("DB_URI environment variable is not defined");
}

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
        secure: process.env.NODE_ENV === 'production', // true in production
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

app.use(googleAuth);

app.use('/api/users', userRoutes);

app.use('/api/property', propertyRoutes);

app.use('/api/room', roomRoutes);

app.use('/api/review', reviewRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});