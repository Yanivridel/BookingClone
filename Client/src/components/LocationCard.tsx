import React, { useState } from 'react'
import { Card } from './ui/card'
import { Tower, Xicon, XregularIcon } from './ui/Icons'
import { IProperty } from '@/types/propertyTypes'
import { Button } from './ui/button'

interface LocationCardProps{
      propertyData?: IProperty
    
}

function LocationCard({propertyData}:LocationCardProps) {
        const [isDisplay, setIsDisplay] = useState(true)

        function handleClick() {
            setIsDisplay(false)
        }
        console.log(isDisplay);
        
  return (

    <div>
        {isDisplay && (
      <div className='flex border p-3'>
        <div className=' w-[10%] flex justify-center'><Tower className='w-5 h-5 mt-1.5'/></div>
        <div className=' w-[80%]'>
            <h1 className='font-bold'>Located in {propertyData?.location.country} {propertyData?.location.city}</h1>
            <span className='text-xs'>{propertyData?.location.addressLine}</span>
        </div>
        <div className=' w-[10%]'>
            <Button onClick={handleClick} variant="outline"><XregularIcon className='w-5 h-5 mt-1.5'/></Button>
        </div>
      </div>
)}
    </div>
    

  )
}

export default LocationCard
