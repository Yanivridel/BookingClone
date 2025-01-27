import { Document, Types } from "mongoose";

export interface IBooking extends Document {
    propertyId: Types.ObjectId;
    rooms: {
        roomId: Types.ObjectId;
        count: number;
    }[]
    userId: Types.ObjectId;

    reserver: {
        fName: string;
        lName: string;
        email: string;
        country: string;
        phoneNumber: string;
    };

    is_paperless?: boolean;
    for_work?: {
        company_name: string;
        vat_number: number;
    };

    rooms_details: {
        roomId: Types.ObjectId
        fullName: string;
        email?: string;
    }[];

    add_to_stay?: {
        taxi?: boolean; // default: false
        car_rent?: boolean; // default: false
        shuttle?: boolean; // default: false
    };

    special_req?: {
        text?: string;
        close_rooms?: boolean; // default: false
    };

    children_beds?: {
        room_id: Types.ObjectId;
        baby?: number;
        extra?: number;
    }[];

    checkIn: Date;
    checkOut: Date;
    guests: number;
    status: "on going" | "confirmed" | "cancelled" | "checked-in" | "completed";

    createdAt: Date;
    updatedAt: Date;
}

export type TPartialBooking = Partial<IBooking> 

type ReplaceObjectIdWithString<T> = {
    [K in keyof T]: T[K] extends Types.ObjectId
        ? string
        : T[K] extends Types.ObjectId[]
        ? string[]
        : T[K] extends object
        ? ReplaceObjectIdWithString<T[K]>
        : T[K];
};

export type TBookingStringified = ReplaceObjectIdWithString<IBooking>;