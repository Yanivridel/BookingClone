import React, { useEffect, useState } from "react";
import IconHeartRed, { IconHeart, Spinner } from "./ui/Icons";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./ui/tooltip"; // ייבוא רכיבי הטולטיפ
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./ui/collapsible";

function SaveButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState("");
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  function clickButton() {
    if (value) {
      setParagraphs([...paragraphs, value]);

      setValue("");

    }
  }

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  function handleClick() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLike((prevIsLike) => !prevIsLike);
    }, 800);
  }

  useEffect(() => {
    if (!isLoading) setOpen(true);
    else {
      setOpen(false);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col items-center">
      <TooltipProvider>
        <Popover open={open} onOpenChange={setOpen}>
          <Tooltip>
            <PopoverContent dir="rtl" className="rounded-lg" sideOffset={45}>
              {isLike && !isLoading && (
                <div>
                  <p>נשמר ב: הטיול הבא שלי</p>
                  <hr />
                  <Collapsible>
                    <CollapsibleTrigger>more</CollapsibleTrigger>
                    <CollapsibleContent>
                      {paragraphs.map((paragraph, index) => (
                        <p key={index}>
                          <input type="radio" id="myRadio" className="my-2	" />
                          {paragraph}
                        </p>
                      ))}
                      <label>
                        <div className="flex gap-1">
                          <input type="radio" id="myRadio" className="my-2	" />
                          <p>הטיול הבא שלי</p>
                        </div>
                        <div>
                          <input type="radio" disabled className="" />
                          <input
                            onChange={change}
                            type="text"
                            value={value}
                            className="border black p-1"
                            placeholder="יצירת רשימה"
                          />
                          <button onClick={clickButton} className="p-2 border">
                            click
                          </button>
                        </div>
                      </label>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              )}
              {!isLike && !isLoading && (
                <div>
                  <p> הוסר מ: הטיול הבא שלי</p>
                </div>
              )}
            </PopoverContent>
            <PopoverTrigger></PopoverTrigger>
            <TooltipTrigger
              className="bg-white rounded-full h-[36px] w-[36px] flex items-center justify-center hover:bg-gray-100 transition-all cursor-pointer"
              onClick={handleClick}
            >
              {isLoading ? (
                <Spinner />
              ) : isLike ? (
                <IconHeartRed className="w-5 h-5 fill-red-500" />
              ) : (
                <IconHeart className="w-5 h-5" />
              )}
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="text-sm text-white p-2 bg-black border border-black rounded-md"
            >
              <p>{isLike ? "מקום האירוח שמור באחת מהרשימות שלכם" : "שמור"}</p>
            </TooltipContent>
          </Tooltip>
        </Popover>
      </TooltipProvider>
    </div>
  );
}

export default SaveButton;
