// types
import { type BookingInfo } from "@/types/bookingTypes";

// booking data
import { useLocation } from "react-router-dom";

// components
import BookingSteps from "@/components/booking/BookingSteps";
import BookingAside from "@/components/booking/BookingAside";
import BookingStepTwo from "@/components/booking/BookingStepTwo";
import BookingStepThree from "@/components/booking/BookingStepThree";
import { useEffect, useState } from "react";
import { scrollToTopInstant } from "@/utils/functions";

function Booking() {
  const location = useLocation();
  const bookingInfo = location.state as BookingInfo;
  const [step, setStep] = useState<2 | 3>(2);

  useEffect(() => {
    document.title = 'Booking.com | האתר הרשמי | הזמנה';
    scrollToTopInstant();
  }, []);
  console.log("bookingInfo", bookingInfo);
  return (
    <div className="px-4 max-w-[1100px] mx-auto">
      <BookingSteps step={step} />
      <div className="flex flex-col tab:flex-row tab:gap-6 ">
        <BookingAside bookingInfo={bookingInfo} />
        {step === 2 && (
          <BookingStepTwo setStep={setStep} bookingInfo={bookingInfo} />
        )}
        {step === 3 && <BookingStepThree bookingInfo={bookingInfo} />}
      </div>
    </div>
  );
}

export default Booking;
