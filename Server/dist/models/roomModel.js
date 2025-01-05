"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModel = void 0;
const mongoose_1 = require("mongoose");
const structures_1 = require("src/utils/structures");
const RoomSchema = new mongoose_1.Schema({
    //property_id: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    title: { type: String, required: true },
    type: {
        type: String,
        enum: ["room", "studio", "suite", "bed", "villa"],
        required: true
    },
    desc: { type: String, required: true },
    images: { type: [String], default: [] },
    rooms: [{
            type: { type: String, enum: ["sleep", "shower", "living"], required: true, default: "sleep" },
            room_num: { type: Number, min: 1 },
            beds: {
                sofa: { type: Number, default: 0 },
                single: { type: Number, default: 0 },
                double: { type: Number, default: 0 },
                queen: { type: Number, default: 0 },
                bunk: { type: Number, default: 0 }
            }
        }],
    baby: { type: Boolean, default: false },
    facilities: { type: [String], enum: Object.values(structures_1.EFacility), default: [],
        validate: {
            validator: (v) => Object.values(structures_1.EFacility).includes(v),
            message: props => `${props.value} is not a valid Facility!`
        }
    },
    features: [{
            category: { type: String, enum: Object.values(structures_1.EFeatures), required: true,
                validate: {
                    validator: (v) => Object.values(structures_1.EFeatures).includes(v),
                    message: props => `${props.value} is not a valid Feature!`
                }
            },
            sub: { type: [String], default: [] }
        }],
    available: [{
            date: { type: Date, required: true },
            count: { type: Number, min: 0, required: true }
        }],
    offers: [{
            price_per_night: { type: Number, required: true },
            discount: {
                type: { type: String, required: true },
                percentage: { type: Number, required: true },
                expires: { type: Date, required: true }
            },
            is_genius: { type: Boolean, default: false },
            group_adults: { type: Number, required: true },
            group_children: { type: Number, required: true },
            ages: [{ type: Number, min: 0, required: true }],
            meals: [{
                    type: {
                        type: String,
                        enum: ["morning", "noon", "afternoon", "evening"],
                        required: true
                    },
                    rating: { type: Number, min: 0, max: 10, required: true },
                    review_num: { type: Number, min: 0, required: true }
                }],
            cancellation: { type: String, required: true },
            prepayment: {
                type: { type: [String], required: true },
                text: { type: String, required: true }
            },
            internet: { type: String, required: true }
        }],
    overall_count: { type: Number, min: 0, required: true }
}, { timestamps: true });
RoomSchema.set('toJSON', { virtuals: true });
RoomSchema.set('toObject', { virtuals: true });
// Virtual Property: max_guests
RoomSchema.virtual("max_guests").get(function () {
    return this.rooms.beds.sofa + this.rooms.beds.single +
        (this.rooms.beds.queen + this.rooms.beds.bunk + this.rooms.beds.double) * 2;
});
exports.RoomModel = (0, mongoose_1.model)("Room", RoomSchema);
//# sourceMappingURL=roomModel.js.map