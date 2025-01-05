import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoBedOutline } from "react-icons/io5";
import { IoAirplaneOutline } from "react-icons/io5";
import { PiCarLight } from "react-icons/pi";
import { MdOutlineAttractions } from "react-icons/md";
import { MdOutlineLocalTaxi } from "react-icons/md";

function TopNav() {
  const [activeButton, setActiveButton] = useState<string>("");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName); // עדכון הכפתור הפעיל
  };

  return (
    <div className='border flex p-2 bg-blue-800'>
      <Button
        variant="ghostTopNav"
        className={`font-normal rounded-full p-3 text-white ${activeButton === "domestic" ? "border-2 border-white" : ""}`}
        onClick={() => handleButtonClick("domestic")}
      >
        <IoBedOutline />
        Stays
      </Button>

      <Button
        variant="ghostTopNav"
        className={`font-normal rounded-full p-3 text-white ${activeButton === "international" ? "border-2 border-white" : ""}`}
        onClick={() => handleButtonClick("international")}
      >
        <IoAirplaneOutline />
        Flays
      </Button>

      <Button
        variant="ghostTopNav"
        className={`font-normal rounded-full p-4 text-white ${activeButton === "regions" ? "border-2 border-white bg-white/30" : ""}`}
        onClick={() => handleButtonClick("regions")}
      >
        <PiCarLight />
        Car rentals
      </Button>

      <Button
        variant="ghostTopNav"
        className={`font-normal rounded-full p-3 text-white ${activeButton === "countries" ? "border-2 border-white bg-white/30" : ""}`}
        onClick={() => handleButtonClick("countries")}
      >
        <MdOutlineAttractions />
        Attractions
      </Button>

      <Button
        variant="ghostTopNav"
        className={`font-normal rounded-full p-3 text-white ${activeButton === "countries" ? "border-2 border-white bg-white/30" : ""}`}
        onClick={() => handleButtonClick("countries")}
      >
        <MdOutlineLocalTaxi />
        Airport Taxis
      </Button>
    </div>
  );
}

export default TopNav;

