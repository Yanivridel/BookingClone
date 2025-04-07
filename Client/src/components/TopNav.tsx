import styles from "@/css/search.module.css";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { IoBedOutline } from "react-icons/io5";
import { IoAirplaneOutline } from "react-icons/io5";
import { PiCarLight } from "react-icons/pi";
import { MdOutlineAttractions } from "react-icons/md";
import { MdOutlineLocalTaxi } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import {
  BookingLogo,
  BookingTripsIcon,
  GeniusLoyaltyIcon,
  IconGuest,
  MyAccountIcon,
  ReviewsIcon,
  RewardsWalletIcon,
  SavedIcon,
  SignoutIcon,
} from "./ui/Icons";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Languages from "./Languages";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { IUser } from "@/types/userTypes";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useDispatch } from "react-redux";
import { unsetUser } from "@/store/slices/userSlices";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getInitials } from "@/utils/functions";

function TopNav() {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as IUser;
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState<string>("domestic");
  const { i18n } = useTranslation();

  const navigate = useNavigate();

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  useEffect(() => {
    const html = document.documentElement;
    if (i18n.language === "he") {
      html.setAttribute("dir", "rtl");
    } else {
      html.setAttribute("dir", "ltr");
    }
  }, [i18n.language]);

  const handleSignOut = () => {
    navigate("/");
    dispatch(unsetUser());
  };
  const initials = getInitials(
    `${currentUser.fName || ""} ${currentUser.lName || ""}`.trim()
  );

  return (
    <div className="flex-col  bg-[#013b94] px-4 py-2">
      <div className="max-w-[1100px] m-auto">
        <div className="flex flex-wrap justify-between items-center p-2 ">
          <div className="flex flex-row justify-between items-center flex-1 sm:w-none">
            <div className="p-2 cursor-pointer" onClick={() => navigate("/")}>
              <BookingLogo className=" h-5 w-[98px]" />
            </div>
            <div className="p-[13px] cursor-pointer">
              <Languages />
            </div>
          </div>

          <div className="flex gap-4 items-center mx-auto sm:mx-0">
            {currentUser._id ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="avatar" className="flex gap-4 py-6 ">
                    <Avatar className="w-8 h-8 border-2 border-[#f8b830] pointer-events-none ">
                      <AvatarImage
                        src={
                          currentUser.user_image
                            ? currentUser.user_image
                            : undefined
                        }
                        alt="user"
                        loading="lazy"
                      />
                      <AvatarFallback className="text-white w-full h-full flex items-center justify-center">
                        {initials || "u"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <h2 className="text-white">
                        {currentUser.fName || currentUser.lName
                          ? currentUser.fName + " " + currentUser.lName
                          : "Account & Info"}
                      </h2>
                      <p className="text-[#f8b830]">
                        Genius Level {currentUser.geniusLevel}
                      </p>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-4 w-56 shadow-md rounded-lg bg-white">
                  <ul className="space-y-2 text-sm text-gray-800">
                    <li
                      className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded cursor-pointer"
                      onClick={() => navigate("/account/MyAccountPage")}
                    >
                      <MyAccountIcon className="h-5 w-5" />
                      My account
                    </li>
                    <li className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded cursor-pointer"
                      onClick={() => navigate("/account/TripsAndOrders")}
                    >
                      <BookingTripsIcon className="h-5 w-5" />
                      Bookings & Trips
                    </li>
                    <li className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded cursor-pointer">
                      <GeniusLoyaltyIcon className="h-5 w-5" />
                      Genius loyalty program
                    </li>
                    <li className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded cursor-pointer">
                      <RewardsWalletIcon className="h-5 w-5" />
                      Rewards & Wallet
                    </li>
                    <li className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded cursor-pointer">
                      <ReviewsIcon className="h-5 w-5" />
                      Reviews
                    </li>
                    <li
                      className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded cursor-pointer"
                      onClick={() => navigate("/account/saved-lists/select")}
                    >
                      <SavedIcon className="h-5 w-5" />
                      Saved
                    </li>
                    <li
                      className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded cursor-pointer text-red-500"
                      onClick={handleSignOut}
                    >
                      <SignoutIcon className="h-5 w-5" />
                      Sign out
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="hover:bg-[#234e9e] p-[13px] rounded-[4px] cursor-pointer"
                      onClick={() => navigate("/account/sign-in")}
                    >
                      <div className="relative ">
                        <div className="absolute bg-[#d4111e] h-2 w-2 rounded-full border top-0 end-0"></div>
                        <IconGuest className="h-6 w-6 fill-white" />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-sm">
                    <p>Sign in</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        <div className={cn(" flex  overflow-scroll  ", styles.scrollContainer)}>
          {/* <button
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded fixed left-1 bottom-2 z-50"
            onClick={() => changeLanguage("en")}
          >
            English
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded fixed bottom-2 left-28 z-50"
            onClick={() => changeLanguage("he")}
          >
            עברית
          </button> */}

          <Button
            variant="ghostTopNav"
            className={`font-normal rounded-full py-5 text-white ${
              activeButton === "domestic"
                ? "border border-white bg-hoverBgSoftBlue"
                : ""
            }`}
            onClick={() => handleButtonClick("domestic")}
          >
            <IoBedOutline />
            Stays
          </Button>

          <Button
            variant="ghostTopNav"
            className={`font-normal rounded-full py-5 text-white ${
              activeButton === "international"
                ? "border border-white bg-hoverBgSoftBlue"
                : ""
            }`}
            onClick={() => handleButtonClick("international")}
          >
            <IoAirplaneOutline />
            Flights
          </Button>

          <Button
            variant="ghostTopNav"
            className={`font-normal rounded-full py-5 text-white ${
              activeButton === "regions"
                ? "border border-white bg-hoverBgSoftBlue bg-white/30"
                : ""
            }`}
            onClick={() => handleButtonClick("regions")}
          >
            <PiCarLight />
            Car rentals
          </Button>

          <Button
            variant="ghostTopNav"
            className={`font-normal rounded-full py-5 text-white ${
              activeButton === "countries"
                ? "border border-white bg-hoverBgSoftBlue bg-white/30"
                : ""
            }`}
            onClick={() => handleButtonClick("countries")}
          >
            <MdOutlineAttractions />
            Attractions
          </Button>

          <Button
            variant="ghostTopNav"
            className={`font-normal rounded-full py-5 text-white ${
              activeButton === "airportTaxis"
                ? "border border-white bg-hoverBgSoftBlue bg-white/30"
                : ""
            }`}
            onClick={() => handleButtonClick("airportTaxis")}
          >
            <MdOutlineLocalTaxi />
            Airport Taxis
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
