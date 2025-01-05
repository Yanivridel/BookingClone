import { Schema, model, Types, Document } from "mongoose";

import { ECoinType, ELanguage } from "./../utils/structures";
import { IUser } from "src/types/userTypes";
import { LocationSchema } from "./locationSchema";

const UserSchema = new Schema<IUser>(
    {
        fName: { type: String },
        lName: { type: String },
        username: { type: String },
        email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
        password: { type: String },
        phoneNumber: { type: String, unique: true },
        birthday: { type: Date },
        gender: { type: String, enum: ["male", "female", "other"] },
        location: { type: LocationSchema },
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
        coinType: { type: String, enum: Object.values(ECoinType), default: ECoinType.USD },
        language: { type: String, enum: Object.values(ELanguage), default: ELanguage.EN },
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
                    location: { type: LocationSchema },
                    checkin: { type: Date },
                    checkout: { type: Date },
                    group_adults: { type: Number },
                    group_children: { type: Number },
                    is_animal: { type: Boolean },
                }],
            default: [],
        },
        interested: {
            type: [{ type: Types.ObjectId, ref: "Property" }],
            default: [],
        },
        savedLists: {
            type: [{
                    name: { type: String },
                    properties: [{ type: Types.ObjectId, ref: "Property" }],
                }],
            default: [],
        },
        geniusLevel: { type: Number, enum: [1, 2, 3], default: 1 },
    },
    { timestamps: true }
);

UserSchema.virtual("fullName").get(function () {
    return `${this.fName || ""} ${this.lName || ""}`.trim();
});

export const userModel = model<IUser>("User", UserSchema);
