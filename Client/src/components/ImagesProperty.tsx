import { IProperty } from "@/types/propertyTypes";
import styles from "@/css/search.module.css";
import { Card, CardDescription, CardTitle } from "./ui/card";
import KidsImage from "../assets/images/kids.jpeg";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { IReview } from "@/types/reviewTypes";
import { cn } from "@/lib/utils";

interface ImagePropertyProps {
  propertyData?: IProperty;
  propertyReviews?: IReview[];
}

function ImagesProperty({ propertyData, propertyReviews }: ImagePropertyProps) {
  if (!propertyData) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col search:flex-row  gap-3 ">
      <div className="search:h-[420px]">
        {/* all the images  - flex*/}
        <div className="flex flex-col gap-2  ">
          {/* beeg and medium images */}
          <div className="grid grid-cols-[5fr_2fr] gap-2 ">
            {/* beeg image */}
            <div className="row-span-2">
              {propertyData.images.slice(0, 1).map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt=""
                  className=" object-cover rounded-md"
                />
              ))}
            </div>
            {/* medium 1 */}
            <div>
              {propertyData.images.slice(1, 2).map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt=""
                  className="w-full h-full object-cover rounded-md"
                />
              ))}
            </div>
            {/* medium 2 */}
            <div>
              {propertyData.images.slice(2, 3).map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt=""
                  className="w-full h-full object-cover rounded-md"
                />
              ))}
            </div>
          </div>
          {/* small images */}

          <div
            className={cn(
              "w-full flex flex-nowrap gap-2 overflow-x-scroll",
              styles.scrollContainer
            )}
          >
            {propertyData.images.map((item, index) => (
              <img
                key={index}
                src={item}
                onError={(e) => e.currentTarget.remove()}
                className="h-[103px] w-[134px] rounded-md"
              />
            ))}
          </div>
        </div>
      </div>
      {/* cards */}
      <div className="hidden  gap-2 justify-between search:flex search:flex-col   ">
        <Card className=" search:h-[296px] ">
          <div className=" p-2 border-b-2 flex items-center justify-end">
            <div className="flex gap-1 ">
              <div className="flex flex-col items-end">
                <CardTitle>{propertyData.title}</CardTitle>
                <CardDescription className="text-xs">
                  {propertyData.reviews_num} reviews
                </CardDescription>
              </div>
              <div className="flex gap-1 p-1  ">
                <Badge variant="rating" className="cursor-pointer h-full p-1">
                  {Math.round(propertyData?.total_rating ?? 0)}
                </Badge>
              </div>
            </div>
          </div>
          <div className=" border-b-2 p-4 grid gap-2">
            <div className=" max-h-[10%]">
              <p className="text-xs font-bold">Guests who stayed here loved</p>
            </div>
            <div className=" grid justify-center">
              <div className="w-40 ">
                <p className="text-xs">
                  {propertyReviews && propertyReviews[0]?.reviewText}
                </p>
              </div>
            </div>
            <div className=" flex items-center gap-1 justify-center">
              <Avatar className="w-7 h-7">
                <AvatarImage src={KidsImage}></AvatarImage>
                <AvatarFallback>Cn</AvatarFallback>
              </Avatar>
              <p className="text-xs">Wambui</p>

              <Avatar className="w-7 h-7">
                <AvatarImage src={KidsImage}></AvatarImage>
                <AvatarFallback>Cn</AvatarFallback>
              </Avatar>
              <p className="text-xs">s</p>
            </div>
          </div>
          <div className=" flex items-center justify-between ">
            <div>
              <p className="font-bold">Great location!</p>
            </div>
            <div>
              <Badge variant="outline">
                {Math.round(propertyData?.total_rating ?? 0)}
              </Badge>
            </div>
          </div>
        </Card>
        <Card className="  rounded-lg relative overflow-hidden">
          <img
            src={KidsImage}
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
          <Button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg">
            Show On Map
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default ImagesProperty;
