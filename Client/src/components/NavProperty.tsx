import { useState } from "react";
import { Button } from "./ui/button";
import MainCarousel from "./MainCarousel";

interface NavPropertyProps {
  arr: string[];
}

function NavProperty({ arr }: NavPropertyProps) {
  const [activeNavButton, setActiveNavButton] = useState<string>(arr[0]);

  const handleNavButtonClick = (buttonName: string) => {
    setActiveNavButton(buttonName);
  };

  return (
    <MainCarousel className="gap-0 ">
      {arr.map((buttonName) => (
        <Button
          key={buttonName}
          className="flex-grow font-normal"
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
    </MainCarousel>
  );
}

export default NavProperty;
