import React from 'react'
import { Button } from './ui/button'
import RewardCard from './RewardCard'
import MainCarousel from './MainCarousel'

function GeniusRewardAccount() {

    
        
    
  return (
    <div>
      <div className='border rounded-lg p- flex flex-col bg-white'>
        <div className=''>
            <h1 className='font-bold'>You have 2 Genius rewards</h1>
            <span className='text-sm text-gray-500'>Enjoy rewards and discounts on select stays and rental cars worldwide.</span>
        </div>
        <div className=''>
          <MainCarousel>
            <RewardCard />
          </MainCarousel>
        </div>
        <div className=''><Button variant="ghost" className='text-blue-600 hover:bg-accent hover:text-blue-600'>Learn more about your rewards</Button></div>
      </div>
    </div>
  )
}

export default GeniusRewardAccount
