// react
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

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
import { Spinner } from "../ui/Icons";
import axios from "axios";
import { isCreateBookingErrorResponse } from "@/utils/functions";

interface BookingStepTwoProps {
  bookingInfo: BookingInfo;
  setStep: Dispatch<SetStateAction<2 | 3>>;
}

function BookingStepTwo({ setStep, bookingInfo }: BookingStepTwoProps) {
  if (!bookingInfo)
    return (
      <div className="text-redError text-sm">
        "It seems like there are no current bookings available. If you recently
        made a reservation and it doesn’t show up here, try refreshing or
        checking back later. If the issue persists, please contact support."
      </div>
    );

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
  //@ts-ignore
  const [shouldUpdateAccount, setShouldUpdateAccount] = useState(false);

  const [roomsLeaders, setRoomsLeaders] = useState<RoomsLeaders>([]);
  const [bookingSubmitErrorMessage, setBookingSubmitErrorMessage] = useState<
    null | string
  >(null);

  // errors

  const [emailError, setEmailError] = useState("");
  const [fNameError, setFNameError] = useState("");
  const [lNameError, setLNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const [createBookingLoading, setCreateBookingLoading] = useState(false);
  // console.log(`booking info:`);
  // console.log(bookingInfo);

  // console.log(window.history.state.usr);

  const { startDate, endDate, adults, children } =
    bookingInfo.bookingDetailsData;

  // get tomorrow for default value
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const bookingSubmit = async () => {
    //  ! errors - missing or not valid data
    const errors: string[] = [];

    if (!bookingInfo?.propertyData?._id) {
      errors.push("Something went wrong in your order, try to order again!");
    }
    if (!currentUser?._id) {
      errors.push("You're not connected! Connect and then try again.");
    }
    if (fNameError) {
      errors.push(fNameError);
    }
    if (lNameError) {
      errors.push(lName);
    }
    if (emailError) {
      errors.push(emailError);
    }
    if (phoneNumberError) {
      errors.push(phoneNumberError);
    }

    if (!fNameError && !fNameRef?.current?.value) {
      errors.push("First name is required!");
    }
    if (!lNameError && !lName) {
      errors.push("Last name is required!");
    }
    if (!emailError && !emailRef?.current?.value) {
      errors.push("email is required!");
    }
    if (!phoneNumberError && !phoneNumberRef?.current?.value) {
      errors.push("Phone number is required!");
    }

    if (errors.length > 0) {
      setBookingSubmitErrorMessage(errors.join(", \n"));
      return;
    }

    // ! will send to the DB
    const detailsOfCreateBooking: TBookingDetails = {
      // * from property page
      propertyId: bookingInfo.propertyData._id,
      checkIn: startDate || new Date(),
      checkOut: endDate || tomorrow,
      guests: children ? adults + children : adults || 1,
      rooms: bookingInfo.offersRoomSelected,

      // * data from current user
      userId: currentUser?._id || "",

      //  * data from states and refs
      reserver: {
        fName: fNameRef.current?.value || "",
        lName: lName,
        email: emailRef.current?.value || "",
        country: selectedCountry?.label?.split(" ")[1] || "",
        phoneNumber: phoneNumberRef?.current?.value
          ? selectedPhoneCountry?.code + phoneNumberRef.current.value
          : "",
      },

      //  *  data from property page
      // ! Done
      is_paperless: isPaperless,
      for_work: {
        company_name: companyNameRef.current?.value || "",
        vat_number: Number(VATNumberRef.current?.value) || 0,
      },

      rooms_details: roomsLeaders,

      add_to_stay: {
        taxi: false, // default: false
        car_rent: false, // default: false
        shuttle: false, // default: false
      },

      special_req: {
        text: "",
        close_rooms: false, // default: false
      },

      children_beds: undefined,
      //  [
      //   {
      //     room_id: "",
      //     baby: 0,
      //     extra: 0,
      //   },
      // ],
    };

    console.log(detailsOfCreateBooking);

    try {
      //@ts-ignore
      setCreateBookingLoading(true);
      const res = await createBooking(detailsOfCreateBooking);
      setCreateBookingLoading(false);
      console.log("createBooking response: ");
      console.log(res);

      setStep(3);
    } catch (error) {
      // ! errors form DB
      if (!axios.isAxiosError(error)) {
        console.error("not axiosError!");
        setBookingSubmitErrorMessage("unexpected error - try again later!");
        return;
      }

      if (isCreateBookingErrorResponse(error.response?.data)) {
        const { message, roomId, notAvailableDate } = error.response.data;
        // * find the trouble room
        if (bookingInfo.propertyData.rooms instanceof Array) {
          const troubleRoom = bookingInfo.propertyData.rooms.find(
            (room) => room._id === roomId
          );

          // * if room missing
          if (message.includes("Room with ID")) {
            // set error message
            setBookingSubmitErrorMessage(
              troubleRoom
                ? `room ${troubleRoom.title} not found, try again later or choose another room`
                : `one of the rooms not found!, try again later `
            );
          }

          // *  if not enough available for some room
          if (message.includes("Not enough availability for room")) {
            if (notAvailableDate) {
              setBookingSubmitErrorMessage(
                troubleRoom
                  ? `room ${troubleRoom.title} not available any more in ${notAvailableDate}! try another date or room`
                  : `one of the rooms not available any more in ${notAvailableDate}!  try another date or change rooms`
              );
            } else {
              setBookingSubmitErrorMessage(
                troubleRoom
                  ? `room ${troubleRoom.title} not available any more! try another date or room`
                  : `one of the rooms not available any more!  try another date or change rooms`
              );
            }
          }
        }
      }
      console.error("unexpected error");
      setBookingSubmitErrorMessage("unexpected error - try again later!");
      return;
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
        setEmailError={setEmailError}
        setFNameError={setFNameError}
        setLNameError={setLNameError}
        setPhoneNumberError={setPhoneNumberError}
        emailError={emailError}
        fNameError={fNameError}
        lNameError={lNameError}
        phoneNumberError={phoneNumberError}
      />
      <BookingRooms
        bookingInfo={bookingInfo}
        roomsLeaders={roomsLeaders}
        setRoomsLeaders={setRoomsLeaders}
      />

      <Button className="text-[16px] py-6 px-9 mt-4" onClick={bookingSubmit}>
        <span className="text-sm me-2">&#9001;</span> השלב הבא: פרטים אחרונים
      </Button>
      {bookingSubmitErrorMessage && (
        <div className="text-redError text-sm">{bookingSubmitErrorMessage}</div>
      )}

      {createBookingLoading && <Spinner className="mt-2" />}
    </main>
  );
}

export default BookingStepTwo;
