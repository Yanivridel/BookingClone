"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const structures_1 = require("../utils/structures");
const locationSchema_1 = require("./locationSchema");
const PropertySchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true, enum: structures_1.EAccommodationType },
    location: locationSchema_1.LocationSchema,
    images: { type: [String], required: true },
    rating: {
        staff: { type: Number, default: 0, min: 0, max: 10 },
        facilities: { type: Number, default: 0, min: 0, max: 10 },
        cleanliness: { type: Number, default: 0, min: 0, max: 10 },
        conform: { type: Number, default: 0, min: 0, max: 10 },
        value_for_money: { type: Number, default: 0, min: 0, max: 10 },
        location: { type: Number, default: 0, min: 0, max: 10 },
        free_wifi: { type: Number, default: 0, min: 0, max: 10 },
    },
    description: { type: String, default: '' },
    popularFacilities: { type: [String], required: true, enum: structures_1.EFacility },
    highlights: [{
            title: { type: String, required: true, enum: structures_1.EPropertyHighlight },
            content: { type: String, required: true },
        }],
    hotel_area_info: [{
            category: { type: String, required: true, enum: structures_1.EHotelAreaInfo },
            sub: [{
                    content: { type: String, required: true },
                    distance: { type: Number, required: true }
                }],
        }],
    features: [{
            category: { type: String, required: true, enum: structures_1.EFeatures },
            sub: { type: [String], required: true },
        }],
    rooms: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Room" }],
    qa: [{
            question: { type: String, required: true },
            answer: { type: String, required: true },
        }],
    houseRules: {
        checkin: {
            start: { type: String, required: true },
            end: { type: String, required: false },
        },
        checkout: {
            start: { type: String, required: true },
            end: { type: String, required: false },
        },
        children_beds: {
            child_policy: { type: String },
            bed_policy: [{
                    age: {
                        start: { type: Number, required: true },
                        end: { type: Number, required: true },
                    },
                    type: { type: String },
                    price_num: { type: Number },
                    price_msg: { type: String }
                }],
        },
        age_restriction: { type: Number },
        pets: { type: Boolean },
        groups: { type: String },
        accepted_payments: { type: [String], required: true, enum: structures_1.EPaymentMethods, default: [] },
        parties: { type: Boolean },
    },
    fine_print: { type: String },
    license: { type: Number },
    fqa: [{
            question: { type: String, required: true },
            answer: { type: String, required: true },
        }],
    desk_help: {
        start: { type: Number, default: 0 },
        end: { type: Number, default: 24 },
    },
    host: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
});
PropertySchema.set('toJSON', { virtuals: true });
PropertySchema.set('toObject', { virtuals: true });
// Virtual property total_rating
PropertySchema.virtual("total_rating").get(function () {
    return (this.rating.staff + this.rating.facilities + this.rating.cleanliness + this.rating.conform
        + this.rating.value_for_money + this.rating.location + this.rating.free_wifi) / 7;
});
PropertySchema.virtual("reviews_num", {
    ref: 'Review',
    localField: '_id',
    foreignField: 'propertyId',
    count: true
});
// Mongoose Model for Property
exports.propertyModel = mongoose_1.default.model('Property', PropertySchema);
//# sourceMappingURL=propertyModel.js.map