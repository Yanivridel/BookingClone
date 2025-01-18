import { EFeatures } from "@/types/propertyTypes";
import { featuresIcons } from "@/utils/staticData";
import { SmallIconVi } from "./ui/Icons";

export interface PropertyFeaturesProps {
  features?:[
    {
      category: EFeatures;
      sub: string[];
    }
  ];
}

function PropertyFeatures({ features }: PropertyFeaturesProps) {
  return (
    <div className="grid  signInLayoutTop:grid-cols-2 search:grid-cols-3  gap-4 ">
      {features?.map((feature) => {
        const title = feature.category;
        const path = featuresIcons[title];
        return (
          <div key={feature.category}>
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
            <div>
              {feature.sub?.map((sub, i) => (
                <div key={sub + i} className="flex gap-4 py-2">
                  <div>
                    <SmallIconVi className="w-4 h-4" />
                  </div>
                  <div className="text-sm">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PropertyFeatures;
