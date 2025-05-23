import { EFacility, EFeatures } from "./propertyTypes";

export interface IRoom {
  _id: string;
  title: string;
  type: "room" | "studio" | "suite" | "bed" | "villa";
  desc: string;
  images: string[];
  rooms: [
    {
      type: string;
      room_num: number;
      beds: {
        sofa: number; // default: 0
        single: number; // default: 0
        double: number; // default: 0
        queen: number; // default: 0
        bunk: number; // default: 0
      };
    }
  ];
  baby: boolean; // default: false
  max_guests?: number; // virtual property: sofa + single + (queen + bunk + double)*2
  facilities?: EFacility[]; // enum: EFacility
  features: [
    {
      category: EFeatures; // enum: EFeatures
      sub: string[];
    }
  ];
  available: [
    {
      date: Date;
      count: number; // min: 0
    }
  ]; // if search by date range -> get the lowest count in that range. (if no found, take overall_count)
  offers: [
    {
      _id: string;
      price_per_night: number; // לפני מעמ
      discount: {
        type: string;
        percentage: number; // e.x 0.3
        expires: Date;
      };
      is_genius: boolean; // default: false
      group_adults: number;
      group_children: number;
      ages: [number]; // min of each element: 0
      meals: [
        {
          type: "morning" | "noon" | "afternoon" | "evening";
          rating: number; // min: 0 , max: 10
          review_num: number; // min: 0
        }
      ]; // empty arr -> the room does not include meals
      cancellation: string; // "" -> no returns
      prepayment: {
        type: string[]; // in client: join("or")
        text: string;
      };
      internet: string;
    }
  ];
  overall_count: number; // min: 0
}

export type TSelectedRoom = Omit<IRoom, "available"> & {
  available: {
    availableRooms: number;
    startDate: string;
  };
  count: number;
};
export type TPartialRoom = Partial<IRoom>;
