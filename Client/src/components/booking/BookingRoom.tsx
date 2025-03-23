import { IRoom } from "@/types/roomTypes";

interface BookingRoomProps {
  roomDetails: IRoom;
}

function BookingRoom({ roomDetails }: BookingRoomProps) {
  console.log(roomDetails);

  const offers = roomDetails?.offers || [];

  if (!offers || offers.length < 0) {
    console.error("no offers in ");
  }
  return (
    <div>
      {offers.map((offer) => (
        <div>
          <h1 className="font-bold text-xl">{roomDetails.title}</h1>
          <div className="text" key={offer._id}>
            {offer.cancellation}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingRoom;
