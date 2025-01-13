import React, { useState } from 'react'
import { Card, CardDescription, CardTitle } from './ui/card'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { IProperty } from '@/types/propertyTypes'
import { ArrowRight, Command, Information } from './ui/Icons'
import { Button } from './ui/button'


interface AsksComponentsProps {
  propertyData?: IProperty
}

function AsksComponents({ propertyData }: AsksComponentsProps) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Your question:', question);
  };

  if (!propertyData) {
    return (
      <div></div>
    )
  }


  return (
    <div className='flex items-center justify-between gap-2 '>
      <Card className='w-[300px] h-[330px] p-2 flex flex-col gap-2'>
        <div className='flex flex-col gap-2'>
          {propertyData.fqa.map((item, index) => (
            <div key={index} className='p-2 border-b'>
              <Sheet>
                <SheetTrigger className='flex gap-2'>
                  <div>
                    <Command className='w-5 h-5' />
                  </div>
                  <div>
                    <p className='text-sm'>{item.question}</p>
                  </div>
                  <div className='ml-8'>
                    <ArrowRight className='w-5 h-5' />
                  </div>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Answer</SheetTitle>
                    <SheetDescription>
                      {item.answer}
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          ))}
        </div>
      </Card>

      <Card className='w-[300px] h-[330px] p-2 flex flex-col gap-2'>
        <div className='flex flex-col gap-2'>
          {propertyData.fqa.map((item, index) => (
            <div key={index} className='p-2 border-b'>
              <Sheet>
                <SheetTrigger className='flex gap-2'>
                  <div>
                    <Command className='w-5 h-5' />
                  </div>
                  <div>
                    <p className='text-sm'>{item.question}</p>
                  </div>
                  <div className='ml-8'>
                    <ArrowRight className='w-5 h-5' />
                  </div>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Answer</SheetTitle>
                    <SheetDescription>
                      {item.answer}
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          ))}
        </div>
      </Card>

      <Card className='w-[300px] h-[330px] p-2 grid '>
        <div className=' flex items-end justify-center'>
          <CardTitle className='text-xl'>Still looking?</CardTitle>
        </div>
        <div className='flex items-center justify-center'>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className='border-blue-500 text-blue-500'>Ask a question</Button>
            </SheetTrigger>
            <SheetContent>
                <div className='h-[90%] border-b-2 flex flex-col gap-5'>
                  <div className=''>
                    <p className='text-xl font-bold'>Ask a question</p>
                    <p className='font-bold'>About: <span className='text-sm font-normal	'>{propertyData.title}</span></p>
                  </div>
                  <div className=' flex flex-col gap-5'>
                    <div className=''>
                    <p className='text-sm'><label htmlFor="">Your question</label></p>
                    <form action="add question" className='border'>
                      <textarea onChange={(e) => setQuestion(e.target.value)} value={question} name="" id="" cols={42} rows={5}></textarea>
                    </form>
                    </div>
                    <div className='flex gap-2 '>
                      <div>
                        <Information className='w-4 h-4 mt-0.5' />
                      </div>
                      <div className='text-sm'>
                        <p>If we can't answer your question right away, you can forward it to the property. Please make sure to not include any personal info and <span className='text-blue-500 underline'>follow our guidelines</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-2'>
                  <Button onClick={handleSubmit} className='w-[100%]'>Submit</Button>
                </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className='text-center' >
          <CardDescription>We have an instant answer to most questions</CardDescription>
        </div>
      </Card>
    </div>
  );
}


export default AsksComponents
