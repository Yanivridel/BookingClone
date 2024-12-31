import { Document, Types } from 'mongoose'

export interface IUser extends Document {
    _id: Types.ObjectId;
    fName?: string;
    lName?: string;
    username?: string;
    email: string;
    password: string;
    phoneNumber?: string;
    birthday?: Date;
    country?: string;
    gender?: "male" | "female" | "other";
    address?: {
        country: string,
        address: string,
        city: string,
        postal: string,
    };
    passport?: {
        fName: string,
        lName: string,
        country: string,
        number: string,
        expires: Date
    };
    creditCard?: {
        name: string,
        number: number,
        expires: Date, 
    }
    coinType: string;
    language: string;
    notifications: {
        dealsAndOffers: {
            dealDiscovery: boolean;
            rewards: boolean;
            searchAssistance: boolean;
        }
        bookingProductsAndServices: {
            bookingForBusiness: boolean;
            feedbackAndSurveys: boolean;
            productsAndNewsNotifications: boolean;
        }
        attractionsAndTravelDeals:{
            dealsAndAttraction: boolean;
            flights: boolean;
        }
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
        }
    };
    search?: [{
        // country: string,
        // COME BACK LATER
        checkin: Date;
        checkout: Date;
        group_adults: number;
        group_children: number;
        is_animal: boolean;
    }];
    interested?: [Types.ObjectId];
    savedLists?: [{
        name: string;
        properties: [Types.ObjectId];
    }];
    geniusLevel: number; // enum: 1, 2 ,3
    
    createdAt: Date;
    updatedAt: Date;
}

/*
the default of showing name is fullname = fname + lname (virtual)

*/