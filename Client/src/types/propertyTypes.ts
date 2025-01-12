import { ILocation } from "./locationTypes";
import { IRoom } from "./roomTypes";

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
  highlights: [
    {
      title: string; // enum: EPropertyHighlight
      content: string;
    }
  ];
  features: [
    {
      category: string; // enum: EFeatures
      sub: string[];
    }
  ];
  rooms: string | IRoom[];
  qa: [
    {
      question: string;
      answer: string;
    }
  ];
  houseRules: {
    checkin: {
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
      bed_policy?: [
        {
          age: {
            start: number; // min: 0
            end: number;
          };
          type?: string;
          price_num?: number;
          price_msg?: string;
        }
      ];
    };
    age_restriction?: number;
    pets?: boolean;
    groups?: string;
    accepted_payments: string[]; // enum : EPaymentMethods
    parties?: boolean;
  };
  fine_print?: string;
  license?: number;
  fqa: [
    {
      question: string;
      answer: string;
    }
  ];
  desk_help: {
    start: number;
    end: number;
  };
  host: string;
  total_rating?: number;
  reviews_num?: number;
  selectedRooms?: {
    id: string;
    count: number;
    available: {
      startDate: Date;
      availableRooms: number;
    }
  }[];
}

export interface ISearchPropertiesReq {
  primary: {
    location: IFilterPropertiesLocation;
    date: IFilterPropertiesDate;
    options: IFilterPropertiesOptions;
  };
  secondary?: {
    type: string[]; // hotel etc..
    rating: number[]; // 1-5
    popularFacilities: string[];
    roomType: string[];
    roomFacilities: string[];
    meals: string[];
    freeCancellation: boolean;
    onlinePayment: boolean;
    region: string[];
    price: {
      min: number;
      max: number;
    };
    doubleBeds: boolean;
    singleBeds: boolean;
  };
}

interface IFilterPropertiesLocation {
  country?: string;
  region?: string;
  city?: string;
  addressLine?: string;
}

interface IFilterPropertiesDate {
  startDate?: string;
  endDate?: string;
  length?: number;
  isWeekend?: boolean;
  fromDay?: number;
  yearMonths?: { year: number; month: number }[];
}
interface IFilterPropertiesOptions {
  adults?: number;
  children?: number;
  childrenAges?: number[];
  rooms?: number;
  isAnimalAllowed?: boolean;
  distance?: number; // km
  isBaby?: boolean;
}

export type TPartialProperty = Partial<IProperty>;
