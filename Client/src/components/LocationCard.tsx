import { useState } from "react";
import { Tower, XregularIcon } from "./ui/Icons";
import { IProperty } from "@/types/propertyTypes";

interface LocationCardProps {
  propertyData?: IProperty;
}

function LocationCard({ propertyData }: LocationCardProps) {
  const [isDisplay, setIsDisplay] = useState(true);

  function handleClick() {
    setIsDisplay(false);
  }

  return (
    <div>
      {isDisplay && (
        <div className="flex  border-softGray border-[1px] rounded-[8px] py-3">
          <div className=" w-[10%] flex justify-center">
            <Tower className="w-5 h-5 mt-1.5" />
          </div>
          <div className=" flex-grow">
            <h1 className="font-bold">
              Located in {propertyData?.location.country}{" "}
              {propertyData?.location.city}
            </h1>
            <span className="text-xs">
              {propertyData?.location.addressLine}
            </span>
          </div>
          <div className="basis-8">
            <div className="cursor-pointer" onClick={handleClick}>
              <XregularIcon className="w-4 h-4 mt-1.5" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationCard;
