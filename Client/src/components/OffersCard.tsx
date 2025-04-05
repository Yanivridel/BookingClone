import { Card, CardDescription, CardTitle } from "./ui/card"
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils';

interface OffersCardProps {
  title: string;
  desc: string;
  button: string;
  img: string;
  className?: string;
}

function OffersCard({ title, desc, button, img, className}: OffersCardProps) {
  return (
    <Card className={cn('p-2 sm:p-3 flex gap-2 w-full mx-auto', className)}>
    <div className='w-[65%] sm:w-[70%] grid gap-3'>
      <CardTitle className='text-base sm:text-xl font-semibold'>
        {title}
      </CardTitle>
      <CardDescription className='text-xs sm:text-sm'>
        {desc}
      </CardDescription>
      <Badge className='w-fit py-1 px-3 text-[12px] sm:text-sm flex items-center'>
        {button}
      </Badge>
    </div>
    <div className='w-[35%] sm:w-[30%] flex justify-end items-center'>
      <img
        src={img}
        alt={button}
        className='rounded-lg h-[100px] w-[100px] sm:h-[145px] sm:w-[145px]'
      />
    </div>
  </Card>
  )
}

export default OffersCard
