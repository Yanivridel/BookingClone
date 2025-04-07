import { TBookingOrders } from '@/types/bookingTypes';
import BookingCard from './booking/BookingCard';
import MainCarousel from './MainCarousel';

interface CancelledProps {
  cancelled: TBookingOrders["cancelled"];
}

const Cancelled = ({ cancelled }: CancelledProps) => {
  return (
    <div>
      {!cancelled ?
      <div>
        No cancelled orders exists
      </div>
      :
      <MainCarousel>
            {cancelled?.map((data) => <BookingCard order={data} status={"cancelled"}/>)}
      </MainCarousel>
      }
    </div>
  )
}

export default Cancelled
