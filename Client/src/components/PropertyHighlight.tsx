import { EPropertyHighlight } from "@/types/propertyTypes";
import { propertyHighlightInfo } from "@/utils/staticData";
import { t } from "i18next";

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
  return (
    <div>
      <h2 className="py-3 text-lg font-bold flex-wrap">
        {t("highlights.header")}
      </h2>
      <div className="flex gap-3 ">
        {highlights?.map((highlight) => {
          const title = highlight.title;
          const path = propertyHighlightInfo[title];
          return (
            <div
              className="flex justify-between gap-3 items-center"
              key={highlight.title}
            >
              <div className="py-3 flex gap-3">
                <svg
                  className="fill-IconsGreen h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d={path}></path>
                </svg>
                <span className="text-md">{highlight.title}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PropertyHighlight;
