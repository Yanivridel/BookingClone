import { Schema, model, Types } from "mongoose";

import { ECoinType, ELanguage } from "../utils/structures";
import { IUser } from "../types/userTypes";
import { LocationSchema } from "./locationSchema";

const UserSchema = new Schema<IUser>(
    {
        fName: { type: String },
        lName: { type: String },
        username: { type: String },
        email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
        password: { type: String },
        phoneNumber: { type: String, unique: true, sparse: true }, // allow null none unique
        birthday: { type: Date },
        gender: { type: String, enum: ["male", "female", "non-binary", "other"] },
        user_image: { type: String }, 
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
        coinType: { type: String, enum: Object.values(ECoinType), default: ECoinType.USD,
            validate: {
                validator: (v: any) => Object.values(ECoinType).includes(v),
                message: (props: any) => `${props.value} is not a valid coin type!`
            }
        },
        language: { type: String, enum: Object.values(ELanguage), default: ELanguage.EN,
            validate: {
                validator: (v: any) => Object.values(ELanguage).includes(v),
                message: (props:any) => `${props.value} is not a valid language!`
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
                    location: { type: LocationSchema },
                    date : {
                        startDate: { type: Schema.Types.Mixed },
                        endDate: Schema.Types.Mixed,
                        length: Number,
                        isWeekend: Boolean,
                        fromDay: Number,
                        yearMonths: [{
                            year: Number,
                            month: Number
                        }]
                    },
                    options: {
                        adults: Number,
                        childrenAges: [Number],
                        rooms: Number,
                        isAnimalAllowed: Boolean,
                        isBaby: Boolean,
                    },
                    createdAt: { type: Date, default: Date.now}
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

UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

// Virtual property fullname
UserSchema.virtual("fullName").get(function () {
    return `${this.fName || ""} ${this.lName || ""}`.trim();
});
// Limit searches to 10 latests
UserSchema.post('findOneAndUpdate', async function (user: any) {
    if (user.search && user.search.length > 10) {
        user.search.shift();
        await user.save();
    }
    if (user.interested && user.interested.length > 10) {
        user.interested.shift();
        await user.save(); 
    }
});
// Faster desc sorting searches
UserSchema.index({ "search.createdAt": -1 });


export const userModel = model<IUser>("User", UserSchema);
