import { Card, CardDescription, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import GeniusImage from "../assets/images/Genius.png";
import ThumbsUp from "../assets/images/thumps.png";
import SaveButton from "./SaveButton";
import { useEffect, useState } from "react";
import { IProperty } from "@/types/propertyTypes";
import { getPropertyByIdForCard } from "@/utils/api/propertyApi";
import { getDescByRating } from "@/utils/functions";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { modifyUserArrays } from "@/utils/api/userApi";
import { useDispatch } from "react-redux";
import { addInterest } from "@/store/slices/userSlices";
import { Skeleton } from "./ui/skeleton";

interface mainCardProps {
  propertyId: string,
  is_heart?: boolean;
  is_X?: boolean;
  listName?: string;
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
  is_X,
  listName,
  isThumbsUp,
  price,
  genius,
  type,
  discount,
}: mainCardProps) => {
  const [propertyData, setPropertyData] = useState<IProperty | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(propertyId)
      getPropertyByIdForCard(propertyId)
    .then(data => {
      setPropertyData(data)
    });
  }, [propertyId])
  
  const handleCardClick = async () => {
    try {
      navigate(`/property/${propertyId}`)
      const updatedUser = await modifyUserArrays("add", { interested: propertyId})
      dispatch(addInterest(updatedUser.interested))
    } catch(err) {
      console.log("React Client Error: ", err)
    }
  }

  if(!propertyData)
    return SkeletonCard();

  return (
      <Card className="flex flex-col min-w-[274px] 
      min-h-[333px] w-[274px] h-[333px]
      1024:min-w-none 1024-min-h-none rounded-lg cursor-pointer
      shadow-[5px_5px_5px_rgba(0,0,0,0.05)]"
      onClick={handleCardClick}
      >
      <div className="h-[65%] max-h-none rounded-t-lg relative">
        <img
          src={propertyData.images[0]}
          alt={propertyData.title}
          className="w-full h-[220px] object-cover object-center rounded-t-lg "
        />
        {(is_heart || is_X) && (
          <div className="absolute top-2 end-1">
            <SaveButton id={propertyData._id} is_X={is_X} listName={listName}/>
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
  );
};
export default MainCard;

function SkeletonCard() {
  return (
      <Card className="flex flex-col p-4 gap-2
      min-w-[274px] min-h-[333px] w-[274px] h-[333px]
      1024:min-w-none 1024-min-h-none">
      <Skeleton className=" w-full rounded-xl" />
      <Skeleton className="h-4 w-full mb-5" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3 mt-10" />
      <Skeleton className="h-4 w-[40%]" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
    </Card>
  )
}