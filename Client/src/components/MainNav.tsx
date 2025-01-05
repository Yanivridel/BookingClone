import React, { useState } from "react";
import { Button } from "@/components/ui/button";

function MainNav() {
  const [activeButton, setActiveButton] = useState<string>("");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName); // עדכון הכפתור הפעיל
  };

  return (
    <div className="border flex p-2">
      <Button
        variant="ghost"
        className={`font-normal rounded-full p-2 ${
          activeButton === "domestic" ? "border-2 border-sky-600 text-sky-600 bg-accent" : ""
        }`}
        onClick={() => handleButtonClick("domestic")}
      >
        Domestic cities
      </Button>
      <Button variant="ghost" className={`font-normal rounded-full p-2 ${ activeButton === "international" ? "border-2 border-sky-600 text-sky-600 bg-accent" : ""}`}
        onClick={() => handleButtonClick("international")}
      >
        International cities
      </Button>
      <Button
        variant="ghost"
        className={`font-normal rounded-full p-2 ${
          activeButton === "regions" ? "border-2 border-sky-600 text-sky-600 bg-accent" : ""
        }`}
        onClick={() => handleButtonClick("regions")}
      >
        Regions
      </Button>
      <Button
        variant="ghost"
        className={`font-normal rounded-full p-2 ${
          activeButton === "countries" ? "border-2 border-sky-600 text-sky-600 bg-accent" : ""
        }`}
        onClick={() => handleButtonClick("countries")}
      >
        Countries
      </Button>
    </div>
  );
}

export default MainNav;
