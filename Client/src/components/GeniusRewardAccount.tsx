import React from 'react'
import { Button } from './ui/button'
import RewardCard from './RewardCard'

function GeniusRewardAccount() {

    
        
    
  return (
    <div>
      <div className='border rounded-lg p-5 flex flex-col gap-8'>
        <div className=''>
            <h1 className='font-bold'>You have 2 Genius rewards</h1>
            <span className='text-sm text-gray-500'>Enjoy rewards and discounts on select stays and rental cars worldwide.</span>
        </div>
        <div className=''>
            <RewardCard />
        </div>
        <div className=''><Button variant="ghost" className='text-blue-600 hover:bg-accent hover:text-blue-600'>Learn more about your rewards</Button></div>
      </div>
    </div>
  )
}

export default GeniusRewardAccount
