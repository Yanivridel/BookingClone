import { Badge } from "./ui/badge";
import { CardDescription, CardTitle } from "./ui/card";
import { IProperty } from "@/types/propertyTypes";
import { Progress } from "./ui/progress";
import { IReview } from "@/types/reviewTypes";
import { cn } from "@/lib/utils";
import { DownIcon, UpIcon } from "./ui/Icons";

interface GuestReviewsProps {
  propertyData?: IProperty;
  propertyReviews?: IReview[];
}

const getColorByRating = (rating: number) => {
  if (rating <= 7) {
    return "bg-[#d4111e]";
  } else if (rating > 7 && rating < 9) {
    return "bg-[#013b94]";
  } else if (rating >= 9) {
    return "bg-[#008234]";
  }
};

function GuestReviews({ propertyData }: GuestReviewsProps) {
  return (
    <div className="grid gap-5 p-2">
      <div className="flex justify-between gap-2 p-1">
        <div className="flex gap-2 items-center">
          <Badge variant="rating" className="cursor-pointer p-1 m-auto">
            {Math.round(propertyData?.total_rating ?? 0)}
          </Badge>
          <CardTitle>{propertyData?.title}</CardTitle>
        </div>
        <div className="flex items-center gap-3">
          <CardDescription className="text-sm text-gray-500 font-bold">
            {propertyData?.reviews_num} reviews
          </CardDescription>
          <div className="mt-0.5">
            <p className="text-blue-600 text-xs">Read all reviews</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <p className="font-bold">Categories:</p>
        <div className="flex flex-col  sm:flex-row  gap-8 ">
          <div className=" sm:w-1/3 flex flex-col gap-8">
            {/* <div className="min-w-[270px] pr:min-w-[315px] pro:min-w-[270px] pro:flex-grow"> */}
            {propertyData?.rating.cleanliness && (
              <div>
                <div className="flex justify-between text-sm font-medium py-1">
                  <div className="flex gap-[6px]">
                    <h1>Cleanliness</h1>

                    {propertyData?.rating.cleanliness >= 9 && (
                      <UpIcon className="h-3 w-3 fill-[#008234] mt-1"></UpIcon>
                    )}
                    {propertyData?.rating.cleanliness <= 7 && (
                      <DownIcon className="h-3 w-3 fill-[#d4111e] mt-1"></DownIcon>
                    )}
                  </div>
                  <p>{propertyData?.rating.cleanliness}</p>
                </div>
                <Progress
                  value={propertyData?.rating.cleanliness * 10}
                  classNameIndicator={cn(
                    `${getColorByRating(
                      propertyData?.rating.cleanliness
                    )} rounded-full`
                  )}
                  className=" h-[8px]  bg-[#f5f5f5] "
                ></Progress>
              </div>
            )}
            {propertyData?.rating.conform && (
              <div>
                <div className="flex justify-between text-sm font-medium py-1">
                  <div className="flex gap-[6px]">
                    <h1>Conform</h1>

                    {propertyData?.rating.conform >= 9 && (
                      <UpIcon className="h-3 w-3 fill-[#008234] mt-1"></UpIcon>
                    )}
                    {propertyData?.rating.conform <= 7 && (
                      <DownIcon className="h-3 w-3 fill-[#d4111e] mt-1"></DownIcon>
                    )}
                  </div>
                  <p>{propertyData?.rating.conform}</p>
                </div>
                <Progress
                  value={propertyData?.rating.conform * 10}
                  classNameIndicator={cn(
                    `${getColorByRating(
                      propertyData?.rating.conform
                    )} rounded-full`
                  )}
                  className=" h-[8px] bg-[#f5f5f5] "
                ></Progress>
              </div>
            )}
            {propertyData?.rating.facilities && (
              <div>
                <div className="flex justify-between text-sm font-medium py-1">
                  <div className="flex gap-[6px]">
                    <h1>Facilities</h1>

                    {propertyData?.rating.facilities >= 9 && (
                      <UpIcon className="h-3 w-3 fill-[#008234] mt-1"></UpIcon>
                    )}
                    {propertyData?.rating.facilities <= 7 && (
                      <DownIcon className="h-3 w-3 fill-[#d4111e] mt-1"></DownIcon>
                    )}
                  </div>
                  <p>{propertyData?.rating.facilities}</p>
                </div>
                <Progress
                  value={propertyData?.rating.facilities * 10}
                  classNameIndicator={cn(
                    `${getColorByRating(
                      propertyData?.rating.facilities
                    )} rounded-full`
                  )}
                  className=" h-[8px] bg-[#f5f5f5] "
                ></Progress>
              </div>
            )}
          </div>
          <div className="sm:w-1/3 flex flex-col gap-8">
            {/* <div className="min-w-[270px] pr:min-w-[315px] pro:min-w-[270px] pro:flex-grow"> */}
            {propertyData?.rating.free_wifi && (
              <div>
                <div className="flex justify-between text-sm font-medium py-1">
                  <div className="flex gap-[6px]">
                    <h1>Free Wifi</h1>

                    {propertyData?.rating.free_wifi >= 9 && (
                      <UpIcon className="h-3 w-3 fill-[#008234] mt-1"></UpIcon>
                    )}
                    {propertyData?.rating.free_wifi <= 7 && (
                      <DownIcon className="h-3 w-3 fill-[#d4111e] mt-1"></DownIcon>
                    )}
                  </div>
                  <p>{propertyData?.rating.free_wifi}</p>
                </div>

                <Progress
                  value={propertyData?.rating.free_wifi * 10}
                  classNameIndicator={cn(
                    `${getColorByRating(
                      propertyData?.rating.free_wifi
                    )} rounded-full`
                  )}
                  className=" h-[8px] bg-[#f5f5f5] "
                ></Progress>
              </div>
            )}
            {propertyData?.rating.cleanliness && (
              <div>
                <div className="flex justify-between text-sm font-medium py-1">
                  <div className="flex gap-[6px]">
                    <h1>Location</h1>

                    {propertyData?.rating.location >= 9 && (
                      <UpIcon className="h-3 w-3 fill-[#008234] mt-1"></UpIcon>
                    )}
                    {propertyData?.rating.location <= 7 && (
                      <DownIcon className="h-3 w-3 fill-[#d4111e] mt-1"></DownIcon>
                    )}
                  </div>
                  <p>{propertyData?.rating.location}</p>
                </div>
                <Progress
                  value={propertyData?.rating.location * 10}
                  classNameIndicator={cn(
                    `${getColorByRating(
                      propertyData?.rating.location
                    )} rounded-full`
                  )}
                  className=" h-[8px] bg-[#f5f5f5] "
                ></Progress>
              </div>
            )}
          </div>
          <div className="sm:w-1/3 flex flex-col gap-8">
            {/* <div className="min-w-[270px] pr:min-w-[315px] pro:min-w-[270px] pro:flex-grow"> */}
            {propertyData?.rating.staff && (
              <div>
                <div className="flex justify-between text-sm font-medium py-1">
                  <div className="flex gap-[6px]">
                    <h1>Staff</h1>

                    {propertyData?.rating.staff >= 9 && (
                      <UpIcon className="h-3 w-3 fill-[#008234] mt-1"></UpIcon>
                    )}
                    {propertyData?.rating.staff <= 7 && (
                      <DownIcon className="h-3 w-3 fill-[#d4111e] mt-1"></DownIcon>
                    )}
                  </div>
                  <p>{propertyData?.rating.staff}</p>
                </div>
                <Progress
                  value={propertyData?.rating.staff * 10}
                  classNameIndicator={cn(
                    `${getColorByRating(
                      propertyData?.rating.staff
                    )} rounded-full`
                  )}
                  className=" h-[8px] bg-[#f5f5f5] "
                ></Progress>
              </div>
            )}
            {propertyData?.rating.value_for_money && (
              <div>
                <div className="flex justify-between text-sm font-medium py-1">
                  <div className="flex gap-[6px]">
                    <h1>Value for money</h1>

                    {propertyData?.rating.value_for_money >= 9 && (
                      <UpIcon className="h-3 w-3 fill-[#008234] mt-1"></UpIcon>
                    )}
                    {propertyData?.rating.value_for_money <= 7 && (
                      <DownIcon className="h-3 w-3 fill-[#d4111e] mt-1"></DownIcon>
                    )}
                  </div>
                  <p>{propertyData?.rating.value_for_money}</p>
                </div>
                <Progress
                  value={propertyData?.rating.value_for_money * 10}
                  classNameIndicator={cn(
                    `${getColorByRating(
                      propertyData?.rating.value_for_money
                    )} rounded-full`
                  )}
                  className=" h-[8px] bg-[#f5f5f5] "
                ></Progress>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestReviews;
