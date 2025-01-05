import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from './ui/badge'
import KidsImage from '../assets/images/kids.jpeg'

function OffersCard() {
  return (
    <div>
      <Card className='p-3 flex gap-2 w-full sm:w-[520px] mx-auto' >
        <div className=' w-full sm:w-[70%] grid'>
            <CardTitle className='text-xl font-bold	'>Go for a good time, not a long time</CardTitle>
            <CardDescription>Finish your year with a mini break. Save 15% or more when you book and stay by 7 January 2025. </CardDescription>
            <Badge className='w-[60%] text-sm flex items-center'>Find Late Escape Deals</Badge>
        </div>
        <div className=' w-full sm:w-[30%]'>
            <img src={KidsImage} alt="" className='rounded-lg	' />
        </div>
      </Card>
    </div>
  )
}

export default OffersCard
