import { IRoom } from "@/types/roomTypes";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils.ts";

import OffersGroups from "./OffersGroups.tsx";
import OffersPayment from "./OffersPayment.tsx";
import { useEffect, useState } from "react";
import RoomTypeDescription from "./RoomTypeDescription.tsx";
import SelectOffer from "./SelectOffer.tsx";
import { SmallIconVi } from "./ui/Icons.tsx";
import MealsOffer from "./MealsOffer.tsx";
import QuestionMarkInfo from "./QuestionMarkInfo.tsx";

const headerRowsNumber = 5;

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

  useEffect(() => {
    console.log(offersRoomSelected);
  }, [offersRoomSelected]);

  return (
    <div className="grid grid-col grid-cols-[repeat(15,_minmax(0,1fr))]   relative">
      {[...Array(headerRowsNumber)].map((_, i) => (
        <h2
          key={i}
          className={cn(
            "border-e-[1px] border-b-[1px] align-text-top text-start  py-2 border-[#5bbaff] bg-[#4b76b2] text-white text-xs  sticky top-0 z-10",
            i === 0
              ? "col-span-5"
              : i === 1
              ? "col-span-2"
              : i === 2
              ? "col-span-3"
              : i === 3
              ? "col-span-4"
              : "col-span-1"
          )}
        >
          {i === 2
            ? t(`propertyTable.THeader.${i}`) +
              ` ${nightsNum} ` +
              t(`propertyTable.THeader.${i + 1}`)
            : i === 3 || i === 4
            ? t(`propertyTable.THeader.${i + 1}`)
            : t(`propertyTable.THeader.${i}`)}
        </h2>
      ))}

      {rooms?.map((room) => (
        <>
          {/* room Description */}
          <div
            key={room._id}
            className={`border-e-[1px] border-b-[3px] border-[#5bbaff] col-span-5 `}
          >
            <RoomTypeDescription room={room} />
          </div>
          <div className="grid grid-cols-10 col-span-10">
            {room.offers.map((offer) => (
              <>
                {/* offers group */}
                <div className="border-[1px] border-[#5bbaff] col-span-2">
                  <OffersGroups
                    group_adults={offer.group_adults}
                    group_children={offer.group_children}
                    ages={offer.ages}
                  />
                </div>
                {/* payment */}
                <div className="border-[1px] border-[#5bbaff] flex flex-col gap-2 col-span-3 p-1">
                  <OffersPayment
                    discount={offer.discount}
                    price_per_night={offer.price_per_night}
                    nightsNum={nightsNum}
                    is_genius={offer.is_genius}
                  />
                </div>

                {/* choices */}
                <div className="border-[1px] border-[#5bbaff] flex flex-col col-span-4 text-xs">
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

                    {room.overall_count > 6 && (
                      <div className=" flex gap-[17px]">
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
                <div className="border-[1px] border-[#5bbaff] flex flex-col col-span-1 ">
                  <div className="p-1 flex">
                    <SelectOffer
                      overall_count={room.overall_count}
                      offerId={offer._id}
                      setOffersRoomSelected={setOffersRoomSelected}
                    />
                  </div>
                </div>
              </>
            ))}
          </div>
        </>
      ))}
      {/* </div> */}
      {/* <div className="border-e-[1px] border-[#5bbaff]">
            {room.offers.map((offer) => (
              
            ))} */}
      {/* </div> */}
    </div>
  );
}

export default PropertyTable;
