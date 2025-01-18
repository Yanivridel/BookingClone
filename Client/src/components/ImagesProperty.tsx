import { IProperty } from "@/types/propertyTypes";
import styles from "@/css/search.module.css";
import { Card, CardDescription, CardTitle } from "./ui/card";
import KidsImage from "../assets/images/kids.jpeg";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { IReview } from "@/types/reviewTypes";
import { cn } from "@/lib/utils";
import { SampleNextArrow, SamplePrevArrow } from "./ui/carousel-slick";
import MainCarousel from "./MainCarousel";
import ReviewsCard from "./ReviewsCard";
import Slider from "react-slick";
import { getDescByRating } from "@/utils/functions";
import CheckpointMap, { LatLng } from "./CheckpointMap";
import { data } from "react-router-dom";

interface ImagePropertyProps {
  propertyData: IProperty;
  propertyReviews?: IReview[];
  isRtl: boolean;
}

function ImagesProperty({ propertyData, propertyReviews, isRtl }: ImagePropertyProps) {
  if (!propertyData) {
    return <div></div>;
  }

  const settingsReviewsCarousel = {
        infinite: false,
        slidesToScroll: 1,
        prevArrow: <SamplePrevArrow />,
  };

  const coordinates = propertyData.location.coordinates?.coordinates as number[];
  const center = {
    lat: coordinates[0] || 31.9642563,
    lng: coordinates[1] || 34.8043575,
  } as LatLng
  

  return (
    <div className="flex flex-col search:flex-row  gap-3 ">
      <div className="">
        {/* all the images  - flex*/}
        <div className="flex flex-col gap-2  h-full">
          {/* big and medium images */}
          <div className="grid grid-cols-[5fr_2fr] gap-2 h-full">
            {/* big image */}
            <div className="row-span-2">
              {propertyData.images.slice(0, 1).map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt=""
                  className="w-full h-full object-cover rounded-md"
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


      {/* Cards */}
      <div className="hidden gap-2 justify-between search:flex search:flex-col">
        {/* Rating */}
        <Card className=""> {/* search:h-[296px] */}
          <div className=" p-2 border-b-2 flex items-center justify-end">
            <div className="flex gap-2 ">
              <div className="flex flex-col items-end">
                <CardTitle>{getDescByRating(Math.round(propertyData?.total_rating ?? 0))}</CardTitle>
                <CardDescription className="text-xs mt-1">
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

          {/* Reviews Carousel */}
          {propertyReviews?.length && (
          <div className=" border-b-2 p-4 gap-2 max-w-[250px] max-h-[250px]">
            <p className="text-xs font-bold mb-2">Guests who stayed here loved</p>
            {/* Reviews Carousel */}
              <Slider
                key={isRtl ? "rtl" : "ltr"}
                {...{
                  ...settingsReviewsCarousel,
                  slidesToShow: 1,
                  initialSlide: isRtl ? propertyReviews.length - 1 : 0,
                  nextArrow: <SampleNextArrow slidesToShow={1} />,
                }}
              >
                { propertyReviews.map(rev =>
                    <ReviewsCard size={1} className="max-w-[250px] max-h-[115px] mx-1 border-none shadow-none" key={rev._id} review={rev} />
                )}
                </Slider>
          </div>
          )}

          <div className=" flex items-center justify-between p-2">
              <p className="font-bold">Great location!</p>
              <Badge variant="outline">9.6</Badge>
          </div>
        </Card>
        {/* Map */}
        <Card className="h-full rounded-lg relative ">
          <CheckpointMap center={center} markers={[center]} data={{ filteredProperties: [propertyData]}}/>
        </Card>
      </div>
    </div>
  );
}

export default ImagesProperty;


/*
<div className="">
        <div className="flex flex-col gap-2  ">
          <div className="grid grid-cols-[5fr_2fr] gap-2 ">
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
*/