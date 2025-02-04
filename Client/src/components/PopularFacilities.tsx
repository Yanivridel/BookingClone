import { cn } from "@/lib/utils";
import { EFacility } from "@/types/propertyTypes";
import { popularFacilitiesIcons } from "@/utils/staticData";

interface PopularFacilitiesProps {
  popularFacilities: EFacility[] | undefined;
  iconsClassName?: string;
  facilityTitleClassName?: string;
  facilityWrapperClassName?: string;
}
function PopularFacilities({
  popularFacilities,
  iconsClassName,
  facilityTitleClassName,
  facilityWrapperClassName,
}: PopularFacilitiesProps) {
  return (
    <div>
      <div className="flex gap-3 flex-wrap">
        {popularFacilities && popularFacilities.length && 
        popularFacilities?.map((facility) => {
          const path = popularFacilitiesIcons[facility];
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
    </div>
  );
}

export default PopularFacilities;
