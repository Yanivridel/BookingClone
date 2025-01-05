import { Types } from "mongoose";


export interface IReview {
    _id: Types.ObjectId;
    propertyId: Types.ObjectId;
    userId: Types.ObjectId;
    rating: number; // min:0, max:10
    
    reviewText: string; // Text content of the review
    helpfulVotes: number; // Number of users who found the review helpful
    responseFromProperty: string | null; // Optional response from the property owner or manager
    cleanlinessRating: number; // Rating for cleanliness (e.g., 1-5)
    locationRating: number; // Rating for location (e.g., 1-5)
    serviceRating: number; // Rating for service (e.g., 1-5)
    valueRating: number; // Rating for value (e.g., 1-5)
    facilitiesRating: number; // Rating for facilities (e.g., 1-5)
    comfortRating: number; // Rating for comfort (e.g., 1-5)
    verifiedStay: boolean; // Flag to indicate if the review is from a verified stay

    createdAt: Date;
}

/*
when adding a review you should search the order number and code to know
you really were in this hotel and in which room; 

*/