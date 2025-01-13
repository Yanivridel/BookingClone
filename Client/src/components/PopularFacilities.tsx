import { EFacility } from "@/types/propertyTypes";
import { popularFacilitiesIcons } from "@/utils/staticData";
import { t } from "i18next";

interface PopularFacilitiesProps {
  popularFacilities: EFacility[] | undefined;
}
function PopularFacilities({ popularFacilities }: PopularFacilitiesProps) {
  return (
    <div>
      <h2 className="py-3 text-lg font-bold flex-wrap">
        {t("highlights.header")}
      </h2>
      <div className="flex gap-3 ">
        {popularFacilities?.map((facility) => {
          const path = popularFacilitiesIcons[facility];
          return (
            <div
              className="flex justify-between gap-3 items-center"
              key={facility}
            >
              <div className="py-3 flex gap-3">
                <svg
                  className="fill-IconsGreen h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d={path}></path>
                </svg>
                <span className="text-md">{facility}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PopularFacilities;
