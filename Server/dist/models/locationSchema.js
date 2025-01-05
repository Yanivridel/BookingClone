"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationSchema = void 0;
const mongoose_1 = require("mongoose");
const CoordinatesSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ['Point'],
        default: "Point",
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});
exports.LocationSchema = new mongoose_1.Schema({
    country: { type: String, required: true },
    region: { type: String },
    city: { type: String },
    area: { type: String },
    addressLine: { type: String },
    zipCode: { type: String },
    coordinates: {
        type: CoordinatesSchema,
        required: false
    }
});
// For geographical queries
exports.LocationSchema.index({ coordinates: "2dsphere" }, { sparse: true });
//# sourceMappingURL=locationSchema.js.map