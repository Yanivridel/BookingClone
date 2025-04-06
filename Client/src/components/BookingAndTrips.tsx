import React from 'react'
import { Button } from './ui/button'

const BookingAndTrips = ({handleClickOne,handleClickTwo}) => {
  return (
    <div className='flex flex-col gap-10'>
      <div className='flex justify-between '>
        <h1 className='font-bold text-3xl'>Bookings & Trips</h1>
        <Button variant="ghostNav" className='cursor-pointer border-none text-blue-700'>Can't find a booking?</Button>
      </div>
      <div className='flex items-center '>
        <div>
          <img src="https://t-cf.bstatic.com/design-assets/assets/v3.142.0/illustrations-traveller/TripsGlobe@2x.png" className='w-44 h-44' alt="" />
        </div>
        <div className='flex flex-col gap-3'>
          <h3 className='text-xl font-semibold'>Where to next?</h3>
          <p className='text-gray-500 text-sm'>You haven’t started any trips yet. When you’ve made a booking, it will appear here.</p>
        </div>
      </div>
      <div>
        <div className=''>
          <Button onClick={handleClickOne} variant="ghostNav" className='rounded-full'>Past</Button>
          <Button onClick={handleClickTwo} variant="ghostNav" className='rounded-full'>Cancelled</Button>
        </div>
      </div>
    </div>
  )
}

export default BookingAndTrips
