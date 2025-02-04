import { Card, CardTitle } from './ui/card'
import { GeniusLogo, YellowVi } from './ui/Icons'

function GeniusCard() {
  return (
    <div>
      <Card className='w-[315px] h-[210px] p-2'>
        <div className='h-[70%] border-b-2 p-2 grid gap-2'>
            <CardTitle>
                Genius benefits available on select options:
            </CardTitle>
            <div className='flex'>
                <div className=' w-[10%] flex justify-center mt-1'><YellowVi className='fill-yellow-400 '/></div>
                <div className=' w-[90%] '>
                    <p className='text-sm mt-0.5' >10% discount</p>
                    <p className='text-xs w-[90%] text-gray-500'>Applied to the price before taxes and charges</p>
                </div>
            </div>
        </div>
        
        <div className='h-[30%] flex'>
            <div className=' w-[70%] flex items-center text-xs text-gray-500'><p>Booking.com's loyalty programme</p></div>
            <div className=' w-[30%] flex items-center justify-center'><GeniusLogo /></div>
        </div>
      </Card>
    </div>
  )
}

export default GeniusCard
