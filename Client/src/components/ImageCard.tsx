import { Card, CardTitle } from "./ui/card";
import DubaiImage from "../assets/images/Dubai.jpg";
import dubaiLogo from "../assets/images/dubaiLogo.png";

interface ImageCardProps {
  className?: string;
  details: {
    city: string;
    image: string;
    flag: string;
  }
}

function ImageCard({ className, details }: ImageCardProps) {
  return (
    <div className={className}>
      <Card className="rounded-lg overflow-hidden relative group w-full h-full flex-1">
        <div className="relative w-full h-0 pb-[75%]">
          <img
            src={details.image}
            alt={details.city}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <CardTitle className="absolute text-3xl text-[#fff] top-5 left-5 z-10 flex items-center gap-2">
            <p className="drop-shadow-lg">{details.city}</p>
            <img src={details.flag} alt={details.city} className="h-6" />
          </CardTitle>
          <div className="absolute top-0 left-0 w-full h-[50px] bg-gradient-to-b from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </Card>
    </div>
  );
}

export default ImageCard;
