import { Document, Types } from 'mongoose'
import { IUser } from './userTypes';

export interface IBooking extends Document {
    _id: Types.ObjectId;
    property_id: Types.ObjectId; // ref: Property
    room_id: Types.ObjectId[]; // ref: Room
    user_id: Types.ObjectId; // ref: User
    reserver: {
        fName: string;
        lName: string;
        email: string;
        country: string;
        phoneNumber: string;
    };
    is_paperless: boolean;
    for_work: {
        company_name: string;
        vat_number: number;
    };
    good_to_know: string[];
    rooms_details: [{
        fullName: string;
        email?: string;
    }];
    add_to_stay: {
        taxi: boolean; // default: false
        car_rent: boolean; // default: false
        shuttle: boolean; // default: false
    };
    special_req?: {
        text: string
        close_rooms: boolean; // default: false
    }
    arrive_time?: number; // start time (e. 11 -> 11:00-12:00 )
    children_beds?: [{
        room_id: Types.ObjectId;
        baby?: Number;
        extra?: Number;
    }];
    is_price_match: boolean; // השוואת מחירים

    

    checkIn: Date;
    checkOut: Date;
    guests: number;
    totalPrice: number;
    status: "pending" | "confirmed" | "cancelled";
    createdAt: Date;
}


