import { IUser } from "./userTypes";

export interface IReview {
  _id?: string;
  propertyId: string; // ref: Property
  userId: string | IUser; // ref: User
  passenger_type: string; // enum: [family, couple, friends, single, business]
  language: string; // enum : ELanguage
  rating: number; // min:0, max:10
  room_type: string; // enum: "room" | "studio" | "suite" | "bed" | "villa"
  nights_num: number; // min 1
  reviewText?: string;
  responseFromProperty?: string;
  helpfulVotes: number; // Number of users who found the review helpful
  createdAt: Date;
}

/*
when adding a review you should search the order number and code to know
you really were in this hotel and in which room;
*/
