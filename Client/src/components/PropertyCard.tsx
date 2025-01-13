import React from 'react'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card'
import KidsImage from '../assets/images/kids.jpeg'
import { Stars, Vi } from './ui/Icons'
import ThumbsUp from '../assets/images/thumps.png'
import Genius from '../assets/images/Genius.png'
import { Information } from './ui/Icons'
import { Button } from './ui/button'
import { IProperty } from '@/types/propertyTypes'
import { IRoom, TSelectedRoom } from '@/types/roomTypes'
import { cf, cw, getDescByRating } from '@/utils/functions'


interface PropertyCardProp {
    propertyData: IProperty;
    isGrid?: boolean;
}
const DAYS_FOR_LIMITED = 30;
const ROOMS_FOR_LIMITED = 5;

function PropertyCard({propertyData, isGrid}:PropertyCardProp) {
    
    const selectedRooms = (propertyData.rooms as IRoom[])
    .filter(room => propertyData.selectedRooms?.some(selected => selected.id === room._id))
    .map(room => {
        const selected = propertyData.selectedRooms?.find(selected => selected.id === room._id);
        return { ...room, ...selected };
    }) as unknown as TSelectedRoom[];

    const discountedPrice = selectedRooms.reduce((total, currRoom) => {
        const offer = currRoom.offers?.[0];
        const discount = offer?.discount?.percentage || 0;
        return total + (offer ? offer.price_per_night * (1 - discount / 100) : 0);
    }, 0);
    const price = selectedRooms.reduce((total, currRoom) => {
        const offer = currRoom.offers?.[0];
        return total + (offer ? offer.price_per_night : 0);
    }, 0);
    
    const isLimited = selectedRooms.some(room => 
        new Date(room.offers[0].discount.expires).getTime() <= new Date().setDate(new Date().getDate() + DAYS_FOR_LIMITED)
    )
    
    const arr = ["a", "b", "c"]
    return (
        <div>
        {isGrid? 
        <Card className='max-w-[260px]'>
            <div className='h-[30%]'>
                <img src={KidsImage} alt="" />
            </div>
            <div>
                <CardContent className='p-4'>
                    <CardTitle className='text-blue-600 hover:text-black text-lg'>Flora Inn Hotel Dubai Airport</CardTitle>
                    <div className=' flex gap-1 p-1'>
                        <div className='flex'>
                            {/* {Array(rating).fill(0).map((_, index) => <Stars key={index} className='w-4 fill-yellow-300' />)} */}
                        </div>
                        <img src={ThumbsUp} alt="t" className='w-4 h-4' />
                        <img src={Genius} alt="" className='w-9 h-4 rounded-md' />
                    </div>
                    <CardDescription>
                        <div className='flex gap-1 p-1'>
                            <div>
                                <Badge variant="rating" className='cursor-pointer h-full'>9.0</Badge>
                            </div>
                            <div className='flex items-center gap-1'>
                                <CardTitle>Suberb</CardTitle>
                                <CardDescription className='text-xs'>3,551 reviews</CardDescription>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <span className='cursor-pointer text-blue-500 text-xs'><u>0.6 Terezvaros, Budapest</u></span>
                            <span className='cursor-pointer text-blue-500 text-xs'><u>Show on map</u></span>
                        </div>
                        <div className='flex gap-2 border-b-2 p-2'>
                            <p className='text-xs'>100 m from centre</p>
                            <p className='text-xs'>Metro access</p>
                        </div>
                        <div>
                        </div>
                    </CardDescription>
                </CardContent>
            </div>
            <div className='p-4'>
                <div>
                    <p className='font-bold	text-black text-xs'>Studio</p>
                    <div className='text-xs flex gap-2'><p>Entire studio</p>{arr.join("•" + " ")}</div>
                    <p className='text-xs'>2 beds (1 sofa bed, 1 large double)</p>
                </div>
                <div>
                    <div className='fill-green-700 flex items-center text-sm '><Vi className='w-4 h-4' /><span className='text-green-700'>Limited-time Deal</span></div>
                    <p className='text-red-600 text-xs font-medium	'>Only 3 left at this price on our site</p>
                </div>
            </div>
            <div dir='rtl' className='grid items-center gap-1 p-4'>
                <p className='text-xs text-gray-600'>5 nights, 2 adults</p>
                <p className=''>₪ 1,297</p>
                <p className='text-xs text-gray-600'>5 nights, 2 adults 5 nights, 2 adults</p>
            </div>

        </Card>

        : 
        <Card className='flex justify-between p-5 max-w-[815px]'>
            <div className='flex gap-5'>
                <div className='w-50%'>
                    <img src={propertyData?.images[0]} alt="" className='h-[240px] w-[240px] rounded-xl' />
                </div>
                <div className='flex flex-col gap-2 '>
                    <CardTitle>
                    <span className='text-blue-600 text-xl hover:text-black cursor-pointer'>{cf(propertyData.title)}</span>
                    <div className='flex gap-1'>
                        <div className='flex'>
                            {Array(Math.round((propertyData.total_rating || 0)/2)).fill(0).map((_, index) => <Stars key={index} className='w-4 fill-yellow-300' />)}
                        </div>
                        <div className='flex items-center gap-1'>
                            <img src={ThumbsUp} alt="t" className='w-4 h-4' />
                            <img src={Genius} alt="" className='w-9 h-4 rounded-md' />
                        </div>
                    </div>
                    </CardTitle>
                    <CardDescription>
                        <div className='flex gap-2'>
                            <p className='cursor-pointer text-blue-500 text-xs'><u>
                                {propertyData.location.addressLine + ","}
                                {propertyData.location.city + ","}
                                </u></p>
                            <p className='cursor-pointer text-blue-500 text-xs'><u>Show on map</u></p>
                        </div>
                        {/* <div className='flex gap-2'>
                            <p className='text-xs'>100 m from centre</p>
                            <p className='text-xs'>Metro access</p>
                        </div> */}
                        { isLimited && <Badge variant="deals" className='mt-1'>Limited-time Deal</Badge>}
                    </CardDescription>
                    <CardDescription className='border-l-2 p-2 flex flex-col gap-2'>
                        { 
                        selectedRooms.map((room,idx) => 
                            <div key={room._id+idx} className='relative pl-2'>
                                <p className='absolute -left-5 rounded-lg text-black text-xs px-[3px] py-[2px] bg-[#f2f2f2]'>
                                    {room.count + " x"}
                                </p>
                                <p className='font-bold	text-black text-xs'>{cf(room.type)}</p>
                                <div className='text-xs flex gap-2'>{room.rooms.map(r => {
                                    let str = ''
                                    if(r.beds.bunk) str+= r.beds.bunk + " bunk bed "
                                    if(r.beds.queen) str+= r.beds.queen + " queen bed "
                                    if(r.beds.double) str+= r.beds.double + " double bed "
                                    if(r.beds.single) str+= r.beds.single + " single bed "
                                    if(r.beds.sofa) str+= r.beds.sofa + " sofa bed"
                                    return cw(str);
                                    }
                                    ).join("•" + " ")}</div>
                                {   new Date(room.offers[0].discount.expires).getTime() <= new Date().setDate(new Date().getDate() + DAYS_FOR_LIMITED) && 
                                    <div className='fill-green-700 flex items-center '><Vi className='w-4 h-4'/><span className='text-green-700'>Limited-time Deal</span></div>
                                }
                                { room.available.availableRooms <= ROOMS_FOR_LIMITED && 
                                    <p className='text-red-600 text-xs font-medium'>Only {room.available.availableRooms} left at this price on our site</p>
                                }
                            </div>
                        )
                        }

                        
                    </CardDescription>
                </div>
            </div>
            <div dir='rtl' className='flex flex-col gap-16	'>
                <div className='grid gap-2'>
                    <div className='flex gap-1'>
                        <div>
                            <Badge variant="rating" className='cursor-pointer h-full'>9.0</Badge>
                        </div>
                        <div>
                            <CardTitle>{getDescByRating(propertyData.total_rating || 0)}</CardTitle>
                            <CardDescription className='text-xs'>{propertyData.reviews_num} reviews</CardDescription>
                        </div>
                    </div>
                    {/* <div>
                        <p className='text-blue-600 text-sm hover:underline cursor-pointer' >Location 9.6</p>
                    </div> */}
                </div>
                <div className='grid gap-2'>
                    <div className='text-xs border'>
                        <p>
                            { propertyData.selectedRooms &&
                            new Date(propertyData.selectedRooms[0].available.startDate).
                            toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' })
                            }
                            -
                            Sat 22 Feb</p>
                    </div>
                    <p className='text-xs text-gray-600'>5 nights, 2 adults</p>
                    <div className='flex items-center gap-1'>
                        <Information className='text-gray-600 w-4 h-4' />
                        
                        { selectedRooms && <>
                        <p>
                            {discountedPrice + " ₪"}
                        </p>
                        <p className='text-red-600 '><s>
                        { price + " ₪"}
                        </s></p>
                        </>}
                    </div>
                    <Button>{"<"} See availability </Button>
                </div>
            </div>
        </Card>
        }
        
        </div>
    )
}

export default PropertyCard

