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
exports.PropertyModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const structures_1 = require("./../utils/structures");
const locationSchema_1 = require("./locationSchema");
const PropertySchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true, enum: Object.values(structures_1.EAccommodationType),
        validate: {
            validator: (v) => Object.values(structures_1.EAccommodationType).includes(v),
            message: props => `${props.value} is not a valid Accommodation!`
        }
    },
    location: locationSchema_1.LocationSchema,
    images: { type: [String], required: true },
    rating: {
        team: { type: Number, default: 0 },
        facilities: { type: Number, default: 0 },
        cleanliness: { type: Number, default: 0 },
        conform: { type: Number, default: 0 },
        value_for_money: { type: Number, default: 0 },
        location: { type: Number, default: 0 },
        free_wifi: { type: Number, default: 0 },
    },
    description: { type: String, default: '' },
    popularFacilities: { type: [String], required: true, enum: structures_1.EFacility },
    highlights: [{
            title: { type: String, required: true, enum: structures_1.EPropertyHighlight },
            content: { type: String, required: true },
        }],
    features: [{
            category: { type: String, required: true, enum: structures_1.EFeatures },
            sub: { type: [String], required: true },
        }],
    rooms: { type: mongoose_1.Schema.Types.ObjectId, ref: "Room" },
    qa: [{
            question: { type: String, required: true },
            answer: { type: String, required: true },
        }],
    houseRules: {
        checkin: {
            start: { type: String, required: true },
            end: { type: String, required: true },
        },
        checkout: {
            start: { type: String, required: true },
            end: { type: String, required: true },
        },
        cancellation_prepayment: { type: String, required: true },
        children_beds: {
            child_policy: { type: String },
            bed_policy: [{
                    age: {
                        start: { type: Number, required: true },
                        end: { type: Number, required: true },
                    },
                    type: { type: String },
                    price: { type: String },
                }],
        },
        age_restriction: { type: Number },
        pets: { type: Boolean },
        groups: { type: String },
        accepted_payments: { type: [String], required: true, enum: structures_1.EPaymentMethods },
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
// Mongoose Model for Property
exports.PropertyModel = mongoose_1.default.model('Property', PropertySchema);
//# sourceMappingURL=propertyModel.js.map