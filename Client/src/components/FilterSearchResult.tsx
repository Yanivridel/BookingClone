import { useEffect, useState } from 'react'
import image from '../assets/images/Dubai.jpg'
import { Card, CardDescription, CardTitle } from './ui/card'
import { Checkbox } from './ui/checkbox'
import barGraph from '../assets/images/bargraph.png'
import { Slider } from './ui/slider'
import { useSearchParams } from 'react-router-dom'
import { IconCounterMinus, IconCounterPlus } from './ui/Icons'
import { cn } from '@/lib/utils'
import { cf, cw } from '@/utils/functions'
import CheckpointMap, { LatLng } from './CheckpointMap'
import { IProperty } from '@/types/propertyTypes'

const distanceOptions = {
    "Less than 1 km": 1,
    "Less than 3 km": 3,
    "Less than 5 km": 5,
}

interface IFilters {
    overall_count: number;
    type: { [key: string]: number };
    rating: { [key: number]: number };
    popularFacilities: { [key: string]: number };
    roomType: { [key: string]: number };
    roomFacilities: { [key: string]: number };
    meals: { [key: string]: number };
    freeCancellation: number;
    onlinePayment: number;
    region: { [key: string]: number };
    price: {
        min: number;
        max: number;
    };
    doubleBeds: number;
    singleBeds: number;
}

interface FilterSearchResultProps {
    filters: IFilters;
    coordinates: LatLng[];
}

function FilterSearchResult({filters, coordinates} : FilterSearchResultProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [priceRange, setPriceRange] = useState<number[]>();

    console.log(filters);

    useEffect(() => {
        // Default start price range
        setPriceRange([
            parseInt(searchParams.get('min') || String(filters?.price.min) || '0'),
            parseInt(searchParams.get('max') || String(filters?.price.max) || '1000'),
        ])
    }, [filters])

    const handleSliderValueChange = (newRange: number[]) => {
        setPriceRange(newRange);

        searchParams.set('min', newRange[0].toString());
        searchParams.set('max', newRange[1].toString());
        setSearchParams(searchParams)
    }

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
        setSearchParams(searchParams);
    };

    function handlePlusBeds(category: string) {
        const newVal =parseInt(searchParams.get(category) || '0') + 1;
        if(newVal > 10 ) return;
        searchParams.set(category, newVal.toString());
        setSearchParams(searchParams);
    }
    function handleMinusBeds(category: string) {
        const newVal =parseInt(searchParams.get(category) || '0') - 1;
        if(newVal < 0 ) return;
        searchParams.set(category, newVal.toString());
        setSearchParams(searchParams);
    }


    return (
        <div className='border max-w-[260px] grid gap-4'>
            <div className='border h-[150px] max-w-[260px] rounded-lg'>
                {/* {coordinates && <CheckpointMap center={coordinates[0]} markers={coordinates} />} */}
            </div>
            <Card className='p-2'>
                <CardTitle className='border-b-2 p-2'>Filter by:</CardTitle>
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
                

                {/* Price Slider */} 
                { filters?.price && priceRange && 
                <div className='flex flex-col gap-2 border-b-2 p-2 '> 
                <CardTitle className='font-semibold'>Your budget (per night)</CardTitle>
                <h3 className="text-sm font-semibold">
                    {`₪${priceRange[0]} - ₪${priceRange[1]}`}
                </h3>
                <img src={barGraph} className='-mb-2'/>
                <Slider 
                    value={priceRange}
                    onValueChange={handleSliderValueChange}
                    min={filters.price.min} 
                    max={filters.price.max} 
                    step={10} 
                    className="w-full"
                />
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

                {/* Distance */}
                <div className='flex flex-col gap-2 border-b-2 p-2 '> 
                    <CardTitle className='font-semibold'>Distance from center of Paris</CardTitle>
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