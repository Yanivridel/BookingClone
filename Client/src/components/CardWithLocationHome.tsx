import React from 'react'
import { Card } from './ui/card'
import KidsImage from '../assets/images/kids.jpeg'

interface CardWithLocationHomeProps {
    title : string,
    image: string,
    description : string,
}


function CardWithLocationHome({title,image,description} : CardWithLocationHomeProps) {
  return (
    <div className='flex'>
      <div className='flex flex-col gap-2 '>
        <img src={KidsImage} className='h-[150px] rounded-lg' alt="" />
        <div className=''>
            <h1 className='font-bold'>{title}</h1>
            <span className='text-sm text-gray-500'>{description}</span>
        </div>
      </div>
    </div>
  )
}

export default CardWithLocationHome
