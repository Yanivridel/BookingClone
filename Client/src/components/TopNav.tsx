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

function TopNav() {
  const [activeButton, setActiveButton] = useState<string>("");
  const { i18n } = useTranslation();

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
    <div
      className={cn(
        " flex  overflow-scroll border p-2 bg-blue-800",
        styles.scrollContainer
      )}
    >
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
        className={`font-normal rounded-full p-3 text-white ${
          activeButton === "domestic" ? "border-2 border-white" : ""
        }`}
        onClick={() => handleButtonClick("domestic")}
      >
        <IoBedOutline />
        Stays
      </Button>

      <Button
        variant="ghostTopNav"
        className={`font-normal rounded-full p-3 text-white ${
          activeButton === "international" ? "border-2 border-white" : ""
        }`}
        onClick={() => handleButtonClick("international")}
      >
        <IoAirplaneOutline />
        Flays
      </Button>

      <Button
        variant="ghostTopNav"
        className={`font-normal rounded-full p-4 text-white ${
          activeButton === "regions" ? "border-2 border-white bg-white/30" : ""
        }`}
        onClick={() => handleButtonClick("regions")}
      >
        <PiCarLight />
        Car rentals
      </Button>

      <Button
        variant="ghostTopNav"
        className={`font-normal rounded-full p-3 text-white ${
          activeButton === "countries"
            ? "border-2 border-white bg-white/30"
            : ""
        }`}
        onClick={() => handleButtonClick("countries")}
      >
        <MdOutlineAttractions />
        Attractions
      </Button>

      <Button
        variant="ghostTopNav"
        className={`font-normal rounded-full p-3 text-white ${
          activeButton === "countries"
            ? "border-2 border-white bg-white/30"
            : ""
        }`}
        onClick={() => handleButtonClick("countries")}
      >
        <MdOutlineLocalTaxi />
        Airport Taxis
      </Button>
    </div>
  );
}

export default TopNav;
