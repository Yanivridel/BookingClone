import { Button } from '@/components/ui/button'
import { Plus } from '@/components/ui/Icons'
import React from 'react'

function OtherTravellers() {
  return (
    <div className='max-w-[1100px] p-6'>
        <div className='flex flex-col gap-2'>
            <p className='text-4xl font-bold'>Other travellers</p>
            <p className='text-gray-500 text-base'>Add or edit information about the people you’re travelling with.</p>
        </div>
        <div className='flex justify-end '>
            <Button><Plus className='fill-white'/> Add new traveller</Button>
        </div>
      
    </div>
  )
}

export default OtherTravellers
