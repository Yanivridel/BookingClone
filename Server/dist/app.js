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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const redisClient_1 = require("./utils/redisClient");
require("./utils/stripe");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware Configuration
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:4173',
    'https://booking-clone-client-emw671yyq-yanivs-projects-d091535c.vercel.app',
    'https://booking-clone-client.vercel.app'
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // If no origin (like server-to-server requests), allow
        if (!origin) {
            return callback(null, true);
        }
        // Check if the origin is in the allowed list
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by Booking CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.options('*', (0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Database Connection
if (process.env.DB_URI) {
    mongoose_1.default.connect(process.env.DB_URI)
        .then(() => console.log("Successfully Connected to DB"))
        .catch((err) => console.error("Connection to DB failed", err));
}
else {
    console.error("DB_URI environment variable is not defined");
}
if (process.env.USE_CACHE !== "false")
    (0, redisClient_1.connectRedis)();
// Server Check
app.get('/test', (req, res) => {
    res.status(200).send({ message: "Server is alive !" });
});
app.use((0, express_session_1.default)({
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