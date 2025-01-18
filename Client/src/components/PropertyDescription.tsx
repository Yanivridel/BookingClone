import { IProperty } from "@/types/propertyTypes";
import { Vi } from "./ui/Icons";

interface PropertyDescriptionProps {
  propertyData?: IProperty;
}

function PropertyDescription({ propertyData }: PropertyDescriptionProps) {
  if (!propertyData) {
    return <div></div>;
  }

  return (
    <div className="   p-2 flex flex-col gap-2">
      <div className="flex items-center gap-1 ">
        <Vi className="fill-green-700 w-4 h-4" />
        <p className="text-green-700 text-sm">Reliable info:</p>
        <p className="text-sm">
          Guests say the description and photos for this property are{" "}
          <span className="font-bold">very accurate.</span>
        </p>
      </div>
      <div
        className="text-xs"
        dangerouslySetInnerHTML={{
          __html: (propertyData.description || "").replace(/\\n/g, "<br>").replace(/\n/g, "<br>"),
        }}
      ></div>
      <br />
      <div className="text-xs">{propertyData.description}</div>
      <br />
      <div className="text-xs">{propertyData.description}</div>
      <br />
      <div className="text-xs">{propertyData.description}</div>
      <br />
    </div>
  );
}

export default PropertyDescription;
