import { Card, CardTitle } from "./ui/card";

interface ImageCardProps {
  className?: string;
  details: {
    city: string;
    image: string;
    flag: string;
  }
  onClick?: () => void;
}

function ImageCard({ className, details, onClick }: ImageCardProps) {
  return (
    <div className={className}>
      <Card className="rounded-lg overflow-hidden relative group w-full h-full flex-1 cursor-pointer" onClick={onClick}>
        <div className="relative w-full h-0 pb-[75%]">
          <img
            src={details.image}
            alt={details.city}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <CardTitle className="absolute text-3xl text-[#fff] top-1 sm:top-5 left-5 z-10 flex items-center gap-2">
            <p className="drop-shadow-lg text-sm sm:text-lg">{details.city}</p>
            <img src={details.flag} alt={details.city} className="h-3 sm:h-6" />
          </CardTitle>
          <div className="absolute top-0 left-0 w-full h-[50px] bg-gradient-to-b from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </Card>
    </div>
  );
}

export default ImageCard;
