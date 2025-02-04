import { Accordion, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Button } from './ui/button'

function PrivecyAndManagment() {
  return (
    <div>
      <div className="grid grid-cols-1 max-w-[1100px]">
      <div className="border-b-2 flex justify-between p-2">
        <div className=" flex flex-col gap-2">
          <h1 className="font-bold text-4xl">Privacy and data management</h1>
          <p className="text-gray-500">
          Exercise your privacy rights, control your data or export your information.
          </p>
        </div>
        </div>
        <Accordion type="single" collapsible className="w-full p-4">
        <AccordionItem value="item-1" className="p-4">
        <div className='flex justify-between'>
        <div className='flex flex-col gap-2'>
          <p>Privacy settings</p>
          <p className='text-sm'>talkal153@gmail.com</p>
          <p className='text-sm text-gray-500'>Select ‘Manage’ to change your privacy settings and exercise your rights using our request form.</p>
        </div>
        <div>
            <AccordionTrigger>
            <Button
                variant="ghost"
                className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
              >
                Manage
              </Button>
            </AccordionTrigger>
        </div>
        </div>      
        </AccordionItem>
        </Accordion>
        </div>
    </div>
  )
}

export default PrivecyAndManagment
