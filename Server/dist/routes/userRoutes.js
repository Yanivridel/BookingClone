"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/send-code', userController_1.sendEmailCode);
router.post("/signin", userController_1.signinUser);
router.get('/get-self', userController_1.getSelf);
router.patch('/edit-profile', authMiddleware_1.authenticateToken, userController_1.editProfile);
router.patch('/modify-arrays', authMiddleware_1.authenticateToken, userController_1.modifyUserArrays);
router.get('/search', authMiddleware_1.authenticateToken, userController_1.getSearches);
router.get('/interested', authMiddleware_1.authenticateToken, userController_1.getInterested);
router.get('/saved-lists', authMiddleware_1.authenticateToken, userController_1.getSavedLists);
router.delete('/delete-account', authMiddleware_1.authenticateToken, userController_1.deleteUserById);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map