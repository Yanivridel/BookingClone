import BookingSteps from "@/components/booking/BookingSteps";
import UserCard from "@/components/booking/UserCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index.ts";
import { IUser } from "@/types/userTypes.ts";
import BookingDetails from "@/components/booking/BookingDetails";

function Booking() {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as IUser;

  return (
    <div className="">
      <BookingSteps />
      <UserCard />
      <BookingDetails />
    </div>
  );
}

export default Booking;
