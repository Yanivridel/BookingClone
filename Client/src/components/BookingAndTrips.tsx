import { Button } from './ui/button'
import { TBookingOrders } from '@/types/bookingTypes'
import BookingCard from './booking/BookingCard';
import MainCarousel from './MainCarousel';

interface BookingAndTripsProps {
  bookings: TBookingOrders | null;
}
const BookingAndTrips = ({ bookings }: BookingAndTripsProps) => {
  return (
    <div className='flex flex-col gap-10'>
      <div className='flex justify-between '>
        <h1 className='font-bold text-xl sm:text-3xl'>Bookings & Trips</h1>
        <Button variant="ghostNav" className='cursor-pointer border-none text-xs sm:text-base text-blue-700'>Can't find a booking?</Button>
      </div>
      <div className='flex gap-10 items-center flex-col sm:flex-row'>
        <div>
          <img src="https://t-cf.bstatic.com/design-assets/assets/v3.142.0/illustrations-traveller/TripsGlobe@2x.png" className='w-44 h-44' alt="" />
        </div>
          { !bookings?.confirmed ?
          <div className='flex flex-col gap-3'>
            <h3 className='text-xl font-semibold'>Where to next?</h3>
            <p className='text-gray-500 text-sm'>You haven’t started any trips yet. When you’ve made a booking, it will appear here.</p>
          </div>
          :
          <MainCarousel>
            {bookings?.confirmed?.map((data) => <BookingCard order={data} status={"confirmed"}/>)}
          </MainCarousel>
          }
      </div>
    </div>
  )
}

export default BookingAndTrips
