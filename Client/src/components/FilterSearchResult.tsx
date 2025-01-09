import { useState } from 'react'
import image from '../assets/images/Dubai.jpg'
import { Card, CardDescription, CardTitle } from './ui/card'
import { Checkbox } from './ui/checkbox'
import bargraph from '../assets/images/bargraph.png'
import { Slider } from './ui/slider'
function FilterSearchResult() {

    const[count,setCount] = useState(0)

    function plusClick() {
        setCount(count +1)
    }
    function minusClick() {
        setCount(count -1)
    }
    return (
        <div className='border max-w-[260px] grid gap-4'>
            <div className='border h-[150px] max-w-[260px] rounded-lg'>
                <img src={image} alt="" className='h-[150px] w-[100%]	' />
            </div>
            <Card className='p-2'>
                <CardTitle className='border-b-2 p-2'>Filter by:</CardTitle>
                <div className='flex flex-col gap-2 border-b-2 p-2 '>
                    <CardTitle className='font-semibold'>Your previous filter</CardTitle>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <Checkbox className='rounded-md p-2 border-black' />
                            <p className='text-sm'>Guest houses</p>
                        </div>
                        <div>
                            <p>74</p>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <Checkbox className='rounded-md p-2 border-black' />
                            <p className='text-sm'>Bed and breakfasts</p>
                        </div>
                        <div>
                            <p>26</p>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <Checkbox className='rounded-md p-2 border-black' />
                            <p className='text-sm'>Holiday homes</p>
                        </div>
                        <div>
                            <p>20</p>
                        </div>
                    </div>

                    <div className='flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <Checkbox className='rounded-md p-2 border-black' />
                            <p className='text-sm'>Homestays</p>
                        </div>
                        <div>
                            <p>38</p>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <Checkbox className='rounded-md p-2 border-black' />
                            <p className='text-sm'>Apartments</p>
                        </div>
                        <div>
                            <p>4593</p>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <Checkbox className='rounded-md p-2 border-black' />
                            <p className='text-sm'>Villas</p>
                        </div>
                        <div>
                            <p>17</p>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <Checkbox className='rounded-md p-2 border-black' />
                            <p className='text-sm'>Boats</p>
                        </div>
                        <div>
                            <p>1</p>
                        </div>
                    </div>
                </div>
                <div>
                    <CardTitle className='p-2'>Your budget (per night)</CardTitle>
                </div>
                <p className='p-2'>₪ {"30"} - ₪ {"700"} +</p>
                <div className='border-b-2 p-2'>
                    <img src={bargraph} alt="" />
                    <Slider />
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
