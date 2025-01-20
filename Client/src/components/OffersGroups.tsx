import { useTranslation } from "react-i18next";
import { BlackMen, Information } from "./ui/Icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip.tsx";
interface OffersGroupsProps {
  group_adults: number;
  group_children: number;
  ages: number[] | string[];
}

function OffersGroups({
  group_adults,
  group_children,
  ages,
}: OffersGroupsProps) {
  const { t } = useTranslation();
  return (
    <div>
      <div className=" flex flex-wrap py-2  px-1">
        {/* adults conditions  max icons - 4 */}
        {group_adults < 5 ? (
          <>
            {Array.from({ length: group_adults }).map((_, i) => (
              <div key={i}>
                <BlackMen />
              </div>
            ))}
          </>
        ) : group_adults >= 5 ? (
          <div className="flex">
            <span className="text-base">
              <BlackMen />
            </span>
            <span className="h-3 w-3 text-xs text-center">x</span>
            <span className="h-3 w-3 text-xs text-center">{group_adults}</span>
          </div>
        ) : (
          <div></div>
        )}

        {/* children conditions  max icons - 2 */}
        {group_children > 0 && group_children < 3 ? (
          <>
            <span className="flex">
              <span className="h-3 w-3 text-xs text-center">+</span>
              {Array.from({ length: group_children }).map((_, i) => {
                if (i < 2) {
                  return (
                    <div className="flex" key={i}>
                      <span>
                        <BlackMen className="h-3 w-3 mt-[3px]" />
                      </span>
                    </div>
                  );
                }
                return null;
              })}
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <span className="ps-[6px] mt-1">
                      <Information className="h-3 w-3" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black">
                    <p>
                      {
                        // child -
                        group_children === 1
                          ? `${t("offersGroups.child")} (${t(
                              "offersGroups.ageDescriptionHe"
                            )} ${ages?.join(",")} ${t(
                              "offersGroups.ageDescriptionEn"
                            )})`
                          : //  childrens -
                            `${group_children} ${t(
                              "offersGroups.children"
                            )} (${t(
                              "offersGroups.agesDescriptionHe"
                            )} ${ages?.join(", ")} ${t(
                              "offersGroups.ageDescriptionEn"
                            )})`
                      }
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
          </>
        ) : group_children >= 3 ? (
          <div className="flex">
            <span className="h-3 w-3 text-xs text-center">+</span>
            <span className="text-base">
              <BlackMen className="h-3 w-3 mt-[3px]" />
            </span>
            <span className="h-3 w-3 text-xs text-center">x</span>
            <span className="h-3 w-3 text-xs text-center">
              {group_children}
            </span>
            <span className="ps-2 mt-[2px]">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <Information className="h-3 w-3" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black">
                    <p>
                      {`${group_children} ${t("offersGroups.children")} (${t(
                        "offersGroups.agesDescriptionHe"
                      )} ${ages?.join(", ")} ${t(
                        "offersGroups.ageDescriptionEn"
                      )})`}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default OffersGroups;
