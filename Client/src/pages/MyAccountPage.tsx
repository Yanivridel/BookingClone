import BookingAwayCardAccount from '@/components/BookingAwayCardAccount'
import CardWithLocationHome from '@/components/CardWithLocationHome'
import CompleteProfile from '@/components/CompleteProfile'
import CreditAccount from '@/components/CreditAccount'
import GeniusRewardAccount from '@/components/GeniusRewardAccount'
import React from 'react'

function MyAccountPage() {
  return (
    <div className='max-w-[1100px]'>
      <div>
        <GeniusRewardAccount />
        <BookingAwayCardAccount />
        <CreditAccount />
      </div>
      <CompleteProfile />
    </div>
  )
}

export default MyAccountPage
