import { IRoom } from "@/types/roomTypes";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils.ts";

import OffersGroups from "./OffersGroups.tsx";
import OffersPayment from "./OffersPayment.tsx";
import React, { useState } from "react";
import RoomTypeDescription from "./RoomTypeDescription.tsx";
import SelectOffer from "./SelectOffer.tsx";
import { SmallIconVi } from "./ui/Icons.tsx";
import MealsOffer from "./MealsOffer.tsx";
import QuestionMarkInfo from "./QuestionMarkInfo.tsx";
import { Button } from "./ui/button.tsx";

const headerRowsNumber = 6;

type PropertyRoomsTableProps = {
  rooms: IRoom[];
  nightsNum: number;
};

function PropertyTable({ rooms, nightsNum }: PropertyRoomsTableProps) {
  const { t } = useTranslation();
  const [offersRoomSelected, setOffersRoomSelected] = useState<
    {
      offerId: string;
      number: number;
    }[]
  >([]);

  return (
    <div className="grid grid-col  min-w-[750px]  grid-cols-[repeat(20,_minmax(0,1fr))]  relative">
      {[...Array(headerRowsNumber)].map((_, i) => (
        <h2
          key={t(`propertyTable.THeader.${i}`)}
          className={cn(
            "border-e-[1px] border-b-[1px] align-text-top text-start  py-2 px-2 border-[#5bbaff] bg-[#4b76b2] text-white text-sm font-bold  sticky top-0 z-10",
            i === 0
              ? "col-span-5"
              : i === 1
              ? "col-span-2"
              : i === 2
              ? "col-span-3 bg-[#013b94]"
              : i === 3
              ? "col-span-4"
              : i === 5
              ? "col-span-4"
              : "col-span-2"
          )}
        >
          {i === 2
            ? t(`propertyTable.THeader.${i}`) +
              ` ${nightsNum} ` +
              t(`propertyTable.THeader.${i + 1}`)
            : i === 3 || i === 4
            ? t(`propertyTable.THeader.${i + 1}`)
            : i === 5
            ? ""
            : t(`propertyTable.THeader.${i}`)}
          {i === 5 && (
            <div
              key={i + "last"}
              className="absolute top-[90px] gr:top-[70px] left-2 right-2 flex flex-col text-black"
            >
              <Button>{t("order.beforeSelectRooms.button")}</Button>

              <div className="py-2 text-sm flex flex-col gap-2">
                <div className="flex gap-3">
                  <span>•</span>
                  <span className="">
                    {t("order.beforeSelectRooms.firstText")}
                  </span>
                </div>
                <div className=" flex gap-3">
                  <span>•</span>
                  <span className="">
                    {t("order.beforeSelectRooms.secondText")}
                  </span>
                </div>
              </div>
            </div>
          )}
        </h2>
      ))}

      {rooms?.map((room) => (
        <>
          {/* room Description */}
          {/* 5 */}
          <div
            key={room._id}
            className={`border-e-[1px] border-b-[3px] border-[#5bbaff] col-span-5 `}
          >
            <RoomTypeDescription room={room} />
          </div>
          {/* 10 */}
          <div
            key={room._id + "grid"}
            className="grid grid-cols-11 col-span-11"
          >
            {room.offers.map((offer) => {
              return (
                <React.Fragment key={offer._id}>
                  {/* offers group */}
                  {/* 2 */}
                  <div
                    key={room._id + offer._id + "groups"}
                    className="border-[1px] border-[#5bbaff] col-span-2"
                  >
                    <OffersGroups
                      group_adults={offer.group_adults}
                      group_children={offer.group_children}
                      ages={offer.ages}
                    />
                  </div>

                  {/* payment */}
                  {/* 3 */}
                  <div
                    key={room._id + offer._id + "payment"}
                    className="border-[1px] border-[#5bbaff] flex flex-col gap-2 col-span-3 p-1"
                  >
                    <OffersPayment
                      discount={offer.discount}
                      price_per_night={offer.price_per_night}
                      nightsNum={nightsNum}
                      is_genius={offer.is_genius}
                    />
                  </div>

                  {/* choices */}
                  {/* 4 */}
                  <div
                    key={room._id + offer._id + "Meals"}
                    className="border-[1px] border-[#5bbaff] flex flex-col col-span-4 text-xs"
                  >
                    <div className="list-outside 	p-4 flex flex-col gap-2 ">
                      {offer.meals && (
                        <div className="flex justify-between">
                          <MealsOffer meals={offer.meals} />
                          <QuestionMarkInfo
                            cancellation={offer.cancellation}
                            meals={offer.meals}
                            prepayment={offer.prepayment.text}
                          />
                        </div>
                      )}

                      {/* cancellation */}
                      <div className=" flex gap-[17px]">
                        <span>•</span>
                        <span className="font-bold">{offer.cancellation}</span>
                      </div>

                      {offer.is_genius && (
                        <div className="text-deals  fill-deals flex gap-2">
                          <SmallIconVi className="h-4 w-4 self-start shrink-0  stroke-deals stroke-5" />
                          <div>
                            <span className="font-bold">
                              {t("offersChoices.guniesDiscountHeader")}
                            </span>{" "}
                            <span>{t("offersChoices.guniesDiscountText")}</span>
                          </div>
                        </div>
                      )}

                      {room.overall_count < 6 && (
                        <div className="flex gap-[17px]">
                          <span>•</span>
                          <div className="text-[#a30100] ">
                            {t("offersChoices.only")}{" "}
                            <span>{room.overall_count}</span>{" "}
                            {t("offersChoices.left")}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* select offer */}
                  {/* 2 */}
                  <div
                    key={room._id + offer._id + "Select"}
                    className="border-[1px] border-[#5bbaff] flex flex-col col-span-2 "
                  >
                    <div className="p-1 flex">
                      <SelectOffer
                        overall_count={room.overall_count}
                        offerId={offer._id}
                        setOffersRoomSelected={setOffersRoomSelected}
                      />
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <div className="border grid col-span-4 border-none relative p-2"></div>
        </>
      ))}
    </div>
  );
}

export default PropertyTable;
