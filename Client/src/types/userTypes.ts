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
    search: [
        {
            _id?: string,
            location: ILocation;
            checkin: Date;
            checkout: Date;
            group_adults: number;
            group_children: number;
            ages: number[];
            rooms_num: number;
            is_animal: boolean;
            img?: string;
        }
    ];
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
    location: ILocation;
    checkin: Date;
    checkout: Date;
    group_adults: number;
    group_children: number;
    ages: number[];
    rooms_num: number;
    is_animal: boolean;
}
export interface ISavedList {
    name: string;
    properties: string[];
}