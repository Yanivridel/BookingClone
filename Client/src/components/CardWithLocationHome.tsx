import React from 'react'
import { Card } from './ui/card'
import KidsImage from '../assets/images/kids.jpeg'
import { cn } from '@/lib/utils'

interface CardWithLocationHomeProps {
    title : string,
    image: string,
    description?: string,
    className?: string,
    classNameImg?: string,
}

function CardWithLocationHome({title,image,description,className, classNameImg} : CardWithLocationHomeProps) {
  return (
    <div className={cn('flex h-[400px] flex-col gap-2 cursor-pointer', className)}>
      <img src={image} className={cn('w-full h-2/3 object-cover object-center rounded-t-lg', classNameImg)} alt="" />
      <div className='p-2'>
          <h1 className='font-bold text-2xl ms-auto w-fit'>{title}</h1>
          { description && <span className='text-sm text-gray-500 ms-auto w-fit'>{description}</span>}
      </div>
    </div>
  )
}

export default CardWithLocationHome
