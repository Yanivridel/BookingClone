"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewModel = void 0;
const mongoose_1 = require("mongoose");
const structures_1 = require("../utils/structures");
const ReviewSchema = new mongoose_1.Schema({
    propertyId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Property", required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    passenger_type: {
        type: String,
        enum: ["family", "couple", "friends", "single", "business"],
        required: true,
    },
    language: { type: String, enum: structures_1.ELanguage, required: true },
    rating: { type: Number, min: 0, max: 10, required: true },
    room_type: {
        type: String,
        enum: ["room", "studio", "suite", "bed", "villa"],
        required: true,
    },
    nights_num: { type: Number, min: 1, required: true },
    reviewText: { type: String },
    responseFromProperty: { type: String },
    helpfulVotes: { type: Number, default: 0, min: 0 },
}, { timestamps: true });
exports.reviewModel = (0, mongoose_1.model)("Review", ReviewSchema);
//# sourceMappingURL=reviewModel.js.map