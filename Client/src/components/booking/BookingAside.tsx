// components
import BookingPropertyDetails from "./BookingPropertyDetails";
import BookingPriceSummary from "./BookingPriceSummary";
import BookingDates from "./BookingDates";

// types
import { type BookingInfo } from "@/types/bookingTypes";

type BookingAsideProps = {
  bookingInfo: BookingInfo;
};

function BookingAside({ bookingInfo }: BookingAsideProps) {
  return (
    <aside>
      <BookingPropertyDetails bookingInfo={bookingInfo} />
      <BookingDates bookingInfo={bookingInfo} />
      <BookingPriceSummary bookingInfo={bookingInfo} />
    </aside>
  );
}

export default BookingAside;
