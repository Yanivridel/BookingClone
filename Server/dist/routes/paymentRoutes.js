"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentController_1 = require("../controllers/paymentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/create", authMiddleware_1.authenticateToken, paymentController_1.createPayment);
router.post("/save", authMiddleware_1.authenticateToken, paymentController_1.savePayment);
exports.default = router;
//# sourceMappingURL=paymentRoutes.js.map