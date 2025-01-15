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

import ReviewsCard from "@/components/ReviewsCard";
import PropertyTable from "@/components/PropertyTable";
import { IReview } from "@/types/reviewTypes";
import Search from "@/components/search";
import { useTranslation } from "react-i18next";
import HouseRules from "@/components/HouseRules";
import Note from "@/components/Note";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import LocationCard from "@/components/LocationCard";
import PropertyTitles from "@/components/PropertyTitles";
import FaqComponent from "@/components/FaqComponent";

// ! Route for testing : http://localhost:5173/property/677ebec78be19680bdc0aa7f

function Property() {


    const { id } = useParams();
    const [propertyData, setPropertyData] = useState<IProperty | undefined>();
 
  const [propertyReviews, setPropertyReviews] = useState<
    IReview[] | undefined
  >();
const { t } = useTranslation();
 const arr = [
    "Overview",
    "Info & prices",
    "Facilities",
    " House rules",
    "The fine print",
    "Guest reviews(30,075)",
  ];
    
    useEffect(() => {
        if(id) {
            getPropertyById(id)
            .then(data => {
                setPropertyData(data)
                console.log(data)
            });
            getReviewsByPropertyId(id).then((data) => {
              setPropertyReviews(data);
              console.log(data);
            });
            
        }
    }, [id])


  useEffect(() => {
    if (id) {
      getPropertyById(id).then((data) => {
        setPropertyData(data);
        console.log(data);
      });
      getReviewsByPropertyId(id).then((data) => {
        setPropertyReviews(data);
        console.log(data);
      });
    }
  }, [id]);

  return (
    <div className="p-10">
      <Search></Search>
      <BreadcrumbProperty />
      <NavProperty arr={arr} />
      <PropertyTitle propertyData={propertyData} id={arr[0]} />



      {propertyReviews && <ImagesProperty propertyData={propertyData} propertyReviews={propertyReviews}/>}
      <PropertyDescription propertyData={propertyData} />
      <PropertyHighlight highlights={propertyData?.highlights} />
      <GeniusCard />
      <h2 className="py-3 text-lg font-bold ">
        {t("popularFacilities.header")}
      </h2>
      <PopularFacilities popularFacilities={propertyData?.popularFacilities} />
      {/* todo: pass real data */}
      <PropertyTable nightsNum={4} rooms={propertyData?.rooms} />
      {propertyReviews && <GuestReviews propertyData={propertyData}  propertyReviews={propertyReviews}/>}
      <Button
              className="text-[13px] border-[1px]"
              variant={"negativeDefault"}
            >
              Read all reviews
        </Button>
      <QualityCard propertyData={propertyData} />
      <p className="py-3 text-lg font-bold">Travellers are asking</p>
      <AsksComponents propertyData={propertyData} />
      <Button
              
              className="text-[13px] border-[1px]"
              variant={"negativeDefault"}
            >
              See other Questions <span>{propertyReviews?.length}</span>
        </Button>
      <p className="py-3 text-lg font-bold">Guests who stayed here loved</p>
      <ReviewsCard propertyReviews={propertyReviews} />
      <PropertyTitles />
      <LocationCard propertyData={propertyData}/>

      
      
      <PropertyNearBy hotel_area_info={propertyData?.hotel_area_info} />
      <h2 className="py-3 text-lg font-bold ">
        {t("popularFacilities.header")}
      </h2>
      <PopularFacilities popularFacilities={propertyData?.popularFacilities} />
      {/* todo ridel carusel 5 km close by */}
      <PropertyFeatures features={propertyData?.features} />
      <div className="flex flex-col gap-2 ">
        <h2 className="py-3 text-lg font-bold ">
          House Rules
        </h2>
        <p className="text-gray-500 text-sm">
        Aparthotel Stare Miasto takes special requests - add in the next step!
        </p>
        <HouseRules propertyData={propertyData}/>
      </div>
      
      <div className="flex flex-col gap-3">
        <h2 className="py-3 text-lg font-bold ">
        The fine print

        </h2>
        <p className="text-gray-500 text-sm">
        Need-to-know information for guests at this property
        </p>
        <Note />
        <FaqComponent  propertyData={propertyData}/>
      </div>
    </div>
  );
}

export default Property;
