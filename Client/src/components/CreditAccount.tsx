import React from 'react'
import { Button } from './ui/button'

function CreditAccount() {
  return (
    <div className='p-2 bg-white rounded-lg '>
      <div className=''>
        <div className='flex p-4 gap-16'>
            <p className='text-sm'>No Credits or vouchers yet</p>
            <p>0</p>
        </div>
        <div>
        <Button variant="ghost" className='text-blue-600 hover:bg-accent hover:text-blue-600'>More details</Button>
        </div>
      </div>
    </div>
  )
}

export default CreditAccount
