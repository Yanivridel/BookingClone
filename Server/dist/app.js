"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
// Google Auth imports
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
dotenv_1.default.config();
require("./utils/stripe");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware Configuration
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
// Database Connection
if (process.env.DB_URI) {
    mongoose_1.default.connect(process.env.DB_URI)
        .then(() => console.log("Successfully Connected to DB"))
        .catch((err) => console.error("Connection to DB failed", err));
}
else {
    console.error("DB_URI environment variable is not defined");
}
// connectRedis();
// Server Check
app.get('/test', (req, res) => {
    res.status(200).send({ message: "Server is alive !" });
});
app.use((0, express_session_1.default)({
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
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Routes
const googleAuth_1 = __importDefault(require("./auth/googleAuth"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const propertyRoutes_1 = __importDefault(require("./routes/propertyRoutes"));
const roomRoutes_1 = __importDefault(require("./routes/roomRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
app.use(googleAuth_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/property', propertyRoutes_1.default);
app.use('/api/room', roomRoutes_1.default);
app.use('/api/review', reviewRoutes_1.default);
app.use("/api/payment", paymentRoutes_1.default);
app.use("/api/booking", bookingRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map