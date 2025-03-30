import { useState } from "react";
import BookingWhenToPay from "./BookingWhenToPay";
import { BookingInfo } from "@/types/bookingTypes";

interface BookingStepThreeProps {
  bookingInfo: BookingInfo;
}

function BookingStepThree( { bookingInfo }: BookingStepThreeProps) {
  const [paymentOption, setPaymentOption] = useState("later");
  const [ paymentDate, setPaymentDate ] = useState((() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  })());


  console.log("bookingInfo", bookingInfo);
  return (
    <div className="w-2/3">
      <BookingWhenToPay 
      paymentOption={paymentOption}
      setPaymentOption={setPaymentOption}
      paymentDate={paymentDate}
      setPaymentDate={setPaymentDate}
      />
    </div>
  )
}

export default BookingStepThree;
