import React from 'react'
import { Button } from './ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

function CustomisationPreferences() {
  return (
    <div>
      <div className="grid grid-cols-1 max-w-[1100px]">
      <div className="border-b-2 flex justify-between p-2">
        <div className=" flex flex-col gap-2">
          <h1 className="font-bold text-4xl">Personal details</h1>
          <p className="text-gray-500">
            Update your information and find out how it's used.
          </p>
        </div>
        </div>
        <Accordion type="single" collapsible className="w-full p-4">
        <AccordionItem value="item-1" className="p-4">
        <div className='flex justify-between'>
        <div>
          <p>Currency</p>
          <p className='text-sm'>₪ Israeli new sheqel</p>
        </div>
        <div>
            <AccordionTrigger>
            <Button
                variant="ghost"
                className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
              >
                Edit
              </Button>
            </AccordionTrigger>
        </div>
        </div>
          <AccordionContent className="flex flex-col gap-10">
            <div className=" grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <p>Currency</p>
              <select className="border rounded-lg w-40 border-blue-500 text-blue-600 p-2 font-semibold">
                  <option value="volvo">₪ Israeli new sheqel</option>
                </select>
              </div>
              
            </div>
            <div className=" flex justify-between">
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
              >
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="p-4">
        <div className='flex justify-between'>
        <div>
          <p>Language</p>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 rounded-full border'></div>
            <p>English</p>
          </div>
        </div>
        <div>
            <AccordionTrigger>
            <Button
                variant="ghost"
                className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
              >
                Edit
              </Button>
            </AccordionTrigger>
        </div>
        </div>
          <AccordionContent className="flex flex-col gap-10">
            <div className=" grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <p>Language</p>
              <select className="border rounded-lg w-40 border-blue-500 text-blue-600 p-2 font-semibold">
                  <option value="volvo">English</option>
                </select>
              </div>
            </div>
            <div className=" flex justify-between">
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
              >
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        </Accordion>
        </div>
    </div>
  )
}

export default CustomisationPreferences
