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
import { BookingLogo, IconGuest, IconHamburger } from "./ui/Icons";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Languages from "./Languages";

function TopNav() {
  const [activeButton, setActiveButton] = useState<string>("domestic");
  const { i18n } = useTranslation();

  const navigate = useNavigate();
  const changeLanguage = (lng: string) => {
    if (i18n.changeLanguage) {
      i18n.changeLanguage(lng);
    } else {
      console.error("i18n.changeLanguage is not available.");
    }
  };

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
  return (
    <div className="flex-col  bg-[#013b94] px-4 py-2">
      <div className="flex justify-between items-center p-2 ">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <BookingLogo className=" h-5 w-[98px]" />
        </div>

        <div className="flex gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="hover:bg-[#234e9e] p-[13px] rounded-[4px] cursor-pointer">
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

          <button className="hover:bg-[#234e9e] p-[13px] rounded-[4px] cursor-pointer">
            <IconHamburger className="fill-white" />
          </button>
        </div>
        <Languages></Languages>
      </div>

      <div className={cn(" flex  overflow-scroll  ", styles.scrollContainer)}>
        <button
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => changeLanguage("en")}
        >
          English
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => changeLanguage("he")}
        >
          עברית
        </button>

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
          Flays
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
  );
}

export default TopNav;
