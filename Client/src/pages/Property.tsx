import styles from "@/css/search.module.css";
import AsksComponents from "@/components/AsksComponents";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";

import ReviewsCard from "@/components/ReviewsCard";
import PropertyTable from "@/components/PropertyTable";
import { IReview } from "@/types/reviewTypes";
import Search from "@/components/search";
import { useTranslation } from "react-i18next";

import HouseRules from "@/components/HouseRules";
import { Button } from "@/components/ui/button";

import LocationCard from "@/components/LocationCard";
import PropertyTitles from "@/components/PropertyTitles";
import FaqComponent from "@/components/FaqComponent";
import MainCarousel from "@/components/MainCarousel";
import {
  SampleNextArrow,
  SamplePrevArrow,
} from "@/components/ui/carousel-slick";
import Slider from "react-slick";
import { Plus } from "@/components/ui/Icons";
import BreadcrumbCard from "@/components/Breadcrumb";
import { cf } from "@/utils/functions";
import PropertyFinePrint from "./components/PropertyFinePrint";
import RecommendedCard from "@/components/RecommendedCard";

// ! Route for testing : http://localhost:5173/property/677ebec78be19680bdc0aa7f

function Property() {
  const { id } = useParams();
  const [propertyData, setPropertyData] = useState<IProperty | undefined>();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1140);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRooms = location.state;
  console.log(selectedRooms);

  const [propertyReviews, setPropertyReviews] = useState<
    IReview[] | undefined
  >();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "he";
  const arr = [
    "Overview",
    "Info & prices",
    "Facilities",
    "House rules",
    "The fine print",
    `Guest reviews (${propertyReviews?.length})`,
  ];

  const settingsReviewsCarousel = {
    infinite: false,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    if (id) {
      getPropertyById(id).then((data) => {
        setPropertyData(data);
        // console.log(data);
      });
      getReviewsByPropertyId(id).then((data) => {
        setPropertyReviews(data);
        // console.log(data);
      });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getPropertyById(id).then((data) => {
        setPropertyData(data);
        // console.log(data);
      });
      getReviewsByPropertyId(id).then((data) => {
        setPropertyReviews(data);
        // console.log(data);
      });
    }
  }, [id]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile((prevIsMobile) => {
        if (window.innerWidth < 1140 && !prevIsMobile) return true;
        else if (window.innerWidth >= 1140 && prevIsMobile) return false;
        return prevIsMobile;
      });
    };
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const searchUrl = "/searchresults?country=Israel";

  const breadcrumbItems = [
    {
      label: "Home",
      onClick: () => {
        navigate("/");
      },
    },
    {
      label: cf(propertyData?.type || ""),
      onClick: () => {
        navigate(`${searchUrl}&type=${propertyData?.type}`);
      },
    },
    { label: cf(propertyData?.title || "") },
  ];

  if (!propertyData) return <h1>404 property was not found</h1>;

  return (
    <div className="relative ">
      <div className="absolute top-0 w-full -z-10 h-[210px]  bg-[#013b94] search:h-[45px]"></div>
      <div className="px-10 max-w-[1100px] mx-auto flex flex-col gap-5">
        <div className="absolute top-[150px] "></div>
        <Search></Search>

        <BreadcrumbCard items={breadcrumbItems} />

        <NavProperty arr={arr} />

        <PropertyTitle propertyData={propertyData} segment={arr[0]} />

        <ImagesProperty
          isRtl={isRtl}
          propertyData={propertyData}
          propertyReviews={propertyReviews}
        />

        <RecommendedCard />

        <div className="search:grid search:grid-cols-[5fr_2fr] mt-5">
          <PropertyDescription propertyData={propertyData} />
          <div className="hidden search:flex search:flex-col gap-4 search:justify-around items-center">
            <PropertyHighlight highlights={propertyData?.highlights} />
            <GeniusCard />
          </div>
        </div>
        <div>
          <h2 className="py-3 text-lg font-bold ">
            {t("popularFacilities.header")}
          </h2>
          <PopularFacilities
            popularFacilities={propertyData?.popularFacilities}
          />
        </div>
        <div
          id="Info & prices"
          className="border-[0.5px] border-softGray my-5"
        ></div>
        <MainCarousel>
          {typeof propertyData?.rooms !== "string" && propertyData?.rooms && (
            <PropertyTable nightsNum={4} rooms={propertyData?.rooms} />
          )}
        </MainCarousel>
        {/* Reviews & Rating */}
        {propertyReviews?.length && (
          <div id={`Guest reviews (${propertyReviews?.length})`}>
            <div className="flex justify-between">
              <div>
                <p className="text-2xl font-bold py-4">Guest Reviews</p>
              </div>
              <div>
                <div className="py-3">
                  <Button className="text-sm" asChild>
                    <a href={"#Info & prices"}>See availability</a>
                  </Button>
                </div>
              </div>
            </div>
            <GuestReviews
              propertyData={propertyData}
              propertyReviews={propertyReviews}
            />
            {/* Search reviews by */}
            <MainCarousel>
              <div className="flex flex-col gap-5">
                <h1 className="font-bold pt-4">
                  Select topics to read reviews:
                </h1>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="border-[0.6px] border-black rounded-full flex items-center justify-center gap-2"
                  >
                    <Plus />
                    Location
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[0.6px] border-black rounded-full flex items-center justify-center gap-2"
                  >
                    <Plus />
                    Room
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[0.6px] border-black rounded-full flex items-center justify-center gap-2"
                  >
                    <Plus />
                    Clean
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[0.6px] border-black rounded-full flex items-center justify-center gap-2"
                  >
                    <Plus />
                    Bed
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[0.6px] border-black rounded-full flex items-center justify-center gap-2"
                  >
                    <Plus />
                    Bathroom
                  </Button>
                </div>
              </div>
            </MainCarousel>

            {/* Reviews Carousel */}
            <h2 className=" font-bold pt-4 pb-2 ">
              {t("property.reviewsHeader")}
            </h2>
            {isMobile || propertyReviews.length <= 3 ? (
              <MainCarousel>
                {propertyReviews.map((rev) => (
                  <ReviewsCard
                    size={2}
                    className="min-w-[325px]"
                    key={rev._id}
                    review={rev}
                  />
                ))}
              </MainCarousel>
            ) : (
              <Slider
                key={isRtl ? "rtl" : "ltr"}
                {...{
                  ...settingsReviewsCarousel,
                  slidesToShow: 3,
                  initialSlide: isRtl ? propertyReviews.length - 3 : 0,
                  nextArrow: <SampleNextArrow slidesToShow={3} />,
                }}
              >
                {propertyReviews.map((rev) => (
                  <ReviewsCard
                    size={2}
                    className="mx-2 "
                    key={rev._id}
                    review={rev}
                  />
                ))}
              </Slider>
            )}
          </div>
        )}
        <div>
          <Button
            className="text-[13px] border-[1px]"
            variant={"negativeDefault"}
          >
            Read all reviews
          </Button>
        </div>

        <QualityCard propertyData={propertyData} />

        <div>
          <p className="py-3 text-lg font-bold">Travelers are asking</p>

          <AsksComponents propertyData={propertyData} />
        </div>

        <div>
          <Button
            className="text-[13px] border-[1px]"
            variant={"negativeDefault"}
          >
            See other Questions <span>{propertyReviews?.length}</span>
          </Button>
        </div>
        <h2 className="py-4 text-2xl font-bold"> {t("nearBy.header")}</h2>
        <PropertyTitles />
        <LocationCard propertyData={propertyData} />

        <PropertyNearBy hotel_area_info={propertyData?.hotel_area_info} />

        <div id="Facilities" className="flex justify-between">
          <div className="py-3">
            <h2 className=" text-2xl font-bold mb-2">
              Facilities of {propertyData.title}
            </h2>

            {propertyData.total_rating && (
              <p className="text-searchGrayText text-md">
                {propertyData.total_rating >= 8
                  ? "Great facilities! "
                  : propertyData?.total_rating > 6 &&
                    propertyData?.total_rating < 8
                  ? "Nice facilities!"
                  : ""}
                <span>
                  {" "}
                  Review score, {propertyData.total_rating.toFixed(2)}
                </span>
              </p>
            )}
          </div>
          <div className="py-3">
            <Button className="text-sm" asChild>
              <a href={"#Info & prices"}>See availability</a>
            </Button>
          </div>
        </div>

        <h2 className="py-3 text-lg font-bold ">
          {t("popularFacilities.header")}
        </h2>
        <PopularFacilities
          popularFacilities={propertyData?.popularFacilities}
        />

        {/* todo ridel carusel 5 km close by */}
        <PropertyFeatures features={propertyData?.features} />

        <div id={"House rules"} className="flex flex-col gap-2 ">
          <div className="flex justify-between">
            <div className="py-3">
              <h2 className=" text-2xl font-bold mb-2">House Rules</h2>
              <p className="text-searchGrayText text-md">
                Aparthotel Stare Miasto takes special requests - add in the next
                step!
              </p>
            </div>
            <div className="py-3">
              <Button className="text-sm" asChild>
                <a href={"#Info & prices"}>See availability</a>
              </Button>
            </div>
          </div>
          <div className={`overflow-scroll ${styles.scrollContainer}`}>
            <HouseRules propertyData={propertyData} />
          </div>
        </div>

        <div id="The fine print" className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="py-3">
              <h2 className=" text-2xl font-bold ">The fine print</h2>
              <p className="text-searchGrayText text-md">
                Need-to-know information for guests at this property
              </p>
            </div>
            <div className="py-3">
              <Button className="text-sm" asChild>
                <a href={"#Info & prices"}>See availability</a>
              </Button>
            </div>
          </div>
          <PropertyFinePrint fine_print={propertyData.fine_print} />
          <FaqComponent propertyData={propertyData} />
        </div>
      </div>
    </div>
  );
}

export default Property;
