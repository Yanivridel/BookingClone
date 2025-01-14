import { PropertyFeaturesProps } from "./PropertyFeatures";
import { SmallIconVi } from "./ui/Icons";

function RoomFeatures({ features }: PropertyFeaturesProps) {
  return (
    <div className="flex flex-wrap">
      {features?.map((feature) => (
        <div className="flex" key={feature.category}>
          {feature.sub?.map((sub, i) => (
            <div key={sub + i} className="flex py-1 pe-1">
              <div>
                <SmallIconVi className="fill-IconsGreen w-4 h-4" />
              </div>
              <div className="text-[12px]">{sub}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default RoomFeatures;
