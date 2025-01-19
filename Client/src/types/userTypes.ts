import { ILocation } from "./locationTypes";


export type TPartialUser = Partial<IUser>;

export interface IUser {
    _id: string;
    fName?: string;
    lName?: string;
    username?: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    user_image?: string;
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
    coinType: string; // enum ECoinType
    language: string; // enum ELanguage
    notifications?: {
        dealsAndOffers?: {
            dealDiscovery?: boolean;
            rewards?: boolean;
            searchAssistance?: boolean;
        };
        bookingProductsAndServices?: {
            bookingForBusiness?: boolean;
            feedbackAndSurveys?: boolean;
            productsAndNewsNotifications?: boolean;
        };
        attractionsAndTravelDeals?: {
            dealsAndAttraction?: boolean;
            flights?: boolean;
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
    search: ISearchEntry[];
    interested: [string];
    savedLists: [
        {
            name: string;
            properties: [string];
        }
    ];
    geniusLevel: 1 | 2 | 3; // enum values

    createdAt: Date;
    updatedAt: Date;

    fullName?: string; // Virtual property
}

export interface UserState {
    _id: string;
    username: string;
    fName: string,
    lName: string,
    email: string;
    password: string;
    user_image: string;
    coinType: string; 
    language: string;
    search: ISearchEntry[];
    interested: string[];
    savedLists: ISavedList[];
    geniusLevel: 1 | 2 | 3;
}

export interface ISearchEntry {
    _id?: string;
    location: IFilterPropertiesLocation
    date: IFilterPropertiesDate
    options: IFilterPropertiesOptions
}
export interface ISavedList {
    name: string;
    properties: string[];
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