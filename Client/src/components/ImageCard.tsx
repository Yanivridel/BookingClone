import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import DubaiImage from "../assets/images/Dubai.jpg"

function ImageCard() {
  return (
    <div>
      <Card className="flex-col w-[300px] h-[400px] sm:w-[300px] sm:h-[300px] rounded-lg overflow-hidden relative hover:shadow-lg hover:shadow-black/20 transition-shadow duration-300">
      <div className="absolute inset-0 bg-black/20"></div>
        <CardTitle className="absolute text-3xl text-neutral-50	 top-16 left-5 font-semibold">Dubai</CardTitle>
        <img src={DubaiImage} alt="" className="h-full" />
      </Card>
    </div>
  )
}

export default ImageCard
