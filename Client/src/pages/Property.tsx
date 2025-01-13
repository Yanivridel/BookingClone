import AsksComponents from "@/components/AsksComponents";
import BreadcrumbProperty from "@/components/BreadcrumbProperty";
import GeniusCard from "@/components/GeniusCard";
import GuestReviews from "@/components/GuestReviews";
import ImagesProperty from "@/components/ImagesProperty";
import NavProperty from "@/components/NavProperty";
import PropertyDescription from "@/components/PropertyDescription";
import PropertyTitle from "@/components/PropertyTitle";
import QualityCard from "@/components/QualityCard";
import { IProperty } from "@/types/propertyTypes";
import { getPropertyById } from "@/utils/api/propertyApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ! Route for testing : http://localhost:5173/property/67810bb5824440db4b93a785

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
        <div> 
          {/* <BreadcrumbProperty />
          <NavProperty arr = {arr}/>
          <PropertyTitle propertyData = {propertyData} id = {arr[0]} />
          <ImagesProperty propertyData = {propertyData}/>
          <GeniusCard /> 
        <PropertyDescription propertyData = {propertyData}/>
        <QualityCard  propertyData = {propertyData}/>
         <AsksComponents propertyData = {propertyData}/> */}
         <GuestReviews propertyData = {propertyData}/>
        </div>
    )

}

export default Property;