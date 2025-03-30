import { cn } from "@/lib/utils";
import { EFacility } from "@/types/propertyTypes";
import { popularFacilitiesIcons } from "@/utils/staticData";

interface PopularFacilitiesProps {
  popularFacilities: EFacility[] | undefined;
  iconsClassName?: string;
  facilityTitleClassName?: string;
  facilityWrapperClassName?: string;
  componentWrapperClassName?: string;
  facilitiesLimitNumber?: number;
}
function PopularFacilities({
  popularFacilities,
  iconsClassName,
  facilityTitleClassName,
  facilityWrapperClassName,
  facilitiesLimitNumber: facilitiesNumber,
  componentWrapperClassName,
}: PopularFacilitiesProps) {
  return (
    <div className={cn("flex gap-3 flex-wrap", componentWrapperClassName)}>
      {popularFacilities &&
        popularFacilities.length &&
        popularFacilities.map((facility, i) => {
          const path = popularFacilitiesIcons[facility];

          // Checks if a facility count is provided, and if so,
          //  stops rendering facilities after reaching the specified number
          if (facilitiesNumber) {
            if (i >= facilitiesNumber) return;
          }

          return (
            <div
              className="flex justify-between gap-3 items-center"
              key={facility}
            >
              <div className={cn("py-2 flex gap-3", facilityWrapperClassName)}>
                <svg
                  className={cn("fill-IconsGreen h-5 w-5", iconsClassName)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d={path}></path>
                </svg>
                <span className={cn("text-sm", facilityTitleClassName)}>
                  {facility}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default PopularFacilities;
