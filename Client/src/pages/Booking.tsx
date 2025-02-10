import BookingSteps from "@/components/booking/BookingSteps";
import UserCard from "@/components/booking/UserCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index.ts";
import { IUser } from "@/types/userTypes.ts";
import BookingDetails from "@/components/booking/BookingDetails";
import BookingRooms from "@/components/booking/BookingRooms";
import { createBooking } from "@/utils/api/bookingApi";
import { TBookingDetails } from "@/types/bookingTypes";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

function Booking() {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as IUser;

  const fNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneNumberRef = useRef<HTMLInputElement | null>(null);
  const companyNameRef = useRef<HTMLInputElement | null>(null);
  const VATNumberRef = useRef<HTMLInputElement | null>(null);
  console.log(currentUser);
  const [lName, setLName] = useState<string>(
    currentUser.lName ? currentUser.lName : ""
  );

  const [isForMe, setIsForMe] = useState(true);

  const [selectedCountry, setSelectedCountry] = useState({
    code: "+972",
    label: "🇮🇱 Israel",
  });

  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState({
    code: "+972",
    label: "🇮🇱 Israel",
  });

  const [isPaperless, setIsPaperless] = useState(false);
  const [shouldUpdateAccount, setShouldUpdateAccount] = useState(false);

  const bookingSubmit = async () => {
    const bookingDetails: TBookingDetails = {
      // * from property page
      propertyId: "",
      checkIn: new Date(),
      checkOut: new Date(),
      guests: 0,
      rooms: [
        {
          roomId: "",
          count: 0,
        },
      ],

      // * from current user
      // ! Done
      userId: currentUser?._id || "",

      //  * from booking page
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
    console.log(bookingDetails);

    try {
      const res = await createBooking(bookingDetails);
      console.log(res);
    } catch (error) {
      console.log("error from create booking: ");
      console.log(error);
    }
  };

  // update lName because "currentUser" updated after lName  initialized
  useEffect(() => {
    if (currentUser.lName) {
      setLName(currentUser.lName);
    }
  }, [currentUser]);

  return (
    <div className="px-4">
      <BookingSteps />
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
      <BookingRooms roomName="Standard Double Room" />
      <Button onClick={bookingSubmit}></Button>
    </div>
  );
}

export default Booking;
