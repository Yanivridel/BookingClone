import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import Image from "../assets/images/hotel.jpg";
import GeniusImage from "../assets/images/Genius.png";
import ThumbsUp from "../assets/images/thumps.png";
import SaveButton from "./SaveButton";
import { useEffect, useState } from "react";
import { IProperty } from "@/types/propertyTypes";
import { getPropertyByIdForCard } from "@/utils/api/propertyApi";
import { getDescByRating, getRandomInt } from "@/utils/functions";
import { useTranslation } from "react-i18next";

interface mainCardProps {
  propertyId: string,
  is_heart?: boolean;
  deals?: string;
  price?: { coin: string; value: string };
  genius?: string;
  isThumbsUp?: boolean;
  type?: string;
  discount?: { coin: string; value: string };
}

const MainCard = ({
  propertyId,
  deals,
  is_heart,
  isThumbsUp,
  price,
  genius,
  type,
  discount,
}: mainCardProps) => {
  const [propertyData, setPropertyData] = useState<IProperty | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if(propertyId)
      getPropertyByIdForCard(propertyId)
    .then(data => {
      setPropertyData(data)
    });
  }, [propertyId])
  

  return (<>
    {propertyData && 
      <Card className="flex flex-col w-[255px] h-[347px] sm:w-[274px] sm:h-[333px] rounded-lg">
      <div className="h-[65%] sm:max-h-none rounded-t-lg relative">
        <img
          src={propertyData.images[0]}
          alt={propertyData.title}
          className="w-full h-full object-cover object-center rounded-t-lg "
        />
        {is_heart && (
          <div className="absolute top-2 end-1">
            <SaveButton id={propertyData._id} />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between flex-grow p-1">
        <div className=" p-2 grid gap-2">
          <div className="flex w-[40%] gap-1">
            {genius && (
              <img src={GeniusImage} alt="" className="h-4 rounded-md" />
            )}
            {isThumbsUp && <img src={ThumbsUp} alt="s" className="h-4" />}
            {type && (
              <CardDescription className="text-xs">{type}</CardDescription>
            )}
          </div>
          <CardTitle>{propertyData.title}</CardTitle>
          <CardDescription>
            {propertyData.location.city + ", "}
            {propertyData.location.country}
          </CardDescription>
          <div className=" flex w-[100%] gap-2 items-center">
            {propertyData.total_rating && <>
              <Badge variant="rating">{propertyData.total_rating.toFixed(1)}</Badge>
              <CardDescription className="text-slate-800">
              {getDescByRating(propertyData.total_rating)}
              </CardDescription>·</>
            }
            <CardDescription className="text-xs	">{propertyData.reviews_num + " " + t("mainCard.reviews")}</CardDescription>
          </div>
          {deals && (
            <Badge variant="deals" className=" w-[120px] ">
              {deals}
            </Badge>
          )}
        </div>
        <div className=" flex flex-row-reverse gap-2 items-center p-2">
          {price && (
            <CardTitle>
              {price.coin} {price.value}{" "}
            </CardTitle>
          )}
          {discount && (
            <CardTitle className="text-red-500 font-normal">
              <del>
                {discount.coin} {discount.value}
              </del>
            </CardTitle>
          )}
          {/* <CardDescription>{getRandomInt(1,4) + " " + t("mainCard.nights")}</CardDescription> */}
        </div>
      </div>
    </Card>
    }</>
  );
};
export default MainCard;
