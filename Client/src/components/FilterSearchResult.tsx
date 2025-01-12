import { useState } from 'react'
import image from '../assets/images/Dubai.jpg'
import { Card, CardDescription, CardTitle } from './ui/card'
import { Checkbox } from './ui/checkbox'
import bargraph from '../assets/images/bargraph.png'
import { Slider } from './ui/slider'
import { useSearchParams } from 'react-router-dom'


function FilterSearchResult({filters} : any) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [count, setCount] = useState(0);
    // const [priceRange, setPriceRange] = useState([50, 200]);
    // const priceRange = [filters.price.min, filters.price.max]


    function plusClick() {
        setCount(count +1)
    }
    function minusClick() {
        setCount(count -1)
    }

    console.log(filters);


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

        handleSubmit();
    };

    function handleSubmit() {
        console.log("SUBMIT",
            searchParams.getAll("type"),
            searchParams.getAll("facility"),

        )

    }

    return (
        <div className='border max-w-[260px] grid gap-4'>
            <div className='border h-[150px] max-w-[260px] rounded-lg'>
                <img src={image} alt="" className='h-[150px] w-[100%]' />
            </div>
            <Card className='p-2'>
                <CardTitle className='border-b-2 p-2'>Filter by:</CardTitle>
                {/* Property Type */}
                <div className='flex flex-col gap-2 border-b-2 p-2 '> 
                    { filters?.type && <>
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
                            {key}
                        </label>
                        </div>
                        <div>
                        <p>{String(value)}</p>
                        </div>
                    </div>
                    ))}
                    </>}
                
                </div>

                {/* Price Slider */} 
                {/* <CardTitle className='font-semibold'>Your budget (per night)</CardTitle>
                { filters?.price && <>
                <h3 className="text-sm font-semibold">
                {`₪${filters.price.min} - ₪${filters.price.max}`}
                </h3>
                <Slider 
                    value={priceRange} 
                    onValueChange={setPriceRange} 
                    min={0} 
                    max={500} 
                    step={10} 
                    className="w-full"
                />
                
                
                
                </>} */}
                

                {/* Facilities */}
                <div className='flex flex-col gap-2 border-b-2 p-2 '> 
                    { filters?.popularFacilities && <>
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
                    </>}
                
                </div>



                <div className='border-b-2 p-2 flex flex-col gap-3 '>
                    <CardTitle>Bedrooms and bathrooms</CardTitle>
                    <div className=' flex justify-between'>
                        <p>Bedrooms</p>
                        <div className='border p-2 flex justify-around items-center w-[50%]'>
                            <button onClick={minusClick} className='text-2xl'>-</button>
                            <p>{count}</p>
                            <button onClick={plusClick} className='text-lg text-blue-600'>+</button>
                            
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default FilterSearchResult










// import { useState } from 'react'
// import image from '../assets/images/Dubai.jpg'
// import { Card, CardDescription, CardTitle } from './ui/card'
// import { Checkbox } from './ui/checkbox'
// import bargraph from '../assets/images/bargraph.png'
// import { Slider } from './ui/slider'

// function FilterSearchResult() {
//     const[count,setCount] = useState(0)
//     const [sliderValue, setSliderValue] = useState<[number, number]>([30, 700]); // Initial slider value

//     function plusClick() {
//         setCount(count +1)
//     }
//     function minusClick() {
//         setCount(count -1)
//     }

//     const handleSliderChange = (newValue: [number, number]) => {
//         setSliderValue(newValue); // עדכון הערך כמערך
//     };

//     return (
//         <div className='border max-w-[260px] grid gap-4'>
//             <div className='border h-[150px] max-w-[260px] rounded-lg'>
//                 <img src={image} alt="" className='h-[150px] w-[100%]	' />
//             </div>
//             <Card className='p-2'>
//                 <CardTitle className='border-b-2 p-2'>Filter by:</CardTitle>
//                 <div className='flex flex-col gap-2 border-b-2 p-2 '>
//                     <CardTitle className='font-semibold'>Your previous filter</CardTitle>
//                     <div className='flex justify-between'>
//                         <div className='flex items-center gap-2'>
//                             <Checkbox className='rounded-md p-2 border-black' />
//                             <p className='text-sm'>Guest houses</p>
//                         </div>
//                         <div>
//                             <p>74</p>
//                         </div>
//                     </div>
//                     <div className='flex justify-between'>
//                         <div className='flex items-center gap-2'>
//                             <Checkbox className='rounded-md p-2 border-black' />
//                             <p className='text-sm'>Bed and breakfasts</p>
//                         </div>
//                         <div>
//                             <p>26</p>
//                         </div>
//                     </div>
//                     <div className='flex justify-between'>
//                         <div className='flex items-center gap-2'>
//                             <Checkbox className='rounded-md p-2 border-black' />
//                             <p className='text-sm'>Holiday homes</p>
//                         </div>
//                         <div>
//                             <p>20</p>
//                         </div>
//                     </div>

//                     <div className='flex justify-between'>
//                         <div className='flex items-center gap-2'>
//                             <Checkbox className='rounded-md p-2 border-black' />
//                             <p className='text-sm'>Homestays</p>
//                         </div>
//                         <div>
//                             <p>38</p>
//                         </div>
//                     </div>
//                     <div className='flex justify-between'>
//                         <div className='flex items-center gap-2'>
//                             <Checkbox className='rounded-md p-2 border-black' />
//                             <p className='text-sm'>Apartments</p>
//                         </div>
//                         <div>
//                             <p>4593</p>
//                         </div>
//                     </div>
//                     <div className='flex justify-between'>
//                         <div className='flex items-center gap-2'>
//                             <Checkbox className='rounded-md p-2 border-black' />
//                             <p className='text-sm'>Villas</p>
//                         </div>
//                         <div>
//                             <p>17</p>
//                         </div>
//                     </div>
//                     <div className='flex justify-between'>
//                         <div className='flex items-center gap-2'>
//                             <Checkbox className='rounded-md p-2 border-black' />
//                             <p className='text-sm'>Boats</p>
//                         </div>
//                         <div>
//                             <p>1</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     <CardTitle className='p-2'>Your budget (per night)</CardTitle>
//                 </div>
//                 <p className='p-2'>₪ {sliderValue} - ₪ {sliderValue} +</p>
//                 <div className='border-b-2 p-2'>
//                     <img src={bargraph} alt="" />
//                     <Slider value={sliderValue} onValueChange={handleSliderChange} max={1000} step={10} min={0} defaultValue={[30, 700]} />
//                 </div>
//                 <div className='border-b-2 p-2 flex flex-col gap-3 '>
//                     <CardTitle>Bedrooms and bathrooms</CardTitle>
//                     <div className=' flex justify-between'>
//                         <p>Bedrooms</p>
//                         <div className='border p-2 flex justify-around items-center w-[50%]'>
//                             <button onClick={minusClick} className='text-2xl'>-</button>
//                             <p>{count}</p>
//                             <button onClick={plusClick} className='text-lg text-blue-600'>+</button>
//                         </div>
//                     </div>

//                 </div>
//             </Card>
//         </div>
//     )
// }

// export default FilterSearchResult
