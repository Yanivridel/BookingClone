"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({
            status: "error",
            message: 'Access denied, no token provided'
        });
        return;
    }
    try {
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecretKey);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(401).json({ status: "error", message: 'Invalid token' });
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=authMiddleware.js.map