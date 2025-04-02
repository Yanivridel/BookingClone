import { IProperty } from "./propertyTypes";

export type TBookingDetails = {
  propertyId: string;
  rooms: {
    roomId: string;
    count: number;
  }[];
  userId: string;

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
    roomId: string;
    offerId: string;
    fullName?: string;
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
    room_id: string;
    baby?: number;
    extra?: number;
  }[];

  checkIn: Date;
  checkOut: Date;
  guests: number;
};

// after order  (send to booking page from propertyTable)
export type BookingInfo = {
  offersRoomSelected: {
    roomId: string;
    offerId: string;
    count: number;
  }[];
  propertyData: IProperty;
  bookingDetailsData: TBookingDetailsData;
};

export type RoomsLeaders =
  | []
  | {
      roomId: string;
      index: number;
      offerId: string;
      fullName?: string;
      email?: string;
    }[];

export type TBookingDetailsData = {
  totalPrice?: number;
  totalPriceWithDiscount?: number;
  roomsNumber?: number;
  startDate: Date;
  endDate: Date;
  children?: number;
  adults: number;
};
