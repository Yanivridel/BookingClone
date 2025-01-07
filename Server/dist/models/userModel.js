"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const structures_1 = require("./../utils/structures");
const locationSchema_1 = require("./locationSchema");
const UserSchema = new mongoose_1.Schema({
    fName: { type: String },
    lName: { type: String },
    username: { type: String },
    email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
    password: { type: String },
    phoneNumber: { type: String, unique: true, sparse: true }, // allow null none unique
    birthday: { type: Date },
    gender: { type: String, enum: ["male", "female", "other"] },
    location: { type: locationSchema_1.LocationSchema },
    passport: {
        fName: { type: String },
        lName: { type: String },
        country: { type: String },
        number: { type: String },
        expires: { type: Date },
    },
    creditCard: {
        name: { type: String },
        number: { type: Number },
        expires: { type: Date },
    },
    coinType: { type: String, enum: Object.values(structures_1.ECoinType), default: structures_1.ECoinType.USD,
        validate: {
            validator: (v) => Object.values(structures_1.ECoinType).includes(v),
            message: props => `${props.value} is not a valid coin type!`
        }
    },
    language: { type: String, enum: Object.values(structures_1.ELanguage), default: structures_1.ELanguage.EN,
        validate: {
            validator: (v) => Object.values(structures_1.ELanguage).includes(v),
            message: props => `${props.value} is not a valid language!`
        }
    },
    notifications: {
        dealsAndOffers: {
            dealDiscovery: { type: Boolean, default: false },
            rewards: { type: Boolean, default: false },
            searchAssistance: { type: Boolean, default: false },
        },
        bookingProductsAndServices: {
            bookingForBusiness: { type: Boolean, default: false },
            feedbackAndSurveys: { type: Boolean, default: false },
            productsAndNewsNotifications: { type: Boolean, default: false },
        },
        attractionsAndTravelDeals: {
            dealsAndAttraction: { type: Boolean, default: false },
            flights: { type: Boolean, default: false },
        },
        transportation: {
            publicTransport: { type: Boolean, default: false },
            taxis: { type: Boolean, default: false },
            rentalCars: { type: Boolean, default: false },
        },
        geniusLoyaltyProgram: {
            geniusEmails: { type: Boolean, default: false },
            geniusMembershipProgress: { type: Boolean, default: false },
        },
        emailNotification: {
            soonOrders: { type: Boolean, default: false },
            reviewOrders: { type: Boolean, default: false },
            offerConfirmOrders: { type: Boolean, default: false },
        },
    },
    search: {
        type: [{
                location: { type: locationSchema_1.LocationSchema },
                checkin: { type: Date },
                checkout: { type: Date },
                group_adults: { type: Number },
                group_children: { type: Number },
                ages: { type: [Number], default: [] },
                rooms_num: { type: Number },
                is_animal: { type: Boolean },
                createdAt: { type: Date, default: Date.now }
            }],
        default: [],
    },
    interested: {
        type: [{ type: mongoose_1.Types.ObjectId, ref: "Property" }],
        default: [],
    },
    savedLists: {
        type: [{
                name: { type: String },
                properties: [{ type: mongoose_1.Types.ObjectId, ref: "Property" }],
            }],
        default: [],
    },
    geniusLevel: { type: Number, enum: [1, 2, 3], default: 1 },
}, { timestamps: true });
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });
// Virtual property fullname
UserSchema.virtual("fullName").get(function () {
    return `${this.fName || ""} ${this.lName || ""}`.trim();
});
// Limit searches to 10 latests
UserSchema.post('findOneAndUpdate', async function (user) {
    if (user.search && user.search.length > 10) {
        user.search.shift();
        await user.save();
    }
});
// Faster desc sorting searches
UserSchema.index({ "search.createdAt": -1 });
exports.userModel = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=userModel.js.map