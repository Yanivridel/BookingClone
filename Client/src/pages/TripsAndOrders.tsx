import BookingAndTrips from '@/components/BookingAndTrips'
import Cancelled from '@/components/Cancelled'
import RevisitYourFavorite from '@/components/RevisitYourFavorite'
import { Button } from '@/components/ui/button'
import { RootState } from '@/store'
import { TBookingOrders } from '@/types/bookingTypes'
import { IUser } from '@/types/userTypes'
import { getBooksAndTrips } from '@/utils/api/userApi'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const TripsAndOrders = () => {
  const [activeComponent, setActiveComponent] = useState("past");
  const currentUser = useSelector((state: RootState) => state.currentUser) as unknown as IUser;
  const [bookings, setBookings] = useState<TBookingOrders | null>(null);

  console.log("bookings", bookings);

  useEffect(() => {
    getBooksAndTrips()
    .then(data => setBookings(data));

  }, [currentUser]);


  return (
    <div className='max-w-[1100px] p-6 mx-auto flex flex-col gap-10'>
      <div className=''>
        <BookingAndTrips bookings={bookings}/>
      </div>
      <div>
        <Button onClick={() => setActiveComponent("past")} variant="ghostNav" className='rounded-full'>Past</Button>
        <Button onClick={() => setActiveComponent("cancelled")} variant="ghostNav" className='rounded-full'>Cancelled</Button>
      </div>
      <div className=''>
        {activeComponent === "past" && <RevisitYourFavorite completed={bookings?.completed}/>}
        {activeComponent === "cancelled" && <Cancelled cancelled={bookings?.cancelled}/>} 
      </div>
    </div>
  )
}

export default TripsAndOrders
