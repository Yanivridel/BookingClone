// react
import { useEffect, useRef, useState } from "react";

// redux
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// types
import { type IUser } from "@/types/userTypes";
import {
  type BookingInfo,
  type RoomsLeaders,
  type TBookingDetails,
} from "@/types/bookingTypes";

// functions
import { createBooking } from "@/utils/api/bookingApi";

// components
import { Button } from "../ui/button";
import BookingDetails from "./BookingDetails";
import BookingRooms from "./BookingRooms";
import UserCard from "./UserCard";

interface BookingStepTwoProps {
  bookingInfo: BookingInfo;
}

function BookingStepTwo({ bookingInfo }: BookingStepTwoProps) {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as IUser;
  //  use ref

  const fNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneNumberRef = useRef<HTMLInputElement | null>(null);
  const companyNameRef = useRef<HTMLInputElement | null>(null);
  const VATNumberRef = useRef<HTMLInputElement | null>(null);
  // console.log(`currentUser: ${currentUser}`);

  const [selectedCountry, setSelectedCountry] = useState({
    code: "+972",
    label: "🇮🇱 Israel",
  });

  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState({
    code: "+972",
    label: "🇮🇱 Israel",
  });

  const [lName, setLName] = useState<string>(
    currentUser.lName ? currentUser.lName : ""
  );

  const [isForMe, setIsForMe] = useState(true);
  const [isPaperless, setIsPaperless] = useState(false);
  const [shouldUpdateAccount, setShouldUpdateAccount] = useState(false);

  const [roomsLeaders, setRoomsLeaders] = useState<RoomsLeaders>([]);

  // console.log(`booking info:`);
  // console.log(bookingInfo);

  // console.log(window.history.state.usr);

  const bookingSubmit = async () => {
    // ! will send to the DB
    const detailsOfCreateBooking: TBookingDetails = {
      // * from property page
      propertyId: bookingInfo.propertyData._id,
      checkIn: new Date(),
      checkOut: new Date(),
      guests: 0,
      rooms: [
        {
          roomId: "",
          count: 0,
        },
      ],

      // * data from current user
      // ! Done
      userId: currentUser?._id || "",

      // ! Done
      reserver: {
        fName: fNameRef.current?.value || "",
        lName: lName,
        email: emailRef.current?.value || "",
        country: selectedCountry.label.split(" ")[1],
        phoneNumber: phoneNumberRef.current?.value
          ? selectedPhoneCountry.code + phoneNumberRef.current.value
          : "",
      },
      //  *  data from property page
      // ! Done
      is_paperless: isPaperless,
      for_work: {
        company_name: companyNameRef.current?.value || "",
        vat_number: Number(VATNumberRef.current?.value) || 0,
      },

      rooms_details: [
        {
          roomId: "",
          fullName: "",
          email: "",
        },
      ],

      add_to_stay: {
        taxi: false, // default: false
        car_rent: false, // default: false
        shuttle: false, // default: false
      },

      special_req: {
        text: "",
        close_rooms: false, // default: false
      },

      children_beds: [
        {
          room_id: "",
          baby: 0,
          extra: 0,
        },
      ],
    };
    console.log(
      `createBookingDetails (from property page): ${detailsOfCreateBooking}`
    );
    console.log(detailsOfCreateBooking);

    try {
      const res = await createBooking(detailsOfCreateBooking);
      // console.log(res);
    } catch (error) {
      console.log("error from create booking: ");
      console.log(error);
    }
  };

  useEffect(() => {
    // update lName because "currentUser" updated after lName  initialized
    if (currentUser.lName) {
      setLName(currentUser.lName);
    }
  }, [currentUser]);

  return (
    <main>
      {currentUser.email && <UserCard />}
      <BookingDetails
        lName={lName}
        setLName={setLName}
        VATNumberRef={VATNumberRef}
        phoneNumberRef={phoneNumberRef}
        companyNameRef={companyNameRef}
        emailRef={emailRef}
        fNameRef={fNameRef}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        isForMe={isForMe}
        setIsForMe={setIsForMe}
        setIsPaperless={setIsPaperless}
        setShouldUpdateAccount={setShouldUpdateAccount}
        selectedPhoneCountry={selectedPhoneCountry}
        setSelectedPhoneCountry={setSelectedPhoneCountry}
      />
      <BookingRooms
        bookingInfo={bookingInfo}
        roomsLeaders={roomsLeaders}
        setRoomsLeaders={setRoomsLeaders}
      />
      <Button className="text-[16px] py-6 px-9 mt-4" onClick={bookingSubmit}>
        <span className="text-sm me-2">&#9001;</span> השלב הבא: פרטים אחרונים
      </Button>
    </main>
  );
}

export default BookingStepTwo;
