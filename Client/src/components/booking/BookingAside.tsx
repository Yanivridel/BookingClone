// components
import BookingPriceSummary from "./BookingPriceSummary";
import BookingPropertyDetails from "./BookingPropertyDetails";

// types
import { type BookingInfo } from "@/types/bookingTypes";

type BookingAsideProps = {
  bookingInfo: BookingInfo;
};

function BookingAside({ bookingInfo }: BookingAsideProps) {
  return (
    <aside>
      <BookingPropertyDetails bookingInfo={bookingInfo} />
      <BookingPriceSummary bookingInfo={bookingInfo} />
    </aside>
  );
}

export default BookingAside;
