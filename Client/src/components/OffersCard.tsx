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
      <Card className={cn('p-3 flex gap-2 w-full mx-auto',className)} >
        <div className=' w-full sm:w-[70%] grid'>
            <CardTitle className='text-xl font-bold	'>{title}</CardTitle>
            <CardDescription>{desc}</CardDescription>
            <Badge className='w-[60%] text-sm flex items-center'>{button}</Badge>
        </div>
        <div className='w-fit sm:w-[30%]'>
            <img src={img} alt={button} className='rounded-lg h-[145px]	w-[145px]' />
        </div>
      </Card>
  )
}

export default OffersCard
