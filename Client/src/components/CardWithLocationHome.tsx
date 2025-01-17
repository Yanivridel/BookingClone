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
    <div className='flex h-[400px] min-w-[300px] flex-col gap-2 cursor-pointer'>
      <img src={image} className='w-full h-2/3 object-cover object-center rounded-t-lg' alt="" />
      <div className='p-2'>
          <h1 className='font-bold'>{title}</h1>
          <span className='text-sm text-gray-500'>{description}</span>
      </div>
    </div>
  )
}

export default CardWithLocationHome
