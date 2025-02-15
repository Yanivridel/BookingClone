import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface SelectOfferProps {
  setOffersRoomSelected: Dispatch<
    SetStateAction<
      {
        roomId: string;
        offerId: string;
        number: number;
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
}: SelectOfferProps) {
  //  select offers checkups -
  //  a. delete if exist and number = 0 // * Done

  //  b. add / update // * Done

  //  c. onchange - adjust the roomAvailableCount // * done
  //  g. disable the unavailable Numbers in the select // todo

  // for available rooms calculations
  const [prevSelect, setPrevSelect] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPickFirstAlert((prev) => (prev = false));

    // for available rooms calculations
    const remainder =
      prevSelect > Number(e.currentTarget?.value)
        ? prevSelect - Number(e.currentTarget?.value)
        : Number(e.currentTarget?.value) - prevSelect;

    // console.log(`remainder ${remainder}`);

    setAvailableRoomsCount((prev) => {
      // if prev bigger than current - add the remainder, else - reduce
      if (prevSelect > Number(e.currentTarget?.value)) {
        return {
          ...prev,
          [roomId]: (prev[roomId] || 0) + remainder,
        };
      } else
        return {
          ...prev,
          [roomId]: (prev[roomId] || 0) - remainder,
        };
    });

    setPrevSelect(Number(e.currentTarget?.value));
    console.log(Number(e.currentTarget?.value));
    console.log(Number(e.target?.value));

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
            number: Number(e.target?.value),
            offerId: e.target.id,
          },
        ];
      } // delete if 0 and exist (current user !== undefined already)
      else if (e.currentTarget?.value === "0") {
        return prev.filter((_, i) => i !== currentOfferIndex);
      }
      //  update existing offer
      else {
        return prev.map((offer) =>
          offer.offerId === offerId
            ? { ...offer, number: +e.currentTarget?.value }
            : offer
        );
      }
    });
  };

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
            i <= prevSelect + availableRoomsCount[roomId]
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
          {isOpen ? i + " " + (offerPrice * i).toFixed() + "₪" : i}
        </option>
      ))}
    </select>
  );
}

export default SelectOffer;
