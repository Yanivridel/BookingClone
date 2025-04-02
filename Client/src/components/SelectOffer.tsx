import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { TBookingDetailsData } from "@/types/bookingTypes";


interface SelectOfferProps {
  setOffersRoomSelected: Dispatch<
    SetStateAction<
      {
        roomId: string;
        offerId: string;
        count: number;
      }[]
    >
  >;
  overall_count: number;
  offerId: string;
  roomId: string;
  setPickFirstAlert: React.Dispatch<React.SetStateAction<boolean>>;
  availableRoomsCount: Record<string, number>;
  setAvailableRoomsCount: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >;
  offerPrice: number;
  setBookingDetailsData: React.Dispatch<
    React.SetStateAction<TBookingDetailsData>
  >;
  offerDiscount: number;
}
// Todo: add prices to the selects

function SelectOffer({
  offerId,
  setOffersRoomSelected,
  overall_count,
  roomId,
  setPickFirstAlert,
  setAvailableRoomsCount,
  availableRoomsCount,
  offerPrice,
  offerDiscount,
  setBookingDetailsData,
}: SelectOfferProps) {
  const offerDiscountDecimal = offerDiscount / 100;

  //  select offers checkups -
  //  a. delete if exist and number = 0 // * Done

  //  b. add / update // * Done

  //  c. onChange - adjust the roomAvailableCount // * done
  //  g. disable the unavailable Numbers in the select // * done

  // for available rooms calculations
  const [prevSelect, setPrevSelect] = useState({ roomNumber: 0, price: 0 });
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const CURRENT_PRICE = Number(
      e.currentTarget.options[e.currentTarget.selectedIndex].innerHTML.split(
        " "
      )[2]
    );

    setPickFirstAlert(false);

    // for available rooms calculations

    const remainderRoomNumber =
      prevSelect.roomNumber > Number(e.currentTarget?.value)
        ? prevSelect.roomNumber - Number(e.currentTarget?.value)
        : Number(e.currentTarget?.value) - prevSelect.roomNumber;

    //  for totalPrice calculations
    function is_remainderRoomNumber_NaN() {
      console.assert(
        !Number.isNaN(remainderRoomNumber),
        "remainderRoomNumber NaN"
      );
      return remainderRoomNumber;
    }
    console.log(Number.isNaN(remainderRoomNumber));
    is_remainderRoomNumber_NaN();

    const REMAINDER_PRICE = CURRENT_PRICE - prevSelect.price;
    console.log(REMAINDER_PRICE);

    console.log(`remainderRoomNumber ${remainderRoomNumber}`); // ! NaN in some cases

    setAvailableRoomsCount((prev) => {
      // if prev bigger than current - add the remainder, else - reduce
      if (prevSelect.roomNumber > Number(e.currentTarget?.value)) {
        return {
          ...prev,
          [roomId]: (prev[roomId] || 0) + remainderRoomNumber,
        };
      } else
        return {
          ...prev,
          [roomId]: (prev[roomId] || 0) - remainderRoomNumber,
        };
    });

    setBookingDetailsData((prev) => {
      return {
        ...prev,
        totalPrice: prev.totalPrice
          ? prev.totalPrice + REMAINDER_PRICE
          : REMAINDER_PRICE,
        totalPriceWithDiscount: prev.totalPriceWithDiscount
          ? prev.totalPriceWithDiscount +
            Math.floor(REMAINDER_PRICE * (1 - offerDiscountDecimal))
          : Math.floor(REMAINDER_PRICE * (1 - offerDiscountDecimal)),
      };
    });

    setPrevSelect((prev) => {
      return {
        ...prev,
        roomNumber: Number(e.target?.value),
        price: CURRENT_PRICE,
      };
    });
    // console.log(Number(e.target?.value));

    setOffersRoomSelected((prev) => {
      const currentOfferIndex = prev.findIndex(
        (element) => element.offerId === offerId
      );
      // add new offer
      if (currentOfferIndex === -1) {
        return [
          ...prev,
          {
            roomId,
            count: Number(e.target?.value),
            offerId: e.target.id,
          },
        ];
      } // delete if 0 and exist (current user !== undefined already)
      else if (e.target?.value === "0") {
        return prev.filter((_, i) => i !== currentOfferIndex);
      }
      // update existing offer
      else {
        return prev.map((offer) =>
          offer.offerId === offerId
            ? { ...offer, count: Number(e.target?.value) }
            : offer
        );
      }
    });
  };
  // console.log(availableRoomsCount);

  return (
    <select
      onChange={handleChange}
      className="border-[1px] border-black rounded-md text-sm px-2 min-w-12 cursor-pointer"
      id={offerId}
      onFocus={(_) => setIsOpen(true)}
      onBlur={(_) => setIsOpen(false)}
    >
      {[...Array(overall_count + 1)].map((_, i) => (
        <option
          disabled={
            // current select
            i <= prevSelect.roomNumber + availableRoomsCount[roomId]
              ? false
              : // other selects
              i > availableRoomsCount[roomId]
              ? true
              : // not available
                false
          }
          key={i}
          value={i}
        >
          {isOpen ? `${i} (₪ ${(offerPrice * i).toFixed()} )` : i}
        </option>
      ))}
    </select>
  );
}

export default SelectOffer;
