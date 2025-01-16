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
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addInterest } from '@/store/slices/userSlices'
import { modifyUserArrays } from '@/utils/api/userApi'
import SaveButton from './SaveButton'
import { useTranslation } from 'react-i18next'


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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const { i18n } = useTranslation();
    const isRtl = i18n.language === "he";

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

    async function handleNavToProperty() {
        try {
            navigate(`/property/${propertyData._id}`)
            const updatedUser = await modifyUserArrays("add", { interested: propertyData._id})
            console.log("interestedArr", updatedUser.interested)
            dispatch(addInterest(updatedUser.interested))
        } catch(err) {
            console.log("React Client Error: ", err)
        }
    }
    
    let nights: number;
    const startDate = searchParams.get("startDate") ? new Date(searchParams.get("startDate") as string) : undefined;
    const endDate = searchParams.get("endDate") ? new Date(searchParams.get("endDate") as string) : undefined;
    const isWeekend = Boolean(searchParams.get("isWeekend") as string);
    const length = Number(searchParams.get("length") || 1);

    if(startDate && endDate)
        nights = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    else if(isWeekend)
        nights = 5;
    else
        nights = length

    return (
        <div>
        {isGrid? 
        <Card className='max-w-[260px] flex flex-col gap-3 '>
            {/* Image Section */}
            <div className='h-[30%] relative'>
                <img src={propertyData?.images[0]} alt="Property" className='w-full h-[240px] object-cover rounded-xl' />
                <div className="absolute top-2 right-2">
                    <SaveButton id={propertyData._id} />
                </div>
            </div>

            {/* Title and Rating Section */}
            <CardContent className=''>
                <CardTitle className='text-blue-600 text-lg font-bold hover:text-black cursor-pointer'>
                    {cf(propertyData.title)}
                </CardTitle>
                <div className='flex gap-1 p-1'>
                    <div className='flex'>
                        {Array(Math.round((propertyData.total_rating || 0)/2)).fill(0).map((_, index) => (
                            <Stars key={index} className='w-4 fill-yellow-300' />
                        ))}
                    </div>
                    <img src={ThumbsUp} alt="thumbs-up" className='w-4 h-4' />
                    <img src={Genius} alt="genius" className='w-9 h-4 rounded-md' />
                </div>
                <CardDescription className='text-xs'>
                    <div className='flex items-center gap-1 p-1'>
                        <Badge variant="rating" className='cursor-pointer'>
                            {propertyData.total_rating?.toFixed(1)}
                        </Badge>
                        <CardTitle>{getDescByRating(propertyData.total_rating || 0) + ", "}</CardTitle>
                        <CardDescription className='text-xs'>reviews: {propertyData.reviews_num}</CardDescription>
                    </div>
                    <div className='flex gap-2'>
                        <span className='cursor-pointer text-blue-500 text-xs'>
                            <u>{propertyData.location.addressLine}, {propertyData.location.city}</u>
                        </span>
                        <span className='cursor-pointer text-blue-500 text-xs'>
                            <u>Show on map</u>
                        </span>
                    </div>
                </CardDescription>
            </CardContent>

            {/* Rooms and Available Information Section */}
            <div className={`ps-3 ms-5 ${isRtl ? "border-r-2" : "border-l-2"}`}>
                {selectedRooms.map((room, idx) => (
                    <div key={room._id + idx} className='relative ps-2'>
                        <p className={`absolute rounded-lg text-black text-xs px-[1px] py-[2px] bg-[#f2f2f2] ${isRtl ? "-right-5" : "-left-5"}`}>
                            {room.count + " x"}
                        </p>
                        <p className='font-bold text-black text-xs'>{cf(room.type)}</p>
                        <div className='text-xs flex gap-2'>
                            {room.rooms.map(r => {
                                let str = '';
                                if (r.beds.bunk) str += r.beds.bunk + " bunk bed ";
                                if (r.beds.queen) str += r.beds.queen + " queen bed ";
                                if (r.beds.double) str += r.beds.double + " double bed ";
                                if (r.beds.single) str += r.beds.single + " single bed ";
                                if (r.beds.sofa) str += r.beds.sofa + " sofa bed";
                                return cw(str);
                            }).filter(e => e).join("•" + " ")}
                        </div>
                        {new Date(room.offers[0].discount.expires).getTime() <= new Date().setDate(new Date().getDate() + DAYS_FOR_LIMITED) && (
                            <div className='fill-green-700 flex items-center'>
                                <Vi className='w-4 h-4' />
                                <span className='text-green-700'>Limited-time Deal</span>
                            </div>
                        )}
                        {room.available.availableRooms <= ROOMS_FOR_LIMITED && (
                            <p className='text-red-600 text-xs font-medium'>Only {room.available.availableRooms} left at this price on our site</p>
                        )}
                    </div>
                ))}
            </div>


            {/* Availability and Price Section */}
            <div dir={isRtl ? "ltr" : "rtl"} className='grid gap-1 p-4'>
                <div className='text-xs'>
                    {propertyData.selectedRooms &&
                        new Date(propertyData.selectedRooms[0].available.startDate)
                            .toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' }) +
                        " - " +
                        new Date(new Date(propertyData.selectedRooms[0].available.startDate).setDate(new Date(propertyData.selectedRooms[0].available.startDate).getDate() + nights + 1))
                            .toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' })}
                </div>
                <div className='text-xs text-gray-600'>
                    overall: {nights} nights, {searchParams.get("adults")} adults
                </div>
                <div className='flex items-center gap-1'>
                    <Information className='text-gray-600 w-4 h-4' />
                    {selectedRooms && <>
                        <p>{discountedPrice + " ₪"}</p>
                        <p className='text-red-600'><s>{price + " ₪"}</s></p>
                    </>}
                </div>
                <Button>{"<"} See availability</Button>
            </div>
        </Card>
        : 
        <Card className='flex justify-between p-5 mx-auto max-w-[815px]'>
            <div className='flex gap-5'>
                <div className='w-50% relative'>
                    <img src={propertyData?.images[0]} alt="" 
                    className='h-[240px] w-[240px] object-cover rounded-xl' />
                    <div className="absolute top-2 end-1">
                        <SaveButton id={propertyData._id}/>
                    </div>
                </div>
                <div className='flex flex-col gap-2 '>
                    <CardTitle>
                    <span className='text-blue-600 text-xl hover:text-black cursor-pointer'
                    onClick={handleNavToProperty}
                    >{cf(propertyData.title)}</span>
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
                        { isLimited && <Badge variant="deals" className='mt-1'>Limited-time Deal</Badge>}
                    </CardDescription>
                    <CardDescription className={`p-3 flex flex-col gap-2 ${isRtl ? "border-r-2" : "border-l-2"}`}>
                        { 
                        selectedRooms.map((room,idx) => 
                            <div key={room._id+idx} className='relative pl-2'>
                                <p className={`absolute rounded-lg text-black text-xs px-[1px] py-[2px] bg-[#f2f2f2]
                                    ${isRtl ? "-right-5" : "-left-5"}`
                                }>
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
                                    ).filter(e => e).join("•" + " ")}</div>
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
            <div dir={isRtl ? "ltr": "rtl"} className='flex flex-col gap-16	'>
                {/* Rating Location */}
                <div className='grid gap-2'>
                    <div className='flex gap-3'>
                        <div>
                            <Badge variant="rating" className='cursor-pointer h-full'>{propertyData.total_rating?.toFixed(1)}</Badge>
                        </div>
                        <div>
                            <CardTitle>{getDescByRating(propertyData.total_rating || 0)}</CardTitle>
                            <CardDescription className='text-xs'>{propertyData.reviews_num} reviews</CardDescription>
                        </div>
                    </div>
                    <div>
                        <p className='text-blue-600 text-sm hover:underline cursor-pointer' >Location 9.6</p>
                    </div>
                </div>
                {/* Dates Nights */}
                <div className='grid gap-2'>
                    <div className='text-xs border'>
                        <p>
                            { propertyData.selectedRooms &&
                            new Date(propertyData.selectedRooms[0].available.startDate).
                            toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' })
                            + " - " +
                            new Date(new Date(propertyData.selectedRooms[0].available.startDate).setDate(new Date(propertyData.selectedRooms[0].available.startDate).getDate() + nights + 1))
                            .toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' })
                            }
                            </p>
                    </div>
                    <p className='text-xs text-gray-600'>
                        overall: {nights} nights, {searchParams.get("adults")} adults
                    </p>
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

