import React from 'react'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card'
import KidsImage from '../assets/images/kids.jpeg'
import { Stars, Vi } from './ui/Icons'
import ThumbsUp from '../assets/images/thumps.png'
import Genius from '../assets/images/Genius.png'
import { Information } from './ui/Icons'
import { Button } from './ui/button'
function PropertyCard() {

    interface PropertyCardProp {
        isThumbsUp?: boolean;

    }
    const arr = ["a", "b", "c"]
    const rating = 5;
    return (
        <Card className='flex justify-between p-5 max-w-[815px]'>
            <div className='flex gap-5'>
                <div className='w-50%'>
                    <img src={KidsImage} alt="" className='h-[240px] w-[240px] rounded-xl' />
                </div>
                <div className='flex flex-col gap-2 '>
                    <CardTitle className='text-blue-600 text-xl hover:text-black'>7 Seasons Apartments Budapest</CardTitle>
                    <div className='flex gap-1'>
                        <div className='flex'>
                            {Array(rating).fill(0).map((_, index) => <Stars key={index} className='w-4 fill-yellow-300' />)}
                        </div>
                        <div className='flex items-center gap-1'>
                            <img src={ThumbsUp} alt="t" className='w-4 h-4' />
                            <img src={Genius} alt="" className='w-9 h-4 rounded-md' />
                        </div>
                    </div>
                    <CardDescription>
                        <div className='flex gap-2'>
                            <p className='cursor-pointer text-blue-500 text-xs'><u>0.6 Terezvaros, Budapest</u></p>
                            <p className='cursor-pointer text-blue-500 text-xs'><u>Show on map</u></p>
                        </div>
                        <div className='flex gap-2'>
                            <p className='text-xs'>100 m from centre</p>
                            <p className='text-xs'>Metro access</p>
                        </div>
                        <Badge variant="deals" className='h-5'>Limited-time Deal</Badge>
                    </CardDescription>
                    <CardDescription className='border-l-2 p-2 grid gap-1'>
                        <p className='font-bold	text-black text-xs'>Studio</p>
                        <div className='text-xs flex gap-2'><p>Entire studio</p>{arr.join("•" + " ")}</div>
                        <p className='text-xs'>2 beds (1 sofa bed, 1 large double)</p>
                        <p className='fill-green-700 flex items-center '><Vi className='w-4 h-4'/><p className='text-green-700'>Limited-time Deal</p></p>
                        <p className='text-red-600 text-xs font-medium	'>Only 3 left at this price on our site</p>
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
                            <CardTitle>Suberb</CardTitle>
                            <CardDescription className='text-xs'>3,551 reviews</CardDescription>
                        </div>
                    </div>
                    <div>
                        <p className='text-blue-600 text-sm hover:underline cursor-pointer' >Location 9.6</p>
                    </div>
                </div>
                <div className='grid gap-2'>
                    <div className='text-xs border'>
                        <p>Mon 17 Feb - Sat 22 Feb</p>
                    </div>
                    <p className='text-xs text-gray-600'>5 nights, 2 adults</p>
                    <div className='flex items-center gap-1'>
                        <Information className='text-gray-600 w-4 h-4' />
                        <p>₪ 1,297</p>
                        <p className='text-red-600 '><s>₪ 2,137</s></p>
                    </div>
                    <Button>{"<"} See availability </Button>
                </div>
            </div>
        </Card>
    )
}

export default PropertyCard
