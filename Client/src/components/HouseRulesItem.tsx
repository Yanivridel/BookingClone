import React from 'react'
import { Card } from './ui/card'

interface HouseRulesItemProps{
    rule : string,
    title : string,
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

function HouseRulesItem({rule, Icon, title} : HouseRulesItemProps) {
  return (

       <Card className='p-3'>
            <div className='flex border-b-2 p-5'>
                <Icon />
                <div className='border w-[40%] font-bold text-lg'>{title}</div>
                <div className='border  w-[60%]'>{rule}</div>
            </div>
        </Card>
   
  )
}

export default HouseRulesItem
