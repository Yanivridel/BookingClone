import { Dispatch, SetStateAction } from "react";
import RoomsByOffer from "./RoomsByOffer";
import { BookingInfo, RoomsLeaders } from "@/types/bookingTypes.ts";
interface BookingRoomsProps {
  bookingInfo: BookingInfo;
  roomsLeaders: RoomsLeaders;
  setRoomsLeaders: Dispatch<SetStateAction<RoomsLeaders>>;
}

function BookingRooms({
  setRoomsLeaders,
  bookingInfo,
  roomsLeaders,
}: BookingRoomsProps) {
  const offersRoomSelected = bookingInfo?.offersRoomSelected || "";
  // ? check if no bugs from booking info (coming from PropertyTable throw Booking page )
  if (!offersRoomSelected) {
    console.error("no bookingInfo.offersRoomSelected in BookingRoom component");
    return;
  }

  const propertyData = bookingInfo?.propertyData;
  if (!propertyData) {
    console.error("no  bookingInfo.propertyData in BookingRoom component");
    return;
  }
  if (typeof propertyData.rooms === "string") {
    console.error(
      "no  bookingInfo.propertyData.rooms is a string (the populate in the DB has bug probably)"
    );
    return;
  }

  const allRooms = propertyData.rooms;

  return (
    <div>
      {offersRoomSelected.map((selectedRoomByOffer) => {
        // to find the room details (no need for offer specifically because all the data in the room) -
        // but if there are some offers for the same room current room will be the same
        const currentRoom = allRooms.find(
          (room) => selectedRoomByOffer.roomId === room._id
        );
        if (currentRoom) {
          return (
            <div key={selectedRoomByOffer.offerId}>
              <RoomsByOffer
                roomsLeaders={roomsLeaders}
                setRoomsLeaders={setRoomsLeaders}
                selectedRoomByOffer={selectedRoomByOffer}
                roomDetails={currentRoom}
              />
            </div>
          );
        }
        return <div></div>;
      })}
    </div>
  );
}

export default BookingRooms;
