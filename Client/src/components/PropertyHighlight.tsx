import { EPropertyHighlight } from "@/types/propertyTypes";
import { propertyHighlightInfo } from "@/utils/staticData";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface PropertyHighlightProps {
  highlights:
    | [
        {
          title: EPropertyHighlight;
          content: string;
        }
      ]
    | undefined;
}

function PropertyHighlight({ highlights }: PropertyHighlightProps) {
  const { t } = useTranslation();
  return (
    <div className="rounded-md p-4 bg-[#f0f6ff] w-[268px] flex flex-col gap-4">
      <h2 className=" text-[14px] font-bold ">{t("highlights.header")}</h2>
      <div className="flex flex-col gap-3 ">
        {highlights?.map((highlight) => {
          const title = highlight.title;
          const path = propertyHighlightInfo[title];
          return (
            <div className="" key={highlight.title}>
              <h3 className="text-sm font-bold">{highlight.title}</h3>
              <div className="py-3 flex gap-3">
                <svg
                  className="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d={path}></path>
                </svg>
                <span className="text-[13px]">{highlight.content}</span>
              </div>
            </div>
          );
        })}
      </div>
      <Button className="text-[13px] ">הזמינו עכשיו</Button>
      {/* <Button variant={"negativeDefault"}>נשמר!</Button> */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="text-[13px] border-[1px]"
              variant={"negativeDefault"}
            >
              שמרו את מקום האירוח
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-black">
            <p>שמירה</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default PropertyHighlight;
