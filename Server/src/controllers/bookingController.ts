import { Request, Response } from "express";
import { Types } from "mongoose";
import { bookingModel } from "../models/bookingModel";
import { roomModel } from "../models/roomModel";
import { TBookingStringified } from "../types/bookingTypes";
import { AuthenticatedRequest } from "../types/expressTypes";
import { clearAll } from "utils/redisClient";

export const createBooking = async (
  req: Request<{}, {}, TBookingStringified>,
  res: Response
): Promise<void> => {
  try {
    const {
      propertyId,
      rooms,
      reserver,
      is_paperless,
      for_work,
      rooms_details,
      add_to_stay,
      special_req,
      children_beds,
      guests,
      checkIn,
      checkOut,
    } = req.body;
    const authenticatedReq = req as AuthenticatedRequest;
    const { userId } = authenticatedReq;

    if (
      !propertyId ||
      !rooms ||
      !reserver ||
      !rooms_details ||
      !checkIn ||
      !checkOut ||
      !guests
    ) {
      res
        .status(400)
        .json({ status: "Error", message: "Missing required parameters" });
      return;
    }

    // Delete existing other "on going" booking for the same user
    const existingBooking = (await bookingModel.findOneAndDelete({
      userId,
      status: "on going",
    })) as TBookingStringified;
    if (existingBooking) {
      const {
        rooms: existingRooms,
        checkIn: existingCheckIn,
        checkOut: existingCheckOut,
      } = existingBooking;
      await unTakeAvailableRooms({
        rooms: existingRooms,
        checkIn: existingCheckIn,
        checkOut: existingCheckOut,
      } as IAvailableRoomsProps);
      console.log(`Deleted existing booking: ${existingBooking._id}`);
    }

    await takeAvailableRooms({
      rooms,
      checkIn,
      checkOut,
    } as IAvailableRoomsProps);

    const fieldsToAdd: any = {
      userId,
      propertyId,
      rooms,
      reserver,
      rooms_details,
      guests,
      checkIn,
      checkOut,
      status: "on going",
    };
    if (is_paperless) fieldsToAdd["is_paperless"] = is_paperless;
    if (for_work) fieldsToAdd["for_work"] = for_work;
    if (add_to_stay) fieldsToAdd["add_to_stay"] = add_to_stay;
    if (special_req) fieldsToAdd["special_req"] = special_req;
    if (children_beds) fieldsToAdd["children_beds"] = children_beds;

    const newBooking = new bookingModel(fieldsToAdd);

    await newBooking.save();

    if (process.env.USE_CACHE !== "false")
      clearAll();

    res.status(201).send({
      status: "success",
      message: "Booking created successfully",
      data: newBooking,
    });
  } catch (error) {
    console.error(error);
    if (error && typeof error === "object" && "status" in error) {
      res.status(Number(error.status)).json(error);
      return;
    }
    res.status(500).json({
      status: "Error",
      message: "An unexpected error occurred",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const authenticatedReq = req as AuthenticatedRequest;
    const { userId } = authenticatedReq;

    const orders = await bookingModel.find({ userId })
    .sort({ createdAt: 1 })
    .populate({
      path: 'propertyId',
      select: 'title images'
    });

    const groupedOrders = orders.reduce((acc: any, order) => {
      if (!acc[order.status]) {
        acc[order.status] = [];
      }
      acc[order.status].push(order);
      return acc;
    }, {});

    res.status(200).json(groupedOrders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// * Done
export const takeUnTakeRooms = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { checkIn, checkOut, rooms, action } = req.body;

  if (
    !checkIn ||
    !checkOut ||
    !rooms ||
    !action ||
    !["take", "untake"].includes(action)
  ) {
    res
      .status(400)
      .json({ status: "Error", message: "Missing required parameters" });
    return;
  }

  try {
    if (new Date(checkIn) > new Date(checkOut))
      throw new Error("Checkin cannot be greater than checkout");

    if (action === "take")
      await takeAvailableRooms({
        rooms,
        checkIn,
        checkOut,
      } as IAvailableRoomsProps);
    else
      await unTakeAvailableRooms({
        rooms,
        checkIn,
        checkOut,
      } as IAvailableRoomsProps);

    if (process.env.USE_CACHE !== "false")
      clearAll();

    res.status(200).send("Success");
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "Error",
      message: (err as Error).message,
    });
  }
};

// Help Functions
export interface IAvailableRoomsProps {
  rooms: {
    roomId: string; // objectId
    count: number;
  }[];
  checkIn: Date;
  checkOut: Date;
}
export const takeAvailableRooms = async ({
  rooms,
  checkIn,
  checkOut,
}: IAvailableRoomsProps) => {
  const daysToBook = getDatesToBook(checkIn, checkOut);

  // Fetch all rooms at once
  const roomIds = rooms.map(({ roomId }) => new Types.ObjectId(roomId));
  const allRooms = await roomModel.find({ _id: { $in: roomIds } });

  // Map to hold updated room data
  const updatedRooms: Map<string, any> = new Map();

  for (const { roomId, count } of rooms) {
    const room = allRooms.find((r) => r._id.equals(roomId));
    if (!room)
      throw {
        status: 404,
        message: `Room with ID ${roomId} not found`,
        roomId,
      };
    for (const day of daysToBook) {
      const availability = room.available.find(
        (entry) => new Date(entry.date).toDateString() === day.toDateString()
      );

      if (availability) {
        if (availability.count < count) {
          throw {
            status: 400,
            message: `Not enough availability for room ${roomId} on ${day.toDateString()}`,
            roomId,
            notAvailableDate: day.toDateString(),
          };
        }
        availability.count -= count;
      } else {
        if (room.overall_count < count) {
          throw {
            status: 400,
            message: `Not enough overall availability for room ${roomId} on ${day.toDateString()}`,
            roomId,
            notAvailableDate: day.toDateString(),
          };
        }
        room.available.push({ date: day, count: room.overall_count - count });
      }
    }

    // Store updated room in the map
    updatedRooms.set(roomId, room);
  }

  // Save all updated rooms to the database
  for (const room of updatedRooms.values()) {
    await room.save();
  }
};
export const unTakeAvailableRooms = async ({
  rooms,
  checkIn,
  checkOut,
}: IAvailableRoomsProps) => {
  const daysToBook = getDatesToBook(checkIn, checkOut);

  // Fetch all rooms at once
  const roomIds = rooms.map(({ roomId }) => new Types.ObjectId(roomId));
  const allRooms = await roomModel.find({ _id: { $in: roomIds } });

  // Map to hold updated room data
  const updatedRooms: Map<string, any> = new Map();

  for (const { roomId, count } of rooms) {
    const room = allRooms.find((r) => r._id.equals(roomId));
    if (!room)
      throw {
        status: 404,
        message: `Room with ID ${roomId} not found`,
        roomId,
      };

    for (const day of daysToBook) {
      const availabilityIndex = room.available.findIndex(
        (entry) => new Date(entry.date).toDateString() === day.toDateString()
      );

      if (availabilityIndex !== -1) {
        const availability = room.available[availabilityIndex];
        availability.count += count;

        if (availability.count >= room.overall_count) {
          room.available.splice(availabilityIndex, 1);
        }
      }
    }

    // Store updated room in the map
    updatedRooms.set(roomId, room);
  }

  // Save all updated rooms to the database
  for (const room of updatedRooms.values()) {
    await room.save();
  }
};
const getDatesToBook = (checkIn: Date, checkOut: Date) => {
  const daysToBook: Date[] = [];
  const currentDate = new Date(checkIn);
  const lastDate = new Date(checkOut);
  while (currentDate <= lastDate) {
    daysToBook.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return daysToBook;
};
