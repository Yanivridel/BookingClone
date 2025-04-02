// css
import styles from "@/css/search.module.css";

// react
import { useEffect, useState } from "react";

// components
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
import ReviewsCard from "@/components/ReviewsCard";
import PropertyTable from "@/components/PropertyTable";
import LocationCard from "@/components/LocationCard";
import PropertyTitles from "@/components/PropertyTitles";
import FaqComponent from "@/components/FaqComponent";
import MainCarousel from "@/components/MainCarousel";
import RecommendedCard from "@/components/RecommendedCard";
import PropertyFinePrint from "@/components/PropertyFinePrint";
import Search from "@/components/search";
import BreadcrumbCard from "@/components/Breadcrumb";
import HouseRules from "@/components/HouseRules";

// ui components
import { Button } from "@/components/ui/button";

// react-slick
import Slider from "react-slick";
import {
  SampleNextArrow,
  SamplePrevArrow,
} from "@/components/ui/carousel-slick";

// icons
import { Plus } from "@/components/ui/Icons";

// types
import { IProperty, RecommendedData } from "@/types/propertyTypes";
import { IReview } from "@/types/reviewTypes";

// api
import { getPropertyById } from "@/utils/api/propertyApi";
import { getReviewsByPropertyId } from "@/utils/api/reviewApi";

// router dom
import { useLocation, useNavigate, useParams } from "react-router-dom";

// translation
import { useTranslation } from "react-i18next";

// functions
import { cf, scrollToTopInstant } from "@/utils/functions";

// ! Route for testing : http://localhost:5173/property/677ebec78be19680bdc0aa7f

function Property() {
  const { id } = useParams();
  const [propertyData, setPropertyData] = useState<IProperty | undefined>();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1140);
  const navigate = useNavigate();
  const location = useLocation();
  const recommendedData: RecommendedData = location.state;

  // calculate startDate, endDate the difference between  and the nightsNumber
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const twoDaysLater = new Date(today);
  twoDaysLater.setDate(today.getDate() + 3);
  const startDate = recommendedData?.startDate || today;
  const endDate = recommendedData?.endDate || twoDaysLater;
  const differenceInTime = endDate.getTime() - startDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
  const nightsNum = differenceInDays - 1;

  const adults = recommendedData?.adults || 1;
  const childrenAges = recommendedData?.childrenAges?.split(", ") || [];
  let children = 0;
  // if childrenAges[0] is empty string children is 0
  if (childrenAges.length === 1) {
    if (Number(childrenAges[0])) {
      children = 1;
    }
  } else {
    children = childrenAges?.length;
  }
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
        document.title = `Booking.com | ${data?.title || ''} האתר הרשמי | מלון `
        scrollToTopInstant();
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
    scrollToTopInstant();
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

  if (!propertyData) return null;
  // console.log(propertyData);

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

        {recommendedData && propertyData && (
          <RecommendedCard
            recommendedData={recommendedData}
            propertyData={propertyData}
          />
        )}

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
        <div
          className={` tab:overflow-x-visible min-h-[500px] overflow-x-scroll , ${styles.scrollContainer}`}
        >
          {typeof propertyData?.rooms !== "string" && propertyData?.rooms && (
            <PropertyTable
              children={children}
              adults={adults}
              startDate={startDate}
              endDate={endDate}
              propertyData={propertyData}
              nightsNum={nightsNum}
            />
          )}
        </div>
        {/* Reviews & Rating */}
        {propertyReviews && propertyReviews?.length > 0 && (
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
            <div>
              <Button
                className="text-[13px] border-[1px]"
                variant={"negativeDefault"}
              >
                Read all reviews
              </Button>
            </div>
          </div>
        )}

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
