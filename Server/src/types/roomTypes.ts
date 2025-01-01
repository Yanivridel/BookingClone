import { Types } from "mongoose";

export interface IRoom {
    _id: Types.ObjectId;
    property_id: Types.ObjectId; // ref: property
    title: string;
    type: string; // enum: ["room", "studio", "suite", "bed"]
    beds: {
        sofa: number; // default: 0
        single: number; // default: 0
        queen: number; // default: 0
        bunk: number; // default: 0
    }
    max_guests?: number; // virtual
    facilities?: string[]; // enum: EFacility
    features : [{
        category: string; // enum: EFeatures
        sub: string[];
    }];
    available: [{
        date: Date;
        count: number;
    }]; // if search by date range -> get the lowest count in that range. (if no found, take overall_count)
    offers: [{
        price_per_night: number; // לפני מעמ
        discount : {
            type: string;
            percentage: number; // e.x 0.3
            expires: Date;
        },
        meals: [{
            type: string; // enum: ["morning", "noon", "afternoon", "evening"]
            rating: number;
            review_num: number;
        }]
        cancellation: string; // "" -> no returns
        prepayment: {
            type: string[]; // join("or")
            text: string;
        }
        internet: string;
    }]
    overall_count: number;
}