import BookingAndTrips from '@/components/BookingAndTrips'
import Cancelled from '@/components/Cancelled'
import RevisitYourFavorite from '@/components/RevisitYourFavorite'
import { useState } from 'react'

const TripsAndOrders = () => {
  const [activeComponent, setActiveComponent] = useState("past");

  const handleClickOne = () => {
    setActiveComponent("past");
  }

  const handleClickTwo = () => {
    setActiveComponent("cancelled");
  }

  return (
    <div className='max-w-[1100px] p-6 mx-auto flex flex-col gap-10'>
      <div className=''>
        <BookingAndTrips handleClickOne={handleClickOne} handleClickTwo={handleClickTwo}/>
      </div>
      <div className=''>
        {activeComponent === "past" && <RevisitYourFavorite />}
        {activeComponent === "cancelled" && <Cancelled />} 
      </div>
    </div>
  )
}

export default TripsAndOrders
