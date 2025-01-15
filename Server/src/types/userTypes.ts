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
    gender?: "male" | "female" | "other";
    user_image: string;
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
    search: [ISearchEntry];
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

export interface ISearchEntry {
    _id?: string;
    location: IFilterPropertiesLocation
    date: IFilterPropertiesDate
    options: IFilterPropertiesOptions
}
export interface IFilterPropertiesLocation {
    country?: string;
    region?: string;
    city?: string;
    addressLine?: string;
}
export interface IFilterPropertiesDate {
    startDate?: string | Date;
    endDate?: string | Date;
    length?: number;
    isWeekend?: boolean;
    fromDay?: number;
    yearMonths: [{
        year: number,
        month: number
    }];
}
export interface IFilterPropertiesOptions {
    adults?: number;
    children?: number;
    childrenAges?: number[];
    rooms?: number;
    isAnimalAllowed?: boolean;
    distance?: number; // km
    isBaby?: boolean;
}