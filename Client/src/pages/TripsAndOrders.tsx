import BookingAndTrips from '@/components/BookingAndTrips'
import Cancelled from '@/components/Cancelled'
import RevisitYourFavorite from '@/components/RevisitYourFavorite'
import React, { useState } from 'react'

const TripsAndOrders = () => {

  // const [isDisplayOne,setIsDisplayOne] = useState(false)
  // const [isDisplayOneTwo,setIsDisplayTwo] = useState(false)

  // const handleClickOne = () => {
  //   setIsDisplayOne(prev => !prev)
  //   setIsDisplayTwo(prev => !prev)
  // }
  // const handleClickTwo = () => {
  //   setIsDisplayTwo(prev => !prev)
  //   setIsDisplayOne(prev => !prev)

  // }


  const [activeComponent, setActiveComponent] = useState(null);


  const handleClickOne = () => {
    setActiveComponent("revisit"); // הצג את RevisitYourFavorite
  }

  const handleClickTwo = () => {
    setActiveComponent("cancelled"); // הצג את Cancelled
  }

  return (
    <div className='max-w-[1100px] p-6 mx-auto flex flex-col gap-10'>
      <div className=''>
        <BookingAndTrips handleClickOne={handleClickOne} handleClickTwo={handleClickTwo}/>
      </div>
      <div className=''>
        {activeComponent === "revisit" && <RevisitYourFavorite />}
        {activeComponent === "cancelled" && <Cancelled />} 
      </div>
    </div>
  )
}

export default TripsAndOrders
