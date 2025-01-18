import React from 'react'
import { Card } from './ui/card'
import Reward1Level1 from '../assets/images/GeniusRewardGiftBoxDiscount1.png'
import Reward1Level2 from '../assets/images/GeniusCarBenefit2.png'
import Reward1Level3 from '../assets/images/GeniusRewardGiftBoxDiscount3.png'
import Reward1Level4 from '../assets/images/GeniusRewardFreeBreakfast4.png'
import Reward1Level5 from '../assets/images/GeniusRewardFreeBreakfast5.png'
import Reward1Level6 from '../assets/images/GeniusRewardFreeRoomUpgrade6.png'
import Reward1Level7 from '../assets/images/GeniusRewardPrioritySupport7.png'
import { Lock, Unlock } from './ui/Icons'


function RewardCard() {

    const rewardsLevelOne = [
        {
         img : Reward1Level1, 
         text: "10% off stays"
        },
        {
         img : Reward1Level2, 
         text: "10% off rental cars"
        },
        {
         img : Reward1Level3, 
         text: "10-15% off stays"
        },
        {
         img : Reward1Level4, 
         text: "Free breakfasts"
        },
        {
         img : Reward1Level5, 
         text: "Free room upgrades"
        },
        {
         img : Reward1Level6, 
         text: "Free room upgrades"
        },
        {
         img : Reward1Level1, 
         text: "10-20% off stays"
        },
        {
         img : Reward1Level7, 
         text: "Priority support on stays"
        },

    ]
  return (
    <div className=' flex gap-5'>
        <div className='flex border-t-[1px] py-5 gap-2 relative'>
        <span className='rounded-full flex items-center gap-2 bg-yellow-500 absolute top-[-15px] p-1 px-2'><Unlock className='w-3 h-3 '/><span className='text-xs'>Level 1</span></span>
        {rewardsLevelOne.slice(0, 2).map((item, index) => { // בחר שני אובייקטים ראשונים עם slice
                return (
                    <div key={index} className=' flex flex-col p-3 gap-5 border w-[130px] h-[120px] rounded-lg '>
                        <img src={item.img} className='w-10 h-10' alt="Reward" />
                        <p className='font-semibold text-sm'>{item.text}</p>
                    </div>
                );
            })}
        </div>
        <div className='flex border-t-[1px] py-5 gap-2 relative'>
        <span className='rounded-full flex items-center gap-2 border bg-white absolute top-[-15px] p-1 px-2'><Lock className='w-3 h-3 '/><span className='text-xs'>Level 2</span></span>
        {rewardsLevelOne.slice(2, 5).map((item, index) => { // בחר שני אובייקטים ראשונים עם slice
                return (
                    <div key={index} className=' flex flex-col p-2 gap-5 border w-[130px] h-[120px] rounded-lg grayscale bg-gray-200 '>
                        <img src={item.img} className='w-10 h-10' alt="Reward" />
                        <p className='font-semibold  text-sm'>{item.text}</p>
                    </div>
                );
            })}
        </div>
        <div className='flex border-t-[1px] py-5 gap-2 relative'>
        <span className='rounded-full flex items-center gap-2 border bg-white absolute top-[-15px] p-1 px-2'><Unlock className='w-3 h-3 '/><span className='text-xs'>Level 3</span></span>
        {rewardsLevelOne.slice(5, 7).map((item, index) => { // בחר שני אובייקטים ראשונים עם slice
                return (
                    <div key={index} className=' flex flex-col p-2 gap-5 border w-[130px] h-[120px] rounded-lg grayscale bg-gray-200'>
                        <img src={item.img} className='w-10 h-10' alt="Reward" />
                        <p className='font-semibold  text-sm'>{item.text}</p>
                    </div>
                );
            })}
        </div>
    </div>
  )
}

export default RewardCard
