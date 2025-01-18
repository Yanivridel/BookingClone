import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Button } from './ui/button'

function PaymentMethods() {
  return (
    <div>
        <div className="grid grid-cols-1 max-w-[1100px]">
      <div className="border-b-2 flex justify-between p-2">
        <div className=" flex flex-col gap-2">
          <h1 className="font-bold text-4xl">Payment methods</h1>
          <p className="text-gray-500">
          Securely add or remove payment methods to make it easier when you book.
          </p>
        </div>
        </div>
        <Accordion type="single" collapsible className="w-full p-4">
        <AccordionItem value="item-1" className="p-4">
        <div className='flex justify-between'>
        <div className='flex flex-col gap-2'>
          <p>Payment cards</p>
          <p className='text-sm text-gray-500'>Pay with new card</p>
        </div>
        <div>
            <AccordionTrigger>
            <Button
                variant="ghost"
                className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
              >
                Add card
              </Button>
            </AccordionTrigger>
        </div>
        </div>
          <AccordionContent className="flex flex-col gap-10">
            <div className=" grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <p>Currency</p>
              <select className="border rounded-lg w-40 border-blue-500 text-blue-600 p-2 font-semibold">
                  <option value="volvo">Card</option>
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

export default PaymentMethods
