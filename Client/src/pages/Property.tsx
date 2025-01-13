import AsksComponents from "@/components/AsksComponents";
import BreadcrumbProperty from "@/components/BreadcrumbProperty";
import GeniusCard from "@/components/GeniusCard";
import GuestReviews from "@/components/GuestReviews";
import ImagesProperty from "@/components/ImagesProperty";
import NavProperty from "@/components/NavProperty";
import PropertyDescription from "@/components/PropertyDescription";

import PopularFacilities from "@/components/PopularFacilities";
import PropertyFeatures from "@/components/PropertyFeatures";
import PropertyHighlight from "@/components/PropertyHighlight";
import PropertyNearBy from "@/components/PropertyNearBy";
import PropertyTitle from "@/components/PropertyTitle";
import QualityCard from "@/components/QualityCard";
import { IProperty } from "@/types/propertyTypes";
import { getPropertyById } from "@/utils/api/propertyApi";
import { getReviewsByPropertyId } from "@/utils/api/reviewApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ! Route for testing : http://localhost:5173/property/677ebec78be19680bdc0aa7f

function Property() {
    const { id } = useParams();
    const [propertyData, setPropertyData] = useState<IProperty | undefined>();
    const arr = ["Overview", "Info & prices", "Facilities", " House rules", "The fine print", "Guest reviews(30,075)"]

    
    useEffect(() => {
        if(id) {
            getPropertyById(id)
            .then(data => {
                setPropertyData(data)
                console.log(data)
            });
        }
    }, [id])


  return (
    <div className="p-10">
         
      <PropertyDescription propertyData = {propertyData}/>
      <QualityCard  propertyData = {propertyData}/>
       <AsksComponents propertyData = {propertyData}/> */}
       <GuestReviews propertyData = {propertyData}/>
      <GeniusCard /> 
      <BreadcrumbProperty />
      <NavProperty arr={arr} />
      <PropertyTitle propertyData={propertyData} id={arr[0]} />
      <ImagesProperty propertyData={propertyData} />
      <PropertyHighlight highlights={propertyData?.highlights} />
      <PopularFacilities popularFacilities={propertyData?.popularFacilities} />
      <PropertyNearBy hotel_area_info={propertyData?.hotel_area_info} />
      <PropertyFeatures features={propertyData?.features} />

    </div>
  );
}

export default Property;
