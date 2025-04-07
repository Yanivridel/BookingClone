import { TBookingOrders } from "@/types/bookingTypes"
import BookingCard from "./booking/BookingCard";
import MainCarousel from "./MainCarousel";

interface RevisitYourFavoriteProps {
  completed: TBookingOrders["completed"];
}

const RevisitYourFavorite = ({ completed }: RevisitYourFavoriteProps) => {
  return (
    <div>
      <div className='flex gap-10 items-center flex-col'>
        <div className="flex items-center gap-10">
          <img 
            src="https://t-cf.bstatic.com/design-assets/assets/v3.142.0/illustrations-traveller/TripsEmptyScreenComplete@2x.png" 
            className='w-24 h-24 sm:w-44 sm:h-44' alt="" />
          <div className='flex flex-col gap-3'>
            <h3 className='text-xl font-semibold'>Revisit your favorite places</h3>
            <p className='text-gray-500 text-sm'>Here you will see all your past trips and get inspired for your next ones.</p>
          </div>
        </div>
        <MainCarousel>
            {completed?.map((data) => <BookingCard order={data} status={"completed"}/>)}
        </MainCarousel>
      </div>
    </div>
  )
}

export default RevisitYourFavorite
