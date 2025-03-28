import { type IRoom } from "@/types/roomTypes";
import { Groups, IconTwoPersons, IconViFull, SmallIconVi } from "../ui/Icons";
import BookingInput from "./BookingInput";
import { RoomsLeaders } from "@/types/bookingTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface BookingRoomProps {
  roomDetails: IRoom;
  selectedRoomByOffer: {
    roomId: string;
    offerId: string;
    number: number;
  };
  roomsLeaders: RoomsLeaders;
  setRoomsLeaders: Dispatch<SetStateAction<RoomsLeaders>>;
}

function RoomsByOffer({
  roomDetails,
  selectedRoomByOffer,
  roomsLeaders,
  setRoomsLeaders,
}: BookingRoomProps) {
  const offers = roomDetails?.offers || [];

  const offer = offers?.find(
    (offer) => offer._id === selectedRoomByOffer.offerId
  );
  if (!offer) {
    console.error(
      "selectedOffer not match any offer (in BookingRoom component)"
    );
    return;
  }

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    params: [number, string]
  ) => {
    const [index, offerId] = params;
    // 1. find the current room - by index and!! offerId (roomsLeaders come from parent component with several offers so index is not enough )
    const updatedArray = [...roomsLeaders];
    const element = updatedArray.find((item) => {
      return item.index === index && item.offerId === offerId;
    });

    if (!element) return; // no change append

    // 2. change the current name or email to the current value of the input
    if (e.target.name === "fullName") {
      element.fullName = e.target.value;
    } else if (e.target.name === "email") {
      element.email = e.target.value;
    }
    console.log(roomsLeaders);
  };

  useEffect(() => {
    // Initialize the roomsLeaders
    console.log(roomsLeaders);
    if (selectedRoomByOffer?.number && selectedRoomByOffer?.offerId) {
      setRoomsLeaders((prev) => [
        ...prev,
        ...Array.from({ length: selectedRoomByOffer.number }, (_, index) => ({
          index,
          offerId: selectedRoomByOffer.offerId,
        })),
      ]);
    }
  }, []);
  return (
    <div>
      {Array.from({ length: selectedRoomByOffer.number }).map((_, index) => (
        <section
          key={index}
          className="text-[13px] mt-3 border-[1px] border-softGrayBorder gap-3 p-4 rounded-[8px]  "
        >
          <h3 className="font-bold text-xl m-2">{roomDetails.title}</h3>
          {/* cancellation */}
          <div className="text-[13px] text-IconsGreen flex gap-2">
            <span
              className={
                offer.cancellation !== "Free cancellation" ? "w-4" : ""
              }
            >
              {offer.cancellation === "Free cancellation" && (
                <SmallIconVi className="fill-IconsGreen stroke-[20px]" />
              )}
            </span>
            <p>{offer.cancellation}</p>
          </div>
          {/* guests */}
          <div className="flex gap-2   mb-4 border-b-softGrayBorder">
            {offer.group_children || offer.group_children > 0 ? (
              <Groups className="w-4 h-4"></Groups>
            ) : (
              <IconTwoPersons />
            )}
            <p>
              <b className="font-bold">Guests: </b>
              {`${offer.group_adults} adults`}

              {offer.group_children > 0 && (
                <span>{`, ${offer.group_children} children's`}</span>
              )}
            </p>
          </div>
          {/* Genius */}
          {offer.is_genius && (
            <div className="border-y-[1px] py-4 mb-4">
              <h4 className="font-bold text-[14px] mb-4">
                Your Genius benefits
              </h4>
              <div className="flex gap-2">
                <IconViFull className="fill-[#febb02]" />
                <p>10% discount</p>
              </div>
              <div className="flex gap-2">
                <span className="w-4"></span>
                <small className="text-xs text-searchGrayText">
                  You're getting a 10% discount on the price of this option
                  before taxes and fees apply.
                </small>
              </div>
            </div>
          )}

          {/* Guest Details */}
          <div className="flex  gap-2">
            <BookingInput<[number, string]>
              onInputChangeArguments={[index, selectedRoomByOffer.offerId]}
              onInputChangeProps={onInputChange}
              isRequired={false}
              placeholder="First name, last name"
              labelText="Full Guest Name"
              name="fullName"
              type="text"
              labelClassName="font-bold text-[14px]"
              wrapperClassName="w-[100%]"
            />

            <BookingInput<[number, string]>
              onInputChangeArguments={[index, selectedRoomByOffer.offerId]}
              onInputChangeProps={onInputChange}
              isRequired={false}
              placeholder="Email Address"
              labelText="Guest email"
              name="email"
              type="text"
              optional="optional"
              labelClassName="font-bold text-[14px]"
              message="Emails are only used for sending reservation info. No commercial messages – guaranteed."
              wrapperClassName="w-[100%]"
            />
          </div>
        </section>
      ))}
    </div>
  );
}

export default RoomsByOffer;
