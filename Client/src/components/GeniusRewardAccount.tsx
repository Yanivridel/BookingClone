import React from 'react'
import { Button } from './ui/button'
import RewardCard from './RewardCard'
import MainCarousel from './MainCarousel'
import { useTranslation } from 'react-i18next'

function GeniusRewardAccount() {
const {t} = useTranslation()
    
  return (
    <div>
      <div className='border rounded-lg p-2 flex flex-col bg-white'>
        <div className='p-2'>
            <h1 className='font-bold'>{t("MyAccount.GeniusRewards")}</h1>
            <span className='text-sm text-gray-500'>{t("MyAccount.DiscountsTitle")}</span>
        </div>
        <div className='p-2'>
          <MainCarousel>
            <RewardCard />
          </MainCarousel>
        </div>
        <div className=''><Button variant="ghost" className='text-blue-600 hover:bg-accent hover:text-blue-600'>{t("MyAccount.LearnMore")}</Button></div>
      </div>
    </div>
  )
}

export default GeniusRewardAccount
