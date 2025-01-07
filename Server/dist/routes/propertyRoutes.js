"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const propertyController_1 = require("../controllers/propertyController");
const router = express_1.default.Router();
router.post("/create", propertyController_1.createProperty);
// router.get("/", getProperties);
exports.default = router;
//# sourceMappingURL=propertyRoutes.js.map