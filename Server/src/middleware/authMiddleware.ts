import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { AuthenticatedRequestOptional } from '../types/expressTypes';

export const authenticateToken = async (req: AuthenticatedRequestOptional, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ 
        status: "error",
        message: 'Access denied, no token provided' 
        });
        return;
    }

    try {
        const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
        
        const decoded = jwt.verify(token, jwtSecretKey) as { userId: string };

        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ status: "error", message: 'Invalid token' });
    }
};
