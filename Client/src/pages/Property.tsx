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

// ! Route for testing : http://localhost:5173/property/677ebec78be19680bdc0aa7f

function Property() {
  const { id } = useParams();
  const [propertyData, setPropertyData] = useState<IProperty | undefined>();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1140);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRooms = location.state;
  console.log("selectedRooms", selectedRooms);

  const [propertyReviews, setPropertyReviews] = useState<
    IReview[] | undefined
  >();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "he";
  const arr = [
    "Overview",
    "Info & prices",
    "Facilities",
    " House rules",
    "The fine print",
    "Guest reviews(30,075)",
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
        console.log(data);
      });
      getReviewsByPropertyId(id).then((data) => {
        setPropertyReviews(data);
        console.log(data);
      });
    }
  }, [id]);

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
        <PropertyTitles />
        <LocationCard propertyData={propertyData} />

        <QualityCard propertyData={propertyData} />

        <BreadcrumbCard items={breadcrumbItems} />
        <MainCarousel>
          <NavProperty arr={arr} />
        </MainCarousel>

        <PropertyTitle propertyData={propertyData} segment={arr[0]} />

        <ImagesProperty
          isRtl={isRtl}
          propertyData={propertyData}
          propertyReviews={propertyReviews}
        />
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
        <div className="border-[0.5px] border-softGray my-5"></div>

        {typeof propertyData?.rooms !== "string" && propertyData?.rooms && (
          <PropertyTable nightsNum={4} rooms={propertyData?.rooms} />
        )}

        {/* Reviews & Rating */}
        {propertyReviews?.length && (
          <div>
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

        <div>
          <p className="py-3 text-lg font-bold">Travellers are asking</p>
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

        <PropertyNearBy hotel_area_info={propertyData?.hotel_area_info} />
        <h2 className="py-3 text-lg font-bold ">
          {t("popularFacilities.header")}
        </h2>
        <PopularFacilities
          popularFacilities={propertyData?.popularFacilities}
        />

        {/* {propertyReviews && <ReviewsCard propertyReviews={propertyReviews} />} */}

        {/* todo ridel carusel 5 km close by */}
        <PropertyFeatures features={propertyData?.features} />

        <div className="flex flex-col gap-2 ">
          <h2 className="py-3 text-lg font-bold ">House Rules</h2>
          <p className="text-gray-500 text-sm">
            Aparthotel Stare Miasto takes special requests - add in the next
            step!
          </p>
          <HouseRules propertyData={propertyData} />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="py-3 text-lg font-bold ">The fine print</h2>
          <p className="text-gray-500 text-sm">
            Need-to-know information for guests at this property
          </p>
          <FaqComponent propertyData={propertyData} />
        </div>
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab
          doloribus, excepturi dolorum numquam iste expedita unde doloremque
          atque consequatur? Consectetur enim eos magnam rerum possimus
          molestias dolores, soluta quia. Temporibus? Libero vero quibusdam
          necessitatibus aspernatur eius, possimus, nihil quis provident dolores
          eligendi id! Quaerat, laboriosam voluptatibus at explicabo unde iusto
          qui nobis aperiam modi harum itaque eum. Recusandae, nemo libero!
          Delectus odit maxime quaerat fuga. Itaque, vel ut. Deleniti distinctio
          ut doloribus delectus ipsa eos provident tenetur dolores ullam nihil
          explicabo, suscipit cumque nisi? Repellat natus perferendis cum rerum
          reprehenderit! Rem nostrum nam natus sit quo doloribus quis dolores
          eaque commodi ratione distinctio reprehenderit, eveniet nesciunt
          perspiciatis a reiciendis. Obcaecati alias enim optio rem et
          repudiandae itaque dicta, reiciendis illo? Ut reprehenderit nemo
          ducimus modi reiciendis, maiores, ratione iste facilis culpa
          dignissimos hic laudantium! Dolore, accusamus autem quo deleniti
          facilis eveniet quasi eum alias rem non assumenda! Maxime, dolorem
          modi? Iure sequi officiis itaque recusandae fugit, nostrum porro
          labore tenetur corrupti in beatae, veritatis ex at illo non fugiat
          voluptates similique ipsum voluptatem repellendus eius maiores.
          Cumque, repellendus. Quae, quo. Ex reiciendis enim esse sequi
          similique, nesciunt vitae ab ut. Voluptatem ipsam quas a modi ut
          adipisci quasi. Dignissimos unde blanditiis neque porro voluptates
          veniam similique molestiae beatae possimus quas! Voluptas
          necessitatibus consequatur placeat illum accusamus veritatis, commodi
          incidunt explicabo pariatur voluptatibus. Nostrum ipsam vero dicta,
          itaque officia, ipsum cum similique exercitationem illum iste autem at
          assumenda, recusandae et quis. Sed sint nihil assumenda, quo
          necessitatibus tempore optio? Accusamus sint iure tenetur quis, hic
          est doloremque tempora sed libero ipsam dicta nam corrupti et, nisi
          enim veniam magnam nobis earum! Accusantium totam aut eius, quos ab
          similique dicta saepe numquam aliquam fugiat, nisi veritatis,
          asperiores nesciunt! Laudantium ex modi voluptatibus sit. Quod libero
          laudantium accusantium enim aliquid debitis ab nesciunt.
        </div>
      </div>
    </div>
  );
}

export default Property;
