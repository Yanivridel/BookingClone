// react
import React, { useEffect, useState } from "react";

// translation
import { useTranslation } from "react-i18next";

// lib
import { cn } from "@/lib/utils.ts";

// components
import RoomTypeDescription from "./RoomTypeDescription.tsx";
import OffersGroups from "./OffersGroups.tsx";
import OffersPayment from "./OffersPayment.tsx";
import SelectOffer from "./SelectOffer.tsx";
import MealsOffer from "./MealsOffer.tsx";
import QuestionMarkInfo from "./QuestionMarkInfo.tsx";
import TableBookingDetails from "./TableBookingDetails.tsx";

// icons
import { SmallIconVi } from "./ui/Icons.tsx";

// types
import { IProperty } from "@/types/propertyTypes.ts";
import { IRoom } from "@/types/roomTypes";

// router dom
import { useNavigate } from "react-router-dom";

const headerRowsNumber = 6;

type PropertyRoomsTableProps = {
  propertyData: IProperty;

  nightsNum: number;
};

function PropertyTable({ nightsNum, propertyData }: PropertyRoomsTableProps) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [offersRoomSelected, setOffersRoomSelected] = useState<
    {
      roomId: string;
      offerId: string;
      number: number;
    }[]
  >([]);

  const rooms: IRoom[] | string = propertyData.rooms;
  if (typeof rooms !== "object") return;

  // states
  const [bookingDetailsData, setBookingDetailsData] = useState<{
    totalPrice?: number;
    roomsNumber?: number;
  }>({});

  const [availableRoomsCount, setAvailableRoomsCount] = useState({});

  const [pickFirstAlert, setPickFirstAlert] = useState(false);

  const roomsNumber =
    offersRoomSelected?.reduce((acc, offer) => {
      return acc + offer.number;
    }, 0) || 0;
  // console.log(`roomsNumber ${roomsNumber}`);

  // will send to booking page
  const bookingInfo = { offersRoomSelected, propertyData, bookingDetailsData };

  // console.log(bookingInfo);

  const handleBooking = () => {
    if (bookingInfo.offersRoomSelected.length === 0) {
      // not selected offers
      setPickFirstAlert(true);
      console.log("select room first");
    } else {
      navigate("/account/booking", { state: bookingInfo });
    }
  };

  useEffect(() => {
    setBookingDetailsData((prev) => {
      return { ...prev, roomsNumber };
    });
  }, [bookingInfo.offersRoomSelected]);

  console.log(offersRoomSelected);
  console.log(availableRoomsCount);
  // console.log(bookingDetailsData);
  // console.log(offersRoomSelected);

  return (
    <div className="grid grid-col min-w-[750px] grid-cols-[repeat(20,_minmax(0,1fr))] relative">
      {/* header + booking button */}
      {[...Array(headerRowsNumber)].map((_, i) => (
        <h2
          key={t(`propertyTable.THeader.${i}`)}
          className={cn(
            "border-e-[1px] border-b-[1px] align-text-top text-start  py-2 px-2 border-[#5bbaff] bg-[#4b76b2] text-white text-sm font-bold sticky tab:sticky top-0 z-10",
            i === 0
              ? "col-span-5   tab:left-auto"
              : i === 1
              ? "col-span-2  tab:left-auto"
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
            // booking details column
            <div
              key={i + "last"}
              className={cn(
                "absolute top-[90px] gr:top-[70px] left-2 right-2 flex flex-col text-black"
              )}
            >
              {/* booking button */}

              <TableBookingDetails
                handleBooking={handleBooking}
                bookingDetailsData={bookingDetailsData}
              />
            </div>
          )}
        </h2>
      ))}

      {rooms?.map((room) => {
        if (!(room._id in availableRoomsCount)) {
          setAvailableRoomsCount((prev) => {
            return { ...prev, [room._id]: room.overall_count };
          });
        }
        return (
          <React.Fragment key={room._id}>
            {/* room Description */}
            {/* 5 */}
            <div
              className={`border-e-[1px] border-b-[3px] border-[#5bbaff] col-span-5 `}
            >
              <RoomTypeDescription room={room} />
            </div>
            {/* 10 */}
            <div className="grid grid-cols-11 col-span-11">
              {room.offers.map((offer, i) => {
                return (
                  <React.Fragment key={offer._id + room._id + "-" + i}>
                    {/* offers group */}
                    {/* 2 */}
                    <div className="border-[1px] border-[#5bbaff] col-span-2">
                      <OffersGroups
                        group_adults={offer.group_adults}
                        group_children={offer.group_children}
                        ages={offer.ages}
                      />
                    </div>

                    {/* payment */}
                    {/* 3 */}
                    <div className="border-[1px] border-[#5bbaff] flex flex-col gap-2 col-span-3 p-1">
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
                      // key={room._id + offer._id + "Meals"}
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
                          <span className="font-bold">
                            {offer.cancellation}
                          </span>
                        </div>

                        {offer.is_genius && (
                          <div className="text-deals  fill-deals flex gap-2">
                            <SmallIconVi className="h-4 w-4 self-start shrink-0  stroke-deals stroke-5" />
                            <div>
                              <span className="font-bold">
                                {t("offersChoices.geniusDiscountHeader")}
                              </span>{" "}
                              <span>
                                {t("offersChoices.geniusDiscountText")}
                              </span>
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
                      className={cn(
                        "border-[1px] border-[#5bbaff] flex flex-col col-span-2 ",
                        pickFirstAlert && "bg-[#ffebeb]"
                      )}
                      id={`${offer._id}SelectContainer`}
                    >
                      <div className={"p-1 flex"}>
                        <SelectOffer
                          roomId={room._id}
                          overall_count={room.overall_count}
                          offerId={offer._id}
                          setOffersRoomSelected={setOffersRoomSelected}
                          setPickFirstAlert={setPickFirstAlert}
                          availableRoomsCount={availableRoomsCount}
                          setAvailableRoomsCount={setAvailableRoomsCount}
                          offerPrice={
                            offer.price_per_night -
                            offer.price_per_night *
                              (offer.discount.percentage / 100)
                          }
                          setBookingDetailsData={setBookingDetailsData}
                          offerDiscount={Number(offer.discount.percentage)}
                        />
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
            <div
              className={cn(
                "border grid col-span-4 border-none relative p-2",
                bookingDetailsData.roomsNumber &&
                  bookingDetailsData?.roomsNumber > 0 &&
                  "bg-[#eaf3ff]"
              )}
            ></div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default PropertyTable;
