import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { CardDescription, CardTitle } from './ui/card'
import { IProperty } from '@/types/propertyTypes'
import { Progress } from './ui/progress'
import { Plus } from './ui/Icons'
import { IReview } from '@/types/reviewTypes'


interface GuestReviewsProps {
  propertyData?: IProperty
  propertyReviews? : IReview[]

}

function GuestReviews({ propertyData,propertyReviews }: GuestReviewsProps) {
  return (
    <div className=' grid gap-5 p-2'>
      <div className='flex'>
        <div className=' w-[1100px]'>
          <p className='text-xl font-bold'>Guest Reviews</p>
        </div>
        <div className=''>
          <Button className='text-xs'>See availability</Button>
        </div>
      </div>
      <div className='flex gap-2 p-1'>
        <div>
          <Badge variant="rating" className='cursor-pointer h-full'>{Math.round(propertyData?.total_rating ?? 0)}</Badge>
        </div>
        <div className='flex items-center gap-3'>
          <CardTitle>{propertyData?.title}</CardTitle>
          <CardDescription className='text-sm text-gray-500 font-bold'>{propertyData?.reviews_num} reviews</CardDescription>
          <div className='mt-0.5'><p className='text-blue-600 text-xs'>Read all reviews</p></div>
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <p className='font-bold'>Categories:</p>
        <div className='flex justify-between max-w-[1100px] flex-wrap'>
        <div className='w-[350px]'>
        {propertyData?.rating.cleanliness &&<div > 
          <h1>Cleanliness</h1>
          <p>{propertyData?.rating.cleanliness}</p>
          <Progress value={propertyData?.rating.cleanliness * 10} className=" h-[8px] "></Progress>
          </div>
        }
        {propertyData?.rating.conform &&<div > 
          <h1>Conform</h1>
          <p>{propertyData?.rating.conform}</p>
          <Progress value={propertyData?.rating.conform * 10} className=" h-[8px]"></Progress>
          </div>
        }
        {propertyData?.rating.facilities &&<div > 
          <h1>facilities</h1>
          <p>{propertyData?.rating.facilities}</p>
          <Progress value={propertyData?.rating.facilities * 10} className=" h-[8px]"></Progress>
          </div>
        }
        </div>
        <div className='w-[350px] '>
        {propertyData?.rating.free_wifi &&<div > 
          <h1>free_wifi</h1>
          <p>{propertyData?.rating.free_wifi}</p>
          <Progress value={propertyData?.rating.free_wifi * 10} className=" h-[8px]"></Progress>
          </div>
        }
        {propertyData?.rating.cleanliness &&<div > 
          <h1>location</h1>
          <p>{propertyData?.rating.location}</p>
          <Progress value={propertyData?.rating.location * 10} className=" h-[8px]"></Progress>
          </div>
        }
        
        </div>
        <div className='w-[350px] '>
        {propertyData?.rating.staff &&<div > 
          <h1>staff</h1>
          <p>{propertyData?.rating.staff}</p>
          <Progress value={propertyData?.rating.staff * 10} className=" h-[8px]"></Progress>
          </div>
        }
        {propertyData?.rating.value_for_money &&<div > 
          <h1>value_for_money</h1>
          <p>{propertyData?.rating.value_for_money}</p>
          <Progress value={propertyData?.rating.value_for_money * 10} className=" h-[8px]"></Progress>
          </div>
        }
        </div>
      </div>
      </div>
      <div className='flex flex-col gap-5'>
        <h1 className='font-bold'>Select topics to read reviews:</h1>
        <div className='flex gap-3'>
          <Button variant="outline" className='rounded-full flex items-center justify-center gap-2'><Plus />Location</Button>
          <Button variant="outline" className='rounded-full flex items-center justify-center gap-2'><Plus />Room</Button>
          <Button variant="outline" className='rounded-full flex items-center justify-center gap-2'><Plus />Clean</Button>
          <Button variant="outline" className='rounded-full flex items-center justify-center gap-2'><Plus />Bed</Button>
          <Button variant="outline" className='rounded-full flex items-center justify-center gap-2'><Plus />Bathroom</Button>
        </div>
      </div>
      
    </div>
  )
}

export default GuestReviews
