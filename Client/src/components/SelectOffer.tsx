import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface SelectOfferProps {
  setOffersRoomSelected: Dispatch<
    SetStateAction<
      {
        offerId: string;
        number: number;
      }[]
    >
  >;
  overall_count: number;
  offerId: string;
}

function SelectOffer({
  offerId,
  setOffersRoomSelected,
  overall_count,
}: SelectOfferProps) {
  const [value, setValue] = useState<number>(0);
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(Number(e.currentTarget.value));
    setOffersRoomSelected((prev) => {
      const currentOffer = prev.find((element) => element.offerId === offerId);
      if (currentOffer === undefined) {
        return [
          ...prev,
          {
            number: Number(e.currentTarget.value),
            offerId: e.target.id,
          },
        ];
      } else {
        return prev.map((offer) =>
          offer.offerId === offerId
            ? { ...offer, number: +e.currentTarget.value }
            : offer
        );
      }
    });
  };

  return (
    <select
      onChange={handleChange}
      className="border-[1px] border-black rounded-md text-sm px-2 min-w-12 bg-inherit cursor-pointer"
      value={value}
      id={offerId}
    >
      {[...Array(overall_count + 1)].map((_, i) => (
        <option key={i} value={i}>
          {i}
        </option>
      ))}
    </select>
  );
}

export default SelectOffer;
