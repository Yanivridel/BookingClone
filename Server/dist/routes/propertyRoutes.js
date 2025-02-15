"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const propertyController_1 = require("../controllers/propertyController");
const router = express_1.default.Router();
router.post("/create", propertyController_1.createProperty);
router.post("/", propertyController_1.getSearchProperties);
router.get("/location-search-autocomplete/:searchText", propertyController_1.getAutocompleteLocations);
router.get("/:id", propertyController_1.getPropertyById);
router.get("/card/:id", propertyController_1.getPropertyByIdForCard);
exports.default = router;
//# sourceMappingURL=propertyRoutes.js.map