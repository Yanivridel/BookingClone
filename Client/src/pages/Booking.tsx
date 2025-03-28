// types
import { type BookingInfo } from "@/types/bookingTypes";

// booking data
import { useLocation } from "react-router-dom";

// components
import BookingSteps from "@/components/booking/BookingSteps";
import BookingAside from "@/components/booking/BookingAside";
import BookingStepTwo from "@/components/booking/BookingStepTwo";
import BookingStepThree from "@/components/booking/BookingStepThree";

function Booking() {
  const location = useLocation();
  const bookingInfo = location.state as BookingInfo;

  return (
    <div className="px-4">
      <BookingSteps />
      <BookingAside />
      <BookingStepTwo bookingInfo={bookingInfo} />
      <BookingStepThree />
    </div>
  );
}

export default Booking;
