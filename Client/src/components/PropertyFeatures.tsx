import { EFeatures } from "@/types/propertyTypes";
import { featuresIcons } from "@/utils/staticData";
import { t } from "i18next";

interface PropertyFeaturesProps {
  features:
    | [
        {
          category: EFeatures;
          sub: string[];
        }
      ]
    | undefined;
}

function PropertyFeatures({ features }: PropertyFeaturesProps) {
  return (
    <div>
      <h2 className="py-3 text-lg font-bold flex-wrap">
        {t("highlights.header")}
      </h2>
      <div className="flex gap-3 ">
        {features?.map((feature) => {
          const title = feature.category;
          const path = featuresIcons[title];
          return (
            <div
              className="flex justify-between gap-3 items-center"
              key={feature.category}
            >
              <div className="py-3 flex gap-3">
                <svg
                  className="fill-IconsGreen h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d={path}></path>
                </svg>
                <span className="text-md">{feature.category}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PropertyFeatures;
