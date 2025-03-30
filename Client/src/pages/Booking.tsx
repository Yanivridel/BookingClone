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
  const [step, setStep] = useState<2 | 3>(2);

  return (
    <div className="px-4">
      <BookingSteps />
      <div className="flex flex-col tab:flex-row tab:gap-6 ">
        <BookingAside bookingInfo={bookingInfo} />
        {step === 2 && <BookingStepTwo bookingInfo={bookingInfo} />}
        {step === 3 && <BookingStepThree />}
      </div>
    </div>
  );
}

export default Booking;
