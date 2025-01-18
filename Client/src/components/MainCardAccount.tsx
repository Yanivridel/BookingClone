import React from 'react'
import { ArrowRight, Coins } from './ui/Icons'
import { Button } from './ui/button'

interface MainCardAccountProps {
    item: 
        {
            title: string,
            list: [
                    {
                      icon : string,
                      title: string,
                      link: string,
                    },
                    
                  ]  
        }
    
}

function MainCardAccount({item} : MainCardAccountProps) {
  return (
    <div className='bg-white p-2 flex flex-col gap-3 rounded-lg border'>
      <h1 className='font-bold text-lg'>{item.title}</h1>
      {item.list.map(listItem => 
        <Button variant="ghost" className='flex justify-start gap-3'>
        <div className='w-5 h-5 mt-1'><listItem.icon /></div>
        <p>{listItem.title}</p>
        <div><ArrowRight className='w-5 h-5 mt-1'/></div>
      </Button>
      )}
      
    </div>
  )
}
export default MainCardAccount
