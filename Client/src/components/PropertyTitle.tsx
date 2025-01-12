import React from 'react'
import Genius from '../assets/images/Genius.png'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Copy, Discount, FacebookWhiteIcon, Heart, IconFacebook, Location, Share, Stars, Xicon } from './ui/Icons'
import { Button } from './ui/button';
import { Badge } from 'lucide-react';
import { IProperty } from '@/types/propertyTypes';
import SaveButton from './SaveButton';
import { Popover, PopoverContent } from './ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';

interface propertyTitleProps {
    propertyData? : IProperty;
    id? : string
}


function PropertyTitle({propertyData, id} : propertyTitleProps) {
    const rating = 4;

    if(!propertyData){
        return (
            <div></div>
        )
    }
    return (
        <div className=' p-3 flex' id={id || ""}>
            <div className=' w-[80%]'>
                <div className='flex items-center gap-1 p-1'>
                    <div><img src={Genius} alt="" className='w-13 h-5 rounded-md' /></div>
                    <div className='flex'>
                        {Array(rating).fill(0).map((_, index) => <Stars key={index} className='w-3 h-3 fill-yellow-300' />)}
                    </div>
                    <div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className='h-6 flex items-center text-xs bg-gray-200 font-normal'>{propertyData.type}</div>
                                </TooltipTrigger>
                                <TooltipContent className='bg-black'>
                                    <p>Add to library</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <div className='p-1'>
                    <p className='font-bold text-2xl'>{propertyData.title}</p>
                </div>
                <div className='flex items-center p-1'>
                    <Location className='fill-blue-500 w-5 h-5' />
                    <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className='h-6 flex items-center cursor-zoom-in text-xs font-normal'>{propertyData?.location.country} –<span className='text-blue-600 font-bold hover:underline'>Great location - show map</span>– {propertyData.location.city}</div>
                                </TooltipTrigger>
                                <TooltipContent className='bg-black'>
                                    <p>Add to library</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                </div>
            </div>
            <div className=' w-[20%] grid'>
                <div className='flex items-center justify-between'>
                    <Button variant="ghost" className='h-10 w-10'><SaveButton /></Button>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className='h-10 w-10'><Share className='w-5 h-5  fill-blue-600' /></Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-80 flex flex-col gap-2 '>
                            <p className='font-bold'>Share this property</p>
                            <Button variant="ghost" className='flex items-center justify-start'><Copy />Copy Link</Button>
                            <Button variant="ghost" className='flex items-center justify-start'><FacebookWhiteIcon />Facebook</Button>
                            <Button variant="ghost" className='flex items-center justify-start'><Xicon />X (formely twiter)</Button>
                        </PopoverContent>
                    </Popover>
                    <Button>Reverse</Button>
                </div>
                <div className='hover:bg-accent cursor-pointer flex items-center justify-end gap-2 p-2'>
                    <Discount className='fill-blue-600 w-4 h-4'/>
                    <p className='text-blue-600 text-xs font-bold'>We Price Match</p>
                </div>
            </div>
        </div>
    )
}

export default PropertyTitle
