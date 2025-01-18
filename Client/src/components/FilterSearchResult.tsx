import { useEffect, useState } from 'react'
import image from '../assets/images/Dubai.jpg'
import { Card, CardDescription, CardTitle } from './ui/card'
import { Checkbox } from './ui/checkbox'
import barGraph from '../assets/images/bargraph.png'
import { Slider } from './ui/slider'
import { useSearchParams } from 'react-router-dom'
import { IconCounterMinus, IconCounterPlus } from './ui/Icons'
import { cn } from '@/lib/utils'
import { cf, cw, scrollToTop } from '@/utils/functions'
import CheckpointMap, { LatLng } from './CheckpointMap'
import { IFilters, IProperty } from '@/types/propertyTypes'
import { Skeleton } from './ui/skeleton'
import MultiRangeSlider from './multiRangeSlider/MultiRangeSlider'
import { IPage } from '@/pages/SearchResults'

const distanceOptions = {
    "Less than 5 km": 5,
    "Less than 10 km": 10,
    "Less than 15 km": 15,
}

interface FilterSearchResultProps {
    data?: IPage;
    isFetching?: boolean;
    isOnMap?: boolean;
    className?: string;
}

function FilterSearchResult({className, data, isFetching, isOnMap} : FilterSearchResultProps) {
    let { filters, filteredProperties } = data || {};

    if(!isOnMap && !isFetching && !filteredProperties?.length) {
        return (
            <div className=' w-[260px] grid gap-4'>
                <Card className='p-2'>
                    <CardTitle className='border-b-2 p-2'>Filter by:</CardTitle>
                    <CardDescription className='p-2'>No Available Filters...</CardDescription>
                </Card>
            </div>
        )
    }
    const [searchParams, setSearchParams] = useSearchParams();

    const [min, setMin] = useState<number>()
    const [max, setMax] = useState<number>()

    if(filters?.overall_count === 0)
        filters = undefined;

    useEffect(() => {
        // Default start price range
        setMin(Number(searchParams.get('min') || filters?.price.min || 0))
        setMax(Number(searchParams.get('max') || filters?.price.max || 0));
    }, [filters])

    const handleSliderValueChange = (min: number, max: number) => {
        const updatedSearchParams = new URLSearchParams(searchParams);
        setMin(min);
        updatedSearchParams.set('min', min.toString());
        setMax(max);
        updatedSearchParams.set('max', max.toString());
        setSearchParams(updatedSearchParams);
    };

    const handleCheckboxChange = (category: string, value: string) => {
        const existingValues = searchParams.getAll(category);
    
        if (existingValues.includes(value)) {
        // Remove from URL if already checked
        searchParams.delete(category); // Remove previous entries
        existingValues
            .filter((v) => v !== value)
            .forEach((v) => searchParams.append(category, v));
        } else {
        // Add to URL if not checked
        searchParams.append(category, value);
        }
        scrollToTop();
        setSearchParams(searchParams);
    };

    function handlePlusBeds(category: string) {
        const newVal =parseInt(searchParams.get(category) || '0') + 1;
        if(newVal > 10 ) return;
        searchParams.set(category, newVal.toString());
        scrollToTop();
        setSearchParams(searchParams);
    }
    function handleMinusBeds(category: string) {
        const newVal =parseInt(searchParams.get(category) || '0') - 1;
        if(newVal < 0 ) return;
        searchParams.set(category, newVal.toString());
        scrollToTop();
        setSearchParams(searchParams);
    }

    return (
        <div className={cn('w-[260px] grid gap-4', className)}>
            <Card className='p-2 '>
                <CardTitle className='border-b-2 p-2'>Filter by:</CardTitle>

                {/* Price Slider */} 
                {  (min  && max) ? 
                <div className='flex flex-col gap-2 border-b-2 p-2'> 
                    <CardTitle className='font-semibold mb-6'>Your budget (per night)</CardTitle>
                    <img src={barGraph} className='-mb-2 w-[200px] mx-auto'/>
                    <div className='mb-3'>
                        <MultiRangeSlider
                            min={min}
                            max={max}
                            onChange={({ min, max }) => handleSliderValueChange(min, max)}
                        />
                    </div>
                </div> 
                : <></>
                }

                { !filters && [... Array(14)].map((_,index) =>
                    <div key={"skeleton-"+index}>
                    <Skeleton className={`w-[${getRandomWidth()}] h-2 m-2`} />
                    <Skeleton className={`w-[${getRandomWidth()}] h-2 m-2`} />
                    <Skeleton className={`w-[${getRandomWidth()}] h-2 m-2`} />
                    <Skeleton className={`w-[${getRandomWidth()}] h-2 m-2`} />
                    <CardTitle className='border-b-2 my-5'></CardTitle>
                    </div>
                )}

                {/* Property Type */}
                { filters?.type &&
                <div className='flex flex-col gap-2 border-b-2 p-2 '> 
                    <CardTitle className='font-semibold'>Property Type</CardTitle>
                    {Object.entries(filters.type).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                        <div className="flex items-center gap-2">
                        <Checkbox
                            id={key}
                            className="rounded-md p-2 border-black"
                            checked={searchParams.getAll("type").includes(key)}
                            onCheckedChange={() => handleCheckboxChange("type", key)}
                        />
                        <label htmlFor={key} className="text-sm">
                            {cf(key)}
                        </label>
                        </div>
                        <div>
                        <p>{String(value)}</p>
                        </div>
                    </div>
                    ))}
                </div>
                }
                
                {/* Facilities */}
                { filters?.popularFacilities &&
                <div className='flex flex-col gap-2 border-b-2 p-2 '> 
                    <CardTitle className='font-semibold'>Popular Facilities</CardTitle>
                    {Object.entries(filters.popularFacilities).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                        <div className="flex items-center gap-2">
                        <Checkbox
                            id={key}
                            className="rounded-md p-2 border-black"
                            checked={searchParams.getAll("facility").includes(key)}
                            onCheckedChange={() => handleCheckboxChange("facility", key)}
                        />
                        <label htmlFor={key} className="text-sm">
                            {key}
                        </label>
                        </div>
                        <div>
                        <p>{String(value)}</p>
                        </div>
                    </div>
                    ))}                
                </div>
                }

                {/* Meals */}
                { filters?.meals &&
                <div className='flex flex-col gap-2 border-b-2 p-2 '> 
                    <CardTitle className='font-semibold'>Meals</CardTitle>
                    {Object.entries(filters.meals).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                        <div className="flex items-center gap-2">
                        <Checkbox
                            id={key}
                            className="rounded-md p-2 border-black"
                            checked={searchParams.getAll("meal").includes(key)}
                            onCheckedChange={() => handleCheckboxChange("meal", key)}
                        />
                        <label htmlFor={key} className="text-sm">
                            {cf(key)}
                        </label>
                        </div>
                        <div>
                        <p>{String(value)}</p>
                        </div>
                    </div>
                    ))}                
                </div>
                }

                {/* Rating */}
                { filters?.rating &&
                <div className='flex flex-col gap-2 border-b-2 p-2 '> 
                    <CardTitle className='font-semibold'>Property rating</CardTitle>
                    {Object.entries(filters.rating).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                        <div className="flex items-center gap-2">
                        <Checkbox
                            id={key}
                            className="rounded-md p-2 border-black"
                            checked={searchParams.getAll("rating").includes(key)}
                            onCheckedChange={() => handleCheckboxChange("rating", key)}
                        />
                        <label htmlFor={key} className="text-sm">
                            {key + (key === "1" ? " Star": " Stars")}
                        </label>
                        </div>
                        <div>
                        <p>{String(value)}</p>
                        </div>
                    </div>
                    ))}                
                </div>
                }

                {/* Bedrooms And Bathrooms */}
                { filters &&
                <div className='border-b-2 p-2 flex flex-col gap-3 '>
                    <CardTitle>Bedrooms And Bathrooms</CardTitle>
                    {/* Bedroom Button */}
                    <div className=' flex justify-between'>
                        <p className='flex items-center'>Bedrooms</p>
                        <div
                        className="border-[#868686] border-[1.5px]  rounded-lg p-2 flex justify-around items-center w-[50%]"
                        >
                        <button
                            onClick={() => handleMinusBeds("Bedrooms")}
                            className={cn("text-2xl fill-blue-600", 
                                parseInt(searchParams.get("Bedrooms") || '0') === 0 && "cursor-not-allowed fill-softGray")}
                        >
                            <IconCounterMinus />
                        </button>
                        <p>{searchParams.get("Bedrooms") || '0'}</p>
                        <button
                            onClick={() => handlePlusBeds("Bedrooms")}
                            className={cn("text-lg fill-blue-600", 
                                parseInt(searchParams.get("Bedrooms") || '0') === 10 && "cursor-not-allowed fill-softGray")}
                        >
                            <IconCounterPlus />
                        </button>
                        </div>
                    </div>
                    {/* Bathrooms Button */}
                    <div className=' flex justify-between'>
                        <p className='flex items-center'>Bathrooms</p>
                        <div
                        className="border-[#868686] border-[1.5px]  rounded-lg p-2 flex justify-around items-center w-[50%]"
                        >
                        <button
                            onClick={() => handleMinusBeds("Bathrooms")}
                            className={cn("text-2xl fill-blue-600", 
                                parseInt(searchParams.get("Bathrooms") || '0') === 0 && "cursor-not-allowed fill-softGray")}
                        >
                            <IconCounterMinus />
                        </button>
                        <p>{searchParams.get("Bathrooms") || '0'}</p>
                        <button
                            onClick={() => handlePlusBeds("Bathrooms")}
                            className={cn("text-lg fill-blue-600", 
                                parseInt(searchParams.get("Bathrooms") || '0') === 10 && "cursor-not-allowed fill-softGray")}
                        >
                            <IconCounterPlus />
                        </button>
                        </div>
                    </div>
                </div>
                }

                {/* Distance */}
                { filters &&
                <div className='flex flex-col gap-2 border-b-2 p-2 '> 
                    <CardTitle className='font-semibold'>Distance from center of 
                        {" " + (searchParams.get("city") ?? searchParams.get("country") ?? "you")}</CardTitle>
                    {Object.entries(distanceOptions).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                        <div className="flex items-center gap-2">
                        <Checkbox
                            id={value.toString()}
                            className="rounded-md p-2 border-black"
                            checked={searchParams.getAll("distance").includes(value.toString())}
                            onCheckedChange={() => handleCheckboxChange("distance", value.toString())}
                        />
                        <label htmlFor={key} className="text-sm">
                            {key}
                        </label>
                        </div>
                    </div>
                    ))}
                    
                
                </div>
                }

                {/* Room Type */}
                { filters?.roomType &&
                <div className='flex flex-col gap-2 border-b-2 p-2 '> 
                    <CardTitle className='font-semibold'>Room Types</CardTitle>
                    {Object.entries(filters.roomType).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                        <div className="flex items-center gap-2">
                        <Checkbox
                            id={key}
                            className="rounded-md p-2 border-black"
                            checked={searchParams.getAll("room").includes(key)}
                            onCheckedChange={() => handleCheckboxChange("room", key)}
                        />
                        <label htmlFor={key} className="text-sm">
                            {cf(key)}
                        </label>
                        </div>
                        <div>
                        <p>{String(value)}</p>
                        </div>
                    </div>
                    ))}                
                </div>
                }

                {/* Room facilities */}
                { filters?.roomFacilities &&
                <div className='flex flex-col gap-2 border-b-2 p-2 '> 
                    <CardTitle className='font-semibold'>Room facilities </CardTitle>
                    {Object.entries(filters.roomFacilities).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                        <div className="flex items-center gap-2">
                        <Checkbox
                            id={key}
                            className="rounded-md p-2 border-black"
                            checked={searchParams.getAll("roomFacility").includes(key)}
                            onCheckedChange={() => handleCheckboxChange("roomFacility", key)}
                        />
                        <label htmlFor={key} className="text-sm">
                            {cw(key)}
                        </label>
                        </div>
                        <div>
                        <p>{String(value)}</p>
                        </div>
                    </div>
                    ))}
                </div>
                }       

                {/* Bed preference */}
                { (filters?.doubleBeds || filters?.singleBeds) &&
                <div className='flex flex-col gap-2 border-b-2 p-2 '> 
                <CardTitle className='font-semibold'>Bed preference</CardTitle>
                {Object.entries({"Double Bed": filters.doubleBeds , "Single Bed": filters.singleBeds})
                .map(([key, value]) => {
                return (value === 0) ? null : (
                <div key={key} className="flex justify-between">
                    <div className="flex items-center gap-2">
                    <Checkbox
                        id={key}
                        className="rounded-md p-2 border-black"
                        checked={searchParams.getAll("Bed preference").includes(key)}
                        onCheckedChange={() => handleCheckboxChange("Bed preference", key)}
                    />
                    <label htmlFor={key} className="text-sm">
                        {cf(key)}
                    </label>
                    </div>
                    <div>
                    <p>{String(value)}</p>
                    </div>
                </div>
                )}
                )}
                </div>
                }

                {/* Reservation policy*/}
                { filters?.freeCancellation &&
                <div className='flex flex-col gap-2 border-b-2 p-2 '> 
                    <CardTitle className='font-semibold'>Reservation policy</CardTitle>
                    <div key={"free"} className="flex justify-between">
                        <div className="flex items-center gap-2">
                        <Checkbox
                            id={"free"}
                            className="rounded-md p-2 border-black"
                            checked={!!searchParams.get("free")}
                            onCheckedChange={() => handleCheckboxChange("free", "1")}
                        />
                        <label htmlFor={"free"} className="text-sm">
                            Free cancellation
                        </label>
                        </div>
                        <div>
                        <p>{String(filters.freeCancellation)}</p>
                        </div>
                    </div>
                </div>
                }

                {/* Online Payment*/}
                { filters?.onlinePayment &&
                <div className='flex flex-col gap-2 border-b-2 p-2 '> 
                    <CardTitle className='font-semibold'>Online Payment</CardTitle>
                    <div key={"online"} className="flex justify-between">
                        <div className="flex items-center gap-2">
                        <Checkbox
                            id={"online"}
                            className="rounded-md p-2 border-black"
                            checked={!!searchParams.get("online")}
                            onCheckedChange={() => handleCheckboxChange("online", "1")}
                        />
                        <label htmlFor={"online"} className="text-sm">
                            Accepts online payments
                        </label>
                        </div>
                        <div>
                        <p>{String(filters.onlinePayment)}</p>
                        </div>
                    </div>
                </div>
                }
            </Card>
        </div>
    )
}

export default FilterSearchResult


const getRandomWidth = () => {
    const randomWidth = Math.floor(Math.random() * 7) + 3;
    return `${randomWidth*10}%`;
};