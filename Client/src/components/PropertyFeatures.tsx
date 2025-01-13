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
    <div className="grid  signInLayoutTop:grid-cols-2 gap-3 ">
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
                className="fill-black h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d={path}></path>
              </svg>
              <span className="font-bold">{feature.category}</span>
            </div>
            <div>{/* {feature.sub?.map(())} */}</div>
          </div>
        );
      })}
    </div>
  );
}

export default PropertyFeatures;
