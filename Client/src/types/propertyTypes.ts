import { ILocation } from "./locationTypes";

export interface IProperty {
    _id: string;
    title: string;
    type: string;
    location: ILocation;
    images: string[];
    rating: {
        staff: number; // default: 0
        facilities: number; // default: 0
        cleanliness: number; // default: 0
        conform: number; // default: 0
        value_for_money: number; // default: 0
        location: number; // default: 0
        free_wifi: number; // default: 0
    };
    description?: string;
    popularFacilities: string[]; // enum: EFacility
    highlights: [{
        title: string; // enum: EPropertyHighlight
        content: string; 
    }];
    features : [{
        category: string; // enum: EFeatures
        sub: string[];
    }];
    rooms: string;
    qa: [{
        question: string;
        answer: string;
    }];
    houseRules: {
        checkin:{
            start: string;
            end: string;
        };
        checkout: {
            start: string;
            end: string;
        };
        cancellation_prepayment: string;
        children_beds?: {
            child_policy?: string;
            bed_policy?: [{
                age: {
                    start: number; // min: 0
                    end: number;
                };
                type?: string;
                price_num?: number;
                price_msg?: string;
            }];
        };
        age_restriction?: number;
        pets?: boolean;
        groups?: string;
        accepted_payments: string[]; // enum : EPaymentMethods
        parties?: boolean;
    }
    fine_print?: string;
    license?: number;
    fqa: [{
        question: string;
        answer: string;
    }];
    desk_help: {
        start: number;
        end: number;
    };
    host: string;
}

export type TPartialProperty = Partial<IProperty>;