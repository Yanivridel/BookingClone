import BookingRoom from "./BookingRoom";
import { BookingInfo } from "@/types/bookingTypes.ts";
interface BookingRoomsProps {
  bookingInfo: BookingInfo;
}

function BookingRooms({ bookingInfo }: BookingRoomsProps) {
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
      {offersRoomSelected.map((selectedRoom) => {
        const currentRoom = allRooms.find(
          (room) => selectedRoom.roomId === room._id
        );

        if (currentRoom) {
          return (
            <div key={currentRoom?._id}>
              <BookingRoom
                selectedRoom={selectedRoom}
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
