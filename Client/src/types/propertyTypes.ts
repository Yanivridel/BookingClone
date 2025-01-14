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
  popularFacilities: EFacility[]; // enum: EFacility
  highlights: [
    {
      title: EPropertyHighlight;
      content: string;
    }
  ];
  features: [
    {
      category: EFeatures;
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
  hotel_area_info: {
    category: IHotelAreaInfoCategoty;
    id: string;
    _id: string;
    sub: {
      content: string;
      distance: number;
      _id: string;
      id: string;
    }[];
  }[];
  total_rating?: number;
  reviews_num?: number;
  selectedRooms?: {
    id: string;
    count: number;
    available: {
      startDate: Date;
      availableRooms: number;
    };
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
    bathrooms: number;
    bedrooms: number;
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

export interface IFilters {
  overall_count: number;
  type: { [key: string]: number };
  rating: { [key: number]: number };
  popularFacilities: { [key: string]: number };
  roomType: { [key: string]: number };
  roomFacilities: { [key: string]: number };
  meals: { [key: string]: number };
  freeCancellation: number;
  onlinePayment: number;
  region: { [key: string]: number };
  price: {
      min: number;
      max: number;
  };
  doubleBeds: number;
  singleBeds: number;
}

export type IHotelAreaInfoCategoty =
  | "Public transit"
  | "Closest Airports"
  | "Restaurants & cafes"
  | "Natural Beauty"
  | "What's nearby"
  | "Top attractions";

export type EPropertyHighlight =
  | "Location"
  | "Wellness"
  | "View"
  | "Breakfast"
  | "Dining"
  | "Value"
  | "WiFi"
  | "Beach access"
  | "Family-friendly"
  | "Pet-friendly"
  | "Luxury"
  | "Sustainability"
  | "Unique stay"
  | "Transport options"
  | "Fitness"
  | "Pool"
  | "Parking"
  | "Spa"
  | "Business facilities"
  | "Historical building"
  | "Modern design"
  | "Romantic"
  | "Adventure activities"
  | "All-inclusive"
  | "Sports facilities"
  | "Accessibility"
  | "Kids-friendly"
  | "Quiet environment";

export type EFacility =
  | "Free parking"
  | "Free WiFi"
  | "Parking"
  | "Airport shuttle"
  | "Family rooms"
  | "Outdoor pool"
  | "Indoor pool"
  | "Spa and wellness center"
  | "Fitness center"
  | "Restaurant"
  | "Bar"
  | "Non-smoking rooms"
  | "Beachfront"
  | "Room service"
  | "Breakfast included"
  | "Private beach area"
  | "Free cancellation"
  | "Air conditioning"
  | "Heating"
  | "Terrace"
  | "Garden"
  | "Hot tub/Jacuzzi"
  | "Sauna"
  | "Tennis court"
  | "Golf course"
  | "Water sports facilities"
  | "Skiing"
  | "Ski storage"
  | "Ski equipment rental"
  | "Children's playground"
  | "Business center"
  | "Meeting/banquet facilities"
  | "Laundry services"
  | "Dry cleaning"
  | "Kitchen facilities"
  | "Balcony"
  | "Mini market on site"
  | "Facilities for disabled guests"
  | "ATM on site"
  | "Currency exchange"
  | "BBQ facilities"
  | "Nightclub/DJ"
  | "Library"
  | "Cycling"
  | "Hiking"
  | "Car rental"
  | "Shuttle service"
  | "Valet parking"
  | "Electric vehicle charging station"
  | "Tea/Coffee Maker in All Rooms"
  | "Very Good Breakfast"
  | "Animals Allowed"
  | "24-hour reception desk";

export type EFeatures =
  | "Accessibility"
  | "Outdoor swimming pool"
  | "Spa"
  | "Languages Spoken"
  | "Front Desk Services"
  | "Entertainment & Family Services"
  | "Cleaning Services"
  | "Business Facilities"
  | "Safety & security"
  | "General"
  | "Bathroom"
  | "Bedroom"
  | "Outdoors"
  | "Kitchen"
  | "Room Amenities"
  | "Pets"
  | "Activities"
  | "Living Area"
  | "Media & Technology"
  | "Food & Drink"
  | "Internet"
  | "Parking";
