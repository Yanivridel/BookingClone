import React, { useState } from "react";
import { Button } from "./ui/button";
import { t } from "i18next";

interface NavPropertyProps {
  arr: string[];
}

function NavProperty({ arr }: NavPropertyProps) {
  const [activeNavButton, setActiveNavButton] = useState<string>(arr[0]);

  const handleNavButtonClick = (buttonName: string) => {
    setActiveNavButton(buttonName);
  };

  return (
    <div className="flex">
      {arr.map((buttonName) => (
        <Button
          className="flex-grow"
          variant={
            activeNavButton === buttonName
              ? "navBarUnderlineSelected"
              : "navBarUnderline"
          }
          size="navBarUnderline"
          onClick={() => handleNavButtonClick(buttonName)}
          asChild
        >
          <a href={`#${buttonName}`}>{buttonName}</a>
        </Button>
      ))}
    </div>
  );
}

export default NavProperty;
