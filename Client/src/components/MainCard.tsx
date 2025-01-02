import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import Image from '../assets/images/hotel.jpg'
import GeniusImage from '../assets/images/Genius.png'
import  ThumbsUp  from "../assets/images/thumps.png"
interface mainCardProps {
    is_heart?: boolean;
}

const MainCard = ({}: mainCardProps) => {
    return (
            <Card className="flex flex-col w-[300px] h-[400px] sm:w-[300px] sm:h-[300px] rounded-lg overflow-hidden">
                <div className="h-[50%] sm:h-[50%] rounded-t-lg">
                    <img src={Image} alt="Aparthol Stare Miasto" className="w-full h-full object-cover object-center rounded-t-lg" />
                </div>
                <div className="flex flex-col justify-between flex-grow p-1">
                <div className=" p-2 grid gap-2">
                    <div className="flex w-[40%] gap-1">
                        <img src={GeniusImage} alt="" className="h-4 rounded-md" />
                        <img src={ThumbsUp} alt="s" className="h-4" />
                        <CardDescription className="text-xs">Hotel</CardDescription>
                    </div>
                    <CardTitle>Aparthol Stare Miasto</CardTitle>
                    <CardDescription>West Jerusalem, Israel, Jerusalem</CardDescription>
                    <div className=" flex w-[100%] gap-2 items-center">
                        <Badge variant="rating">8.9</Badge>
                        <CardDescription className="text-slate-800">Fabulous</CardDescription>
                        <CardDescription className="text-xs	">3,061 reviews</CardDescription>
                    </div>
                    <Badge variant="deals" className=" w-[120px] ">Limited-time Deal</Badge>
                </div>
                <div  className=" flex flex-row-reverse gap-2 items-center p-2">
                    <CardTitle>₪ 1,033</CardTitle>
                    <CardTitle className="text-red-500 font-normal" ><del>₪ 1,722</del></CardTitle>
                    <CardDescription>2 nights</CardDescription>
                </div>
                </div>
            </Card>
    )
}
export default MainCard