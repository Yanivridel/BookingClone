import { Card, CardDescription, CardTitle } from "./ui/card";
import { YellowCube } from "./ui/Icons";
import { IProperty } from "@/types/propertyTypes";

interface QualityCardProps {
  propertyData?: IProperty;
}

function QualityCard({ propertyData }: QualityCardProps) {
  if (!propertyData) {
    return <div></div>;
  }

  return (
    <div>
      <Card className=" h-[85px] p-2 flex flex-col gap-3 justify-center">
        <div className=" flex gap-2">
          <CardTitle>Quality rating</CardTitle>
          <div className="flex">
            {propertyData.total_rating &&
              Array(Math.round(propertyData.total_rating / 2))
                .fill(1)
                .map((__, index) => (
                  <YellowCube key={index} className="w-4 h-4 fill-yellow-500" />
                ))}
          </div>
        </div>
        <div className="">
          <CardDescription className="text-xs text-black">
            Booking.com rated the quality of this property as{" "}
            {propertyData.rating.conform} out of 5 based on factors such as
            facilities, size, location and services provided.
          </CardDescription>
        </div>
      </Card>
    </div>
  );
}

export default QualityCard;
