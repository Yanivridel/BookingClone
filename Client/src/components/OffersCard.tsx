import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from './ui/badge'

interface OffersCardProps {
  title: string;
  desc: string;
  button: string;
  img: string
}

function OffersCard({ title, desc, button, img}: OffersCardProps) {
  return (
    <div>
      <Card className='p-3 flex gap-2 w-full sm:w-[520px] mx-auto' >
        <div className=' w-full sm:w-[70%] grid'>
            <CardTitle className='text-xl font-bold	'>{title}</CardTitle>
            <CardDescription>{desc}</CardDescription>
            <Badge className='w-[60%] text-sm flex items-center'>{button}</Badge>
        </div>
        <div className='w-fit sm:w-[30%]'>
            <img src={img} alt={button} className='rounded-lg	' />
        </div>
      </Card>
    </div>
  )
}

export default OffersCard
