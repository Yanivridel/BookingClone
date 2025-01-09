import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

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
app.get('/', (req: Request, res: Response): void => {
    res.status(200).send({ message: "Server is alive !" });
});

// Routes
import userRoutes from './routes/userRoutes'
import propertyRoutes from './routes/propertyRoutes'
import roomRoutes from './routes/roomRoutes'
import reviewRoutes from './routes/reviewRoutes'

app.use('/api/users', userRoutes);

app.use('/api/property', propertyRoutes);

app.use('/api/room', roomRoutes);

app.use('/api/review', reviewRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});