import { Request, Response } from "express";
import { bookingModel } from "src/models/bookingModel";
import { TPartialBooking } from "src/types/bookingTypes";
import { AuthenticatedRequest } from "src/types/expressTypes";

export const createBooking = async (req: Request<{},{},TPartialBooking>, res: Response): Promise<void> => {
    try {
        const { propertyId, rooms, reserver, is_paperless, for_work, rooms_details, 
            add_to_stay, special_req ,children_beds, guests, checkIn, checkOut } = req.body;
        const authenticatedReq = req as AuthenticatedRequest;
        const { userId } = authenticatedReq;

        if (!propertyId || !rooms || !reserver || !rooms_details || !checkIn || !checkOut || !guests) {
            res.status(400).json({ status: "Error", message: "Missing required parameters" });
            return;
        }

        const toAdd: any = {
            userId,
            propertyId,
            rooms,
            reserver,
            rooms_details,
            guests,
            checkIn,
            checkOut
        };
        if(is_paperless) toAdd["is_paperless"] = is_paperless;
        if(for_work) toAdd["for_work"] = for_work;
        if(add_to_stay) toAdd["add_to_stay"] = add_to_stay;
        if(special_req) toAdd["special_req"] = special_req;
        if(children_beds) toAdd["children_beds"] = children_beds;

        const newBooking = new bookingModel(toAdd);

        await newBooking.save();

        res.status(201).send({
            status: "success",
            message: "Booking created successfully",
            data: newBooking
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Error",
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}