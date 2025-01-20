import { IProperty, RecommendedData } from "@/types/propertyTypes";
import { IRoom } from "@/types/roomTypes";
import { BlackMen, GeniusLogo, Information } from "./ui/Icons";

import QueenBad from "../assets/images/Screenshot 2025-01-15 at 22.24.04.png";
import BunkBad from "../assets/images/bunk.png";
import SofaBad from "../assets/images/sofa.png";
import TweenSingleBad from "../assets/images/tweenSingle.png";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip.tsx";
import { useTranslation } from "react-i18next";
import { Badge } from "./ui/badge.tsx";
import { Button } from "./ui/button.tsx";

export interface RecommendedCardProps {
  recommendedData: RecommendedData;
  propertyData: IProperty;
}

function RecommendedCard({
  recommendedData,
  propertyData,
}: RecommendedCardProps) {
  const selectedRooms = recommendedData.selectedRooms.map((selectedRoom) => ({
    room: (propertyData.rooms as IRoom[]).find(
      (room) => room._id === selectedRoom.id
    ),
    count: selectedRoom.count,
    available: selectedRoom.available,
  }));
  const adults = recommendedData.adults ?? 1;
  const { t } = useTranslation();
  //   const bedsCount = selectedRooms.map((room) =>
  //     room.room?.rooms.map((innerRoom) => {
  //       Object.entries(innerRoom.beds).reduce(
  //         (acc, [_key, bed]) => (acc += bed),
  //         0
  //       );
  //     })
  //   );
  //   console.log(bedsCount);

  //   console.log(selectedRooms);
  const currentDate = new Date();

  return (
    <div className="shadow-cardShadow rounded-[8px]">
      <div className="border-[1px]  border-softGrayBorder rounded-[8px] pt-3">
        <h2 className="text-xl font-bold border-b-[1px] border-softGrayBorder pb-3 px-4">
          Recommended for {recommendedData.adults}{" "}
          {adults > 1 ? "adults" : "adult"}
          {recommendedData.childrenAges &&
            `, ${recommendedData.childrenAges.split(",").length}  ${
              recommendedData.childrenAges.split(",").length > 1
                ? "children"
                : "child"
            }`}
        </h2>

        {selectedRooms.map((room) => (
          <div className="flex flex-col  foo:flex-row text-[16px] px-1 border-b-[1px] border-cardShadow">
            <div className="basis-[70%] p-4">
              {/* room count */}
              <div className="">
                {room.count} <span className="text-sm self-center">x</span>{" "}
                <span className="underline text-buttonBlue hover:cursor-pointer">
                  {room.room?.title}{" "}
                </span>
              </div>
              {/* pepole count */}
              <div className="flex">
                <span className="me-1 text-sm">Price for:</span>
                {room.room?.offers[0].group_adults &&
                  Array.from(
                    { length: room.room?.offers[0].group_adults },
                    (_, i) => (
                      <div key={i} className="self-center">
                        <BlackMen />
                      </div>
                    )
                  )}

                {room.room?.offers[0].group_children ? (
                  <div className="flex">
                    <span className="text-xs self-center mx-1">+</span>
                    {Array.from(
                      { length: room.room?.offers[0].group_children },
                      (_, i) => (
                        <div key={i} className="self-center">
                          <BlackMen className=" w-3 h-3" />
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* beds */}
              <div>
                <div className="flex text-sm">
                  <span className="me-1 "> Bads:</span>
                  {room.room?.rooms.map((innerRoom) => {
                    return (
                      <div key={innerRoom.room_num}>
                        <div className="flex flex-wrap">
                          {Object.entries(innerRoom.beds).map(
                            ([bedType, count]) =>
                              count > 0 && (
                                <div
                                  className="flex self-center pe-1"
                                  key={bedType}
                                >
                                  <span className="pe-1">
                                    {" "}
                                    {count} {bedType}{" "}
                                    {count === 1 ? "bed" : "beds"}
                                  </span>

                                  {bedType === "double" &&
                                    Array.from({ length: count }).map(
                                      (_, index) => (
                                        <img
                                          key={index}
                                          className="h-4 w-7 self-center"
                                          src={TweenSingleBad}
                                        />
                                      )
                                    )}

                                  {bedType === "bunk" &&
                                    Array.from({ length: count }).map(
                                      (_, index) => (
                                        <img
                                          key={index}
                                          className="h-6 w-6 self-center"
                                          src={BunkBad}
                                        />
                                      )
                                    )}

                                  {bedType === "queen" &&
                                    Array.from({ length: count }).map(
                                      (_, index) => (
                                        <img
                                          key={index}
                                          className="h-5 w-10 self-center"
                                          src={QueenBad}
                                        />
                                      )
                                    )}

                                  {bedType === "single" &&
                                    Array.from({ length: count }).map(
                                      (_, index) => (
                                        <img
                                          key={index}
                                          className="h-4 w-7 self-center"
                                          src={TweenSingleBad}
                                        />
                                      )
                                    )}

                                  {bedType === "sofa" &&
                                    Array.from({ length: count }).map(
                                      (_, index) => (
                                        <img
                                          key={index}
                                          className="self-center h-5 w-8"
                                          src={SofaBad}
                                        />
                                      )
                                    )}
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="basis-[30%] py-4 px-2 border-s-[1px] border-softGrayBorder">
              <span className="text-xs ">
                {recommendedData.adults} {adults > 1 ? "adults" : "adult"}
                {recommendedData.childrenAges &&
                  `, ${recommendedData.childrenAges.split(",").length}  ${
                    recommendedData.childrenAges.split(",").length > 1
                      ? "children"
                      : "child"
                  }`}
              </span>
              <div>
                <div className="flex gap-2">
                  {room.room?.offers[0].discount.percentage &&
                    new Date(room.room?.offers[0].discount.expires) >
                      currentDate && (
                      <del className="text-red-500 text-xs self-center">
                        {Number(room.room?.offers[0].price_per_night).toFixed(
                          2
                        )}
                        <span> ₪</span>{" "}
                      </del>
                    )}

                  {/* paynent + tooltip */}
                  <h2 className="text-xl font-bold flex">
                    {" "}
                    <span className="pe-1"> ₪</span>
                    {(
                      Number(room.room?.offers[0].price_per_night) -
                      Number(room.room?.offers[0].price_per_night) /
                        Number(room.room?.offers[0].discount.percentage)
                    ).toFixed()}
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <span className="ps-[6px] mt-2">
                            <Information className="h-3 w-3" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent
                          align="end"
                          side="bottom"
                          className="bg-white text-black shadow-searchPopupsShadow p-4 flex flex-col gap-2 text-md"
                        >
                          {/* {original price} */}
                          <div className="flex justify-between gap-6 text-sm">
                            <div>
                              <span>₪</span>
                              <span className="ps-1">
                                {room.room?.offers[0].price_per_night}{" "}
                              </span>

                              <span></span>
                            </div>
                            <div>
                              <span>{"₪ "}</span>
                              {Number(
                                room.room?.offers[0].price_per_night
                              ).toFixed(2)}
                            </div>
                          </div>
                          {/* discount amount */}
                          <div className="flex justify-between gap-6 text-sm">
                            <span> Booking.com {t("OffersDiscount.pay")} </span>
                            <div>
                              <span>- </span> <span>{"  ₪ "}</span>
                              {(
                                Number(room.room?.offers[0].price_per_night) /
                                Number(room.room?.offers[0].discount.percentage)
                              ).toFixed(2)}
                            </div>
                          </div>

                          <div className="flex justify-between gap-6 text-xs text-searchGrayText">
                            {t("OffersDiscount.BookingDiscountExplenation")}
                          </div>
                          <hr className="my-2" />
                          {/* after discount */}
                          <div className="flex justify-between gap-6 text-sm font-bold ">
                            <span> {t("OffersDiscount.total")} </span>
                            <div>
                              <span>- </span> <span>{"  ₪ "}</span>
                              {(
                                Number(room.room?.offers[0].price_per_night) -
                                Number(room.room?.offers[0].price_per_night) /
                                  Number(
                                    room.room?.offers[0].discount.percentage
                                  )
                              ).toFixed(2)}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </h2>
                </div>
                <span className="text-xs text-searchGrayText">
                  Includes taxes and fees
                </span>
                {room.room?.offers[0].is_genius && (
                  <div className="py-3">
                    <Badge variant={"gunies"}>
                      <GeniusLogo className="h-5 w-10 fill-white " />
                    </Badge>
                  </div>
                )}
              </div>
              <Button className="w-full flex-grow py-6 text-lg">Reserve</Button>
              <p className="text-xs text-[#838383] mt-2 ">
                Don't worry – clicking this button won't charge you anything!
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedCard;
