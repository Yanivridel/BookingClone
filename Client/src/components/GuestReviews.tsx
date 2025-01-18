import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CardDescription, CardTitle } from "./ui/card";
import { IProperty } from "@/types/propertyTypes";
import { Progress } from "./ui/progress";
import { Plus } from "./ui/Icons";
import { IReview } from "@/types/reviewTypes";
import MainCarousel from "./MainCarousel";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface GuestReviewsProps {
  propertyData?: IProperty;
  propertyReviews?: IReview[];
}

function GuestReviews({ propertyData, propertyReviews }: GuestReviewsProps) {
  const [progressColor, _setProgressColor] = useState("bg-[#013b94]");

  return (
    <div className=" grid gap-5 p-2">
      <div className="flex justify-between">
        <div>
          <p className="text-xl font-bold">Guest Reviews</p>
        </div>
        <div>
          <Button className="text-xs">See availability</Button>
        </div>
      </div>
      <div className="flex gap-2 p-1">
        <div>
          <Badge variant="rating" className="cursor-pointer h-full">
            {Math.round(propertyData?.total_rating ?? 0)}
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <CardTitle>{propertyData?.title}</CardTitle>
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
        <div className="flex justify-around gap-10 flex-wrap">
          {/* <div className="w-1/3"> */}
          <div className="min-w-[270px] pr:min-w-[315px] pro:min-w-[270px] pro:flex-grow">
            {propertyData?.rating.cleanliness && (
              <div>
                <div className="flex justify-between text-sm font-medium py-1">
                  <h1>Cleanliness</h1>
                  <p>{propertyData?.rating.cleanliness}</p>
                </div>
                <Progress
                  value={propertyData?.rating.cleanliness * 10}
                  classNameIndicator={cn(
                    "bg-[#013b94] rounded-full",
                    progressColor
                  )}
                  className=" h-[8px]  bg-[#f5f5f5] "
                ></Progress>
              </div>
            )}
            {propertyData?.rating.conform && (
              <div>
                <div className="flex justify-between text-sm font-medium py-1">
                  <h1>Conform</h1>
                  <p>{propertyData?.rating.conform}</p>
                </div>
                <Progress
                  value={propertyData?.rating.conform * 10}
                  classNameIndicator={cn(
                    "bg-[#013b94] rounded-full",
                    progressColor
                  )}
                  className=" h-[8px] bg-[#f5f5f5] "
                ></Progress>
              </div>
            )}
            {propertyData?.rating.facilities && (
              <div>
                <div className="flex justify-between text-sm font-medium py-1">
                  <h1>facilities</h1>
                  <p>{propertyData?.rating.facilities}</p>
                </div>
                <Progress
                  value={propertyData?.rating.facilities * 10}
                  classNameIndicator={cn(
                    "bg-[#013b94] rounded-full",
                    progressColor
                  )}
                  className=" h-[8px] bg-[#f5f5f5] "
                ></Progress>
              </div>
            )}
          </div>
          {/* <div className="w-1/3"> */}
          <div className="min-w-[270px] pr:min-w-[315px] pro:min-w-[270px] pro:flex-grow">
            {propertyData?.rating.free_wifi && (
              <div>
                <div className="flex justify-between text-sm font-medium py-1">
                  <h1>free_wifi</h1>
                  <p>{propertyData?.rating.free_wifi}</p>
                </div>

                <Progress
                  value={propertyData?.rating.free_wifi * 10}
                  classNameIndicator={cn(
                    "bg-[#013b94] rounded-full",
                    progressColor
                  )}
                  className=" h-[8px] bg-[#f5f5f5] "
                ></Progress>
              </div>
            )}
            {propertyData?.rating.cleanliness && (
              <div>
                <div className="flex justify-between text-sm font-medium py-1">
                  <h1>location</h1>
                  <p>{propertyData?.rating.location}</p>
                </div>
                <Progress
                  value={propertyData?.rating.location * 10}
                  classNameIndicator={cn(
                    "bg-[#013b94] rounded-full",
                    progressColor
                  )}
                  className=" h-[8px] bg-[#f5f5f5] "
                ></Progress>
              </div>
            )}
          </div>
          {/* <div className="w-1/3"> */}
          <div className="min-w-[270px] pr:min-w-[315px] pro:min-w-[270px] pro:flex-grow">
            {propertyData?.rating.staff && (
              <div>
                <div className="flex justify-between text-sm font-medium py-1">
                  <h1>staff</h1>
                  <p>{propertyData?.rating.staff}</p>
                </div>
                <Progress
                  value={propertyData?.rating.staff * 10}
                  classNameIndicator={cn(
                    "bg-[#013b94] rounded-full",
                    progressColor
                  )}
                  className=" h-[8px] bg-[#f5f5f5] "
                ></Progress>
              </div>
            )}
            {propertyData?.rating.value_for_money && (
              <div>
                <div className="flex justify-between text-sm font-medium py-1">
                  <h1>value_for_money</h1>
                  <p>{propertyData?.rating.value_for_money}</p>
                </div>
                <Progress
                  value={propertyData?.rating.value_for_money * 10}
                  classNameIndicator={cn(
                    "bg-[#013b94] rounded-full",
                    progressColor
                  )}
                  className=" h-[8px] bg-[#f5f5f5] "
                ></Progress>
              </div>
            )}
          </div>
        </div>
      </div>
      <MainCarousel>
        <div className="flex flex-col gap-5">
          <h1 className="font-bold">Select topics to read reviews:</h1>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-full flex items-center justify-center gap-2"
            >
              <Plus />
              Location
            </Button>
            <Button
              variant="outline"
              className="rounded-full flex items-center justify-center gap-2"
            >
              <Plus />
              Room
            </Button>
            <Button
              variant="outline"
              className="rounded-full flex items-center justify-center gap-2"
            >
              <Plus />
              Clean
            </Button>
            <Button
              variant="outline"
              className="rounded-full flex items-center justify-center gap-2"
            >
              <Plus />
              Bed
            </Button>
            <Button
              variant="outline"
              className="rounded-full flex items-center justify-center gap-2"
            >
              <Plus />
              Bathroom
            </Button>
          </div>
        </div>
      </MainCarousel>
    </div>
  );
}

export default GuestReviews;
