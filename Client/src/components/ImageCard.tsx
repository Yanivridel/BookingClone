import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import DubaiImage from "../assets/images/Dubai.jpg"
import dubaiLogo from "../assets/images/dubaiLogo.png"
import { Link } from "react-router-dom"

function ImageCard() {
    return (
            <Link to={"/:id"}><Card className="rounded-lg overflow-hidden relative group max-w-[300px] flex-1">
                <div className="relative w-full h-0 pb-[75%]">
                    <img src={DubaiImage} alt="Dubai" className="absolute top-0 left-0 w-full h-full object-cover" />
                    <CardTitle className="absolute text-3xl text-[#fff] top-5 left-5 z-10 flex items-end gap-1">
                        <p className="drop-shadow-lg">Dubai</p>
                        <img src={dubaiLogo} alt="" className="h-6" />
                    </CardTitle>
                    <div className="absolute top-0 left-0 w-full h-[50px] bg-gradient-to-b from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
            </Card>
        </Link>
    )
}

export default ImageCard
