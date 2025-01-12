import BreadcrumbProperty from "@/components/BreadcrumbProperty";
import ImagesProperty from "@/components/ImagesProperty";
import NavProperty from "@/components/NavProperty";
import PropertyHighlight from "@/components/PropertyHighlight";
import PropertyNearBy from "@/components/PropertyNearBy";
import PropertyTitle from "@/components/PropertyTitle";
import { IProperty } from "@/types/propertyTypes";
import { getPropertyById } from "@/utils/api/propertyApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ! Route for testing : http://localhost:5173/property/67810bb5824440db4b93a785

function Property() {
  const { id } = useParams();
  const [propertyData, setPropertyData] = useState<IProperty | undefined>();
  const arr = [
    "Overview",
    "Info & prices",
    "Facilities",
    " House rules",
    "The fine print",
    "Guest reviews(30,075)",
  ];

  useEffect(() => {
    if (id) {
      getPropertyById(id).then((data) => {
        setPropertyData(data);
        console.log(data);
      });
    }
  }, [id]);

  return (
    <div className="p-10">
      <BreadcrumbProperty />
      <NavProperty arr={arr} />
      <PropertyTitle propertyData={propertyData} id={arr[0]} />
      <ImagesProperty propertyData={propertyData} />
      <PropertyHighlight highlights={propertyData?.highlights} />
      <PropertyNearBy hotel_area_info={propertyData?.hotel_area_info} />
    </div>
  );
}

export default Property;
