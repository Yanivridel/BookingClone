interface BookingRoomsProps {
  roomName: string;
}

function BookingRooms({ roomName }: BookingRoomsProps) {
  return (
    <div>
      <h2 className="font-bold text-xl">{roomName}</h2>
    </div>
  );
}

export default BookingRooms;
