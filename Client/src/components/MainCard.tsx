import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import Image from '../assets/images/hotel.jpg'
import GeniusImage from '../assets/images/Genius.png'
import ThumbsUp from "../assets/images/thumps.png"
import { Link } from "react-router-dom"
import { IconHeart } from "./ui/Icons"
import SaveButton from "./SaveButton"
 
interface mainCardProps {
    is_heart?: boolean;
    deals?: string;
    price? : {coin:string,value:string};
    genius? : string;
    isThumbsUp? : boolean;
    type? : string;
    discount? : {coin:string, value:string};

}

const MainCard = ({deals,is_heart,isThumbsUp,price,genius,type,discount }: mainCardProps) => {
    return (
        <Link to="/:id">
            <Card className="flex flex-col w-[300px] h-[400px] sm:w-[300px] sm:h-[300px] rounded-lg overflow-hidden">
                <div className="h-[50%] sm:h-[50%] rounded-t-lg relative">
                    <img src={Image} alt="Aparthol Stare Miasto" className="w-full h-full object-cover object-center rounded-t-lg " />
                    <div className="absolute top-2 start-1"><SaveButton /></div>
                </div>
                <div className="flex flex-col justify-between flex-grow p-1">
                    <div className=" p-2 grid gap-2">
                        <div className="flex w-[40%] gap-1">
                            {genius &&<img src={GeniusImage} alt="" className="h-4 rounded-md" />}
                            {isThumbsUp &&<img src={ThumbsUp} alt="s" className="h-4" />}
                            {type && <CardDescription className="text-xs">{type}</CardDescription>}
                        </div>
                        <CardTitle>Aparthol Stare Miasto</CardTitle>
                        <CardDescription>West Jerusalem, Israel, Jerusalem</CardDescription>
                        <div className=" flex w-[100%] gap-2 items-center">
                            <Badge variant="rating">8.9</Badge>
                            <CardDescription className="text-slate-800">Fabulous</CardDescription>
                            <CardDescription className="text-xs	">3,061 reviews</CardDescription>
                        </div>
                        {deals &&<Badge variant="deals" className=" w-[120px] ">{deals}</Badge>}
                    </div>
                    <div className=" flex flex-row-reverse gap-2 items-center p-2">
                        {price && <CardTitle>{price.coin} {price.value} </CardTitle>}
                        {discount && <CardTitle className="text-red-500 font-normal" ><del>{discount.coin} {discount.value}</del></CardTitle>}
                        <CardDescription>2 nights</CardDescription>
                    </div>
                </div>
            </Card>
        </Link>
    )
}
export default MainCard