"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = require("../controllers/bookingController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/create", authMiddleware_1.authenticateToken, bookingController_1.createBooking);
router.patch("/take-rooms", bookingController_1.takeUnTakeRooms);
exports.default = router;
//# sourceMappingURL=bookingRoutes.js.map