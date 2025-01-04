import { Document, Types } from 'mongoose'

import { ECoinType, ELanguage } from "./../utils/structures";
import { ILocation } from "./../types/propertyTypes";

export interface IUser extends Document {
    _id: Types.ObjectId;
    fName?: string;
    lName?: string;
    username?: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    birthday?: Date;
    country?: string;
    gender?: "male" | "female" | "other";
    location?: ILocation;
    passport?: {
        fName: string;
        lName: string;
        country: string;
        number: string;
        expires: Date;
    };
    creditCard?: {
        name: string;
        number: number;
        expires: Date;
    };
    coinType: ECoinType; // enum ECoinType
    language: ELanguage; // enum ELanguage
    notifications: {
        dealsAndOffers: {
            dealDiscovery: boolean;
            rewards: boolean;
            searchAssistance: boolean;
        };
        bookingProductsAndServices: {
            bookingForBusiness: boolean;
            feedbackAndSurveys: boolean;
            productsAndNewsNotifications: boolean;
        };
        attractionsAndTravelDeals: {
            dealsAndAttraction: boolean;
            flights: boolean;
        };
        transportation: {
            publicTransport: boolean;
            taxis: boolean;
            rentalCars: boolean;
        };
        geniusLoyaltyProgram: {
            geniusEmails: boolean;
            geniusMembershipProgress: boolean;
        };
        emailNotification: {
            soonOrders: boolean;
            reviewOrders: boolean;
            offerConfirmOrders: boolean;
        };
    };
    search: [
        {
            location: ILocation;
            checkin: Date;
            checkout: Date;
            group_adults: number;
            group_children: number;
            is_animal: boolean;
        }
    ];
    interested: [Types.ObjectId];
    savedLists: [
        {
            name: string;
            properties: [Types.ObjectId];
        }
    ];
    geniusLevel: 1 | 2 | 3; // enum values

    createdAt: Date;
    updatedAt: Date;

    fullName?: string; // Virtual property
}

/*
the default of showing name is fullname = fname + lname (virtual)

*/