// types
import { type BookingInfo } from "@/types/bookingTypes";

// booking data
import { useLocation } from "react-router-dom";

// components
import BookingSteps from "@/components/booking/BookingSteps";
import BookingAside from "@/components/booking/BookingAside";
import BookingStepTwo from "@/components/booking/BookingStepTwo";
import BookingStepThree from "@/components/booking/BookingStepThree";
import { useState } from "react";

function Booking() {
  const location = useLocation();
  const bookingInfo = location.state as BookingInfo;
  const [bookingStep, setBookingStep] = useState(3);

  return (
    <div className="px-4 max-w-[1100px] mx-auto">
      <BookingSteps step={bookingStep} />
      <div className="flex flex-row justify-between">
        <BookingAside />
        { bookingStep === 2 && <BookingStepTwo bookingInfo={bookingInfo} /> }
        { bookingStep === 3 && <BookingStepThree bookingInfo={bookingInfo}/> }
      </div>
      
      
    </div>
  );
}

export default Booking;
