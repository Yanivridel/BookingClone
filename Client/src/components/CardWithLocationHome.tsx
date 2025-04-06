import { cn } from '@/lib/utils'

interface CardWithLocationHomeProps {
    title : string,
    image: string,
    description?: string,
    className?: string,
    classNameImg?: string,
    onClick?: () => void;
}

function CardWithLocationHome({title,image,description,className, classNameImg, onClick} : CardWithLocationHomeProps) {
  return (
    <div className={cn('flex h-[400px] flex-col gap-2 cursor-pointer', className)}
    onClick={onClick}
    >
      <img src={image} className={cn('w-full h-2/3 object-cover object-center rounded-lg', classNameImg)} alt="" />
      <div className='flex flex-col p-2 h-fit'>
          <h1 className='font-bold  sm:text-xl w-fit'>{title}</h1>
          { description && <span className='text-xs sm:text-sm text-gray-500 w-fit'>{description}</span>}
      </div>
    </div>
  )
}

export default CardWithLocationHome
