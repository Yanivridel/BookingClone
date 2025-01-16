import React from 'react'
import { Card } from './ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { IProperty } from '@/types/propertyTypes'

interface FaqComponentProps {
    propertyData? : IProperty
    
}

function FaqComponent({propertyData}: FaqComponentProps )  {
  return (<div>
      <Card className='flex p-3 min-h-7'>
        <div className='w-[30%] border bg-indigo-100'>
            <h1 className='font-bold text-xl p-8 w-[70%]'>FAQs about Aparthotel Stare Miasto</h1>
        </div>
        <div className='w-[70%] border p-2'>
        <Accordion type="single" collapsible className="w-full">
            {propertyData?.fqa.map((Item,index) => (
      <AccordionItem key={index} value={Item.question}>
        <AccordionTrigger>{Item.question}</AccordionTrigger>
        <AccordionContent>
          {Item.answer}
        </AccordionContent>
      </AccordionItem>
      ))}
    </Accordion>
        </div>
      </Card>
    </div>
  )
}

export default FaqComponent
