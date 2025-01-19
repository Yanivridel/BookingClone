import styles from "@/css/search.module.css";
import ImageCard from "@/components/ImageCard";
import MainCard from "@/components/MainCard";
import OffersCard from "@/components/OffersCard";
import Search from "@/components/search";
import HomeHeader from "../components/HomeHeader.tsx";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DubaiImage from "../assets/images/Dubai.jpg";
import { cf, convertMonthsToQueryString, makeUrlForSearch } from "@/utils/functions";

import { easyTripObj, HomeArr, inspirationArr, offersArr, propertyTypesArr, TrendingImages, uniqueArr } from "@/utils/staticData.ts";

import { useTranslation } from "react-i18next";

import CardWithDescription from "@/components/CardWithDescritpion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./../store/index.ts";
import { IUser } from "@/types/userTypes.ts";
import Slider from "react-slick";
import { TFunctionNonStrict } from "i18next";
import { SampleNextArrow, SamplePrevArrow } from "@/components/ui/carousel-slick.tsx";
import MainCarousel from "@/components/MainCarousel.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import CardWithLocationHome from "@/components/CardWithLocationHome.tsx";
import { IProperty, ISearchPropertiesReq } from "@/types/propertyTypes.ts";
import { getPropertyByIdForCard } from "@/utils/api/propertyApi.ts";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modifyUserArrays } from "@/utils/api/userApi.ts";
import { addSearchEntry } from "@/store/slices/userSlices.ts";
import kidsImg from './../assets/images/kids.jpeg'
import { cn } from "@/lib/utils.ts";
import LiveFooter from "@/components/LiveFooter.tsx";
import { BeachIcon, CityIcon, OutdoorsIcon, SavedIcon } from "@/components/ui/Icons.tsx";

// Tailwind - render
("col-span-2");
("col-span-3");

function Home() {
  const HomeMobileWidth = 1140;
  const currentUser = useSelector((state: RootState) => state.currentUser) as unknown as IUser;
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < HomeMobileWidth
  );
  const interestedArr = currentUser.interested.slice().reverse();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "he";
  const dateLanguage = isRtl ? "he-IL" : "en-US";
  const [easyTripCategory, setEasyTripCategory] = useState("outdoors");
  const easyTripCategories = Object.keys(easyTripObj);

  const settingsSearch = {
    infinite: false,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow />,
  };

  // console.log("USER", currentUser);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile((prevIsMobile) => {
        if (window.innerWidth < HomeMobileWidth && !prevIsMobile) return true;
        else if (window.innerWidth >= HomeMobileWidth && prevIsMobile)
          return false;
        return prevIsMobile;
      });
    };


    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const currentDate = new Date();

  const dayOfWeek = currentDate.getDay();
  const daysToFriday = (5 - dayOfWeek + 7) % 7;

  const friday = new Date(currentDate);
  friday.setDate(currentDate.getDate() + daysToFriday);

  const sunday = new Date(currentDate);
  sunday.setDate(currentDate.getDate() + daysToFriday + 2);
  const monthOptions: Intl.DateTimeFormatOptions = { month: "long" };
  const dayOptions: Intl.DateTimeFormatOptions = { day: "numeric" };

  const fromMonth = friday.toLocaleDateString(dateLanguage, monthOptions);
  const fromDay = friday.toLocaleDateString(dateLanguage, dayOptions);

  const toMonth = sunday.toLocaleDateString(dateLanguage, monthOptions);
  const toDay = sunday.toLocaleDateString(dateLanguage, dayOptions);

  const weedend = {
    fromDate: { month: fromMonth, day: fromDay },
    toDate: { month: toMonth, day: toDay },
  };
  
  const handleSearchClick = async (finalData: ISearchPropertiesReq) => {
      const url = makeUrlForSearch(finalData);
      navigate(url);
      try {
        const updatedUser = await modifyUserArrays("add", { search: finalData.primary});
        dispatch(addSearchEntry(updatedUser.search));
      } catch(err) {
        console.log("React Client Error: ", err);
      }
    };

  function mapUserSearches(
    user: IUser,
  ) {
    if(!user.search.length)
      return SkeletonCard(6);
  
    const searchArr = user.search.slice().reverse();
    return searchArr.map((details) => {
      let locationDetails = details.location;
    let specific, broader = "";

    if (locationDetails.addressLine) {
      specific = locationDetails.addressLine;
      broader = `${locationDetails.city}, ${locationDetails.region}, ${locationDetails.country}`;
    } else if (locationDetails.city) {
      specific = locationDetails.city;
      broader = `${locationDetails.region}, ${locationDetails.country}`;
    } else if (locationDetails.region) {
      specific = locationDetails.region;
      broader = `${locationDetails.country}`;
    } else {
      specific = locationDetails.country;
    }

    let formattedLocation = (
      <div>
        <b className="text-md">{specific}</b>
        {broader && <div className="text-gray-500 text-xs">
          {broader.length > 34 ? broader.slice(0, 34) + " ..." : broader}
        </div>}
      </div>
    );

      return <div
        key={details._id}
        className="flex-shrink-0 !flex gap-2 items-center cursor-pointer 
          shadow-searchPopupsShadow p-4 rounded-xl h-[100px] max-w-[294px] mx-1 my-2"
        onClick={() => handleSearchClick({ primary: details} as ISearchPropertiesReq)}
        >
        <img
          className=" rounded-lg h-16 w-16"
          src="https://cf.bstatic.com/xdata/images/region/64x64/59876.jpg?k=711533b814bfa5152506e24d0d424891a41ebb90577413a61d858cbf0bd60d32&o="
          alt={details.location.country}
        />
        <div>
          {formattedLocation}
          <p className="text-gray-500 text-sm">
            <span>
              {details.date.fromDay &&
                new Date(details.date.fromDay).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
            </span>
            <span>
              {details && <span>-</span>}
              {details.date.endDate &&
                new Date(details.date.endDate).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              {", "}
            </span>
            {(Number(details.options.adults) || 0) +
              (Number(details.options.adults) || 0) <=
            1 ? (
              <span>{t("home.1 person")}</span>
            ) : (
              <span>
                {Number(details.options.adults) + Number(details.options.childrenAges?.length || 0)}{" "}
                {t("home.people")}
              </span>
            )}
          </p>
        </div>
      </div>
      }
    );
  }

  return (
    <div>
      <HomeHeader />
      <div className="p-1 pt-[346px] max-w-[1100px] mx-auto">
        {/* Search Nav */}
        <Search></Search>

        {/* Last 10 Searches */}
        {currentUser.search.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold py-4 ">
              {t("home.recentSearchHeader")}
            </h2>
            {isMobile || currentUser.search.length <= 3 ? (
                <MainCarousel>
                  {mapUserSearches(currentUser)}
                </MainCarousel>
            ) : (
              <Slider
                key={isRtl ? "rtl" : "ltr"}
                {...{
                  ...settingsSearch,
                  slidesToShow: 3.5,
                  initialSlide: isRtl ? currentUser.search.length - 3.5 : 0,
                  nextArrow: <SampleNextArrow slidesToShow={3.5} />,
                }}
              >
                {mapUserSearches(currentUser)}
              </Slider>
            )}
          </div>
        )}

        {/* Interested Carousel */}
        {currentUser.interested.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold py-4">
              {t("home.interestedInHeader")}
            </h2>
            {isMobile || currentUser.interested.length <= 3 ? (
              <MainCarousel>
                {interestedArr.map((propertyId) => (
                  <MainCard
                    key={propertyId}
                    is_heart={true}
                    propertyId={propertyId}
                  />
                ))}
              </MainCarousel>
            ) : (
              <Slider
                key={isRtl ? "rtl" : "ltr"}
                {...{
                  ...settingsSearch,
                  slidesToShow: 3.8,
                  initialSlide: isRtl
                    ? currentUser.interested.length - 3.8
                    : 0,
                  nextArrow: <SampleNextArrow slidesToShow={3.8} />,
                }}
              >
                {interestedArr.map((propertyId) => (
                  <MainCard
                    key={propertyId}
                    is_heart={true}
                    propertyId={propertyId}
                  />
                ))}
              </Slider>
            )}
          </div>
        )}

        {/* Offers */}
        <div className="py-4">
          <h2 className="text-2xl font-bold ">{t("home.OffersHeader")}</h2>
          <h3 className="text-searchGrayText mb-2">
            {t("home.OffersSecondaryHeader")}
          </h3>
          {isMobile ? (
            <MainCarousel>
              {offersArr.map((el) => (
                <OffersCard className="min-w-[500px]" key={el.button} title={el.title} desc={el.desc} button={el.button} img={el.img}/>
              ))}
            </MainCarousel>
          ) : (
            <Slider
              key={isRtl ? "rtl" : "ltr"}
              className="mb-8"
              {...{
                ...settingsSearch,
                slidesToShow: 2,
                dots: true,
                dotsClass: "slick-dots -bottom-[45px]",
                initialSlide: isRtl ? 3 - 2 : 0,
                nextArrow: <SampleNextArrow slidesToShow={2} />,
              }}
            >
              {offersArr.map((el) => (
                <OffersCard key={el.button} title={el.title} desc={el.desc} button={el.button} img={el.img}/>
              ))}
            </Slider>
          )}
        </div>

        {/* Trending destinations */}
        <div className="py-4">
          <h2 className="text-2xl font-bold">
            {t("home.trandingDestinationsHeader")}
          </h2>
          <h3>{t("home.trandingDestinationsSecondaryHeader")}</h3>

          <div className="grid grid-cols-6 gap-4">
            {TrendingImages.map((details, idx) => (
              <ImageCard
                key={details.city}
                details={details}
                className={`col-span-${idx <= 1 ? 3 : 2}`}
                onClick={() => navigate(`/searchresults?country=${details.city}`) }
              />
            ))}
          </div>
        </div>

        {/* Easy Trip 4 Carousels */}
        <div>
          <h2 className="text-2xl font-bold mt-5">
            {t("home.ClosePlacesHeader")}
          </h2>
          <h3 className="text-searchGrayText ">
            {t("home.ClosePlacesSecondaryHeader")}
          </h3>
          {/* Category change */}
          <div className="flex p-2">
            {easyTripCategories.map((key:string) =>
              <Button
              variant="ghost"
              className={`font-normal rounded-full p-4 text-lg ${
                easyTripCategory === key
                  ? "border-2 border-sky-600 text-sky-600 bg-accent"
                  : ""
              }`}
              onClick={() => setEasyTripCategory(key)}
            >
              {key === "beach" && <BeachIcon/>}
              {key === "outdoors" && <OutdoorsIcon/>}
              {key === "romance" && <SavedIcon/>}
              {key === "city" && <CityIcon/>}
              {cf(key)}
            </Button>
            )}
          </div>
          {/* Carousels */}
          <div className="py-4">
            {isMobile || easyTripObj[easyTripCategory].length <= 4 ? (
              <MainCarousel>
                {easyTripObj[easyTripCategory].map((item: any, index: number) => (
                  <CardWithLocationHome
                  key={index}
                  title={item.title}
                  image={item.img}
                  description={item.distance}
                  className="mx-2 max-h-[300px] min-w-[180px]"
                  classNameImg="max-h-[185px]"
                  onClick={() => navigate(`/searchresults?country=Israel&city=${item.title}`)}
                />
                ))}
              </MainCarousel>
            ) : (
            <Slider 
            key={easyTripCategory + (isRtl ? "rtl" : "ltr")}
            {...{
              ...settingsSearch,
              slidesToShow: 5,
              initialSlide: isRtl ? easyTripObj[easyTripCategory].length - 5 : 0,
              // variableWidth: true,
              nextArrow: <SampleNextArrow slidesToShow={5} />,
            }}
            >
              {easyTripObj[easyTripCategory].map((item: any, index: number) => (
                <CardWithLocationHome
                  key={index}
                  title={item.title}
                  image={item.img}
                  description={item.distance}
                  className="mx-2 max-h-[300px] min-w-[180px]"
                  classNameImg="max-h-[185px]"
                  onClick={() => navigate(`/searchresults?country=Israel&city=${item.title}`)}
                />
              ))}
            </Slider>
            )}
          </div>
        </div>

        {/* //! Travel more, spend less */}
        {/* <div>
          <div className="flex justify-between">
            <div className="py-4">
              <h2 className="text-2xl font-bold ">
                {t("home.gunisesDealsHeader")}
              </h2>
              <Button variant={"simpleLink"}>{t("home.gunisesMoreInfo")}</Button>
            </div>
          </div>
          <div>
            <OffersCard className="justify-between"
            key={"sign-in"} title="Sign in, save money" desc="Save 10% or more at participating properties – just look for the blue Genius label"
              button="Sign in" img="https://t-cf.bstatic.com/design-assets/assets/v3.138.1/illustrations-traveller/GeniusGenericGiftBox.png" />
          </div>
        </div> */}

        {/* Inspiration Carousel */}
        <div>
          <div className="py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold ">
              {t("home.inspirationDealsHeader")}
            </h2>
            <Button variant={"simpleLink"}>
              {t("home.inspirationButton")}
            </Button>
          </div>
          {isMobile || inspirationArr.length <= 3 ? (
                <MainCarousel>
                  <CardWithDescription/>
                  { inspirationArr.map(el =>
                    <CardWithLocationHome key={el.title} title={el.title} description={el.desc} 
                    image={el.img} className="min-w-[350px]"/>
                  )}
                </MainCarousel>
            ) : (
              <Slider
                key={isRtl ? "rtl" : "ltr"}
                {...{
                  ...settingsSearch,
                  slidesToShow: 2,
                  initialSlide: isRtl ? 5 - 2 : 0,
                  // variableWidth: true,
                  nextArrow: <SampleNextArrow slidesToShow={2} />,
                }}
              >
                <CardWithDescription className="" />
                { inspirationArr.map(el =>
                  <div className="px-2">
                    <CardWithLocationHome title={el.title} description={el.desc} image={el.img} />
                  </div>
                )}
              </Slider>
            )}
        </div>

        {/* Property Type Carousel */}
        { propertyTypesArr?.length &&
        <div>
        <div className="py-4">
          <h2 className="text-2xl font-bold ">{t("home.propertyTypesHeader")}</h2>
        </div>
          {isMobile || propertyTypesArr.length <= 3 ? (
                <MainCarousel>
                  { propertyTypesArr.map(prop =>
                    <CardWithLocationHome key={prop.title} title={t(prop.title)} onClick={() => navigate(`/searchresults?country=Israel&type=${prop.title.split('.')[1].toLowerCase().replace(/s$/, '')}`)}
                    image={prop.img} className="min-w-[250px] max-h-[300px]" classNameImg="h-5/6"/>
                  )}
                </MainCarousel>
            ) : (
              <Slider
                key={isRtl ? "rtl" : "ltr"}
                {...{
                  ...settingsSearch,
                  slidesToShow: 4,
                  initialSlide: isRtl
                    ? propertyTypesArr.length - 4
                    : 0,
                  nextArrow: <SampleNextArrow slidesToShow={4} />,
                }}
              >
                { propertyTypesArr.map(prop =>
                    <CardWithLocationHome key={prop.title} title={t(prop.title)} onClick={() => navigate(`/searchresults?country=Israel&type=${prop.title.split('.')[1].toLowerCase().replace(/s$/, '')}`)}
                    image={prop.img} className="mx-1 max-h-[300px]" classNameImg="h-5/6"/>
                  )}
              </Slider>
            )}
        </div>
        }

        {/* Top Unique Carousel */}
        { uniqueArr?.length &&
        <div>
        <div className="py-4">
          <h2 className="text-2xl font-bold ">{t("home.uniqueHeader")}</h2>
          <h3 className="text-searchGrayText ">
            {t("home.uniqueSecondaryHeader")}
          </h3>
        </div>
          {isMobile || uniqueArr.length <= 3 ? (
                <MainCarousel>
                  { uniqueArr.map(propertyId =>
                    <MainCard key={propertyId} propertyId={propertyId} is_heart={true}/>
                  )}
                </MainCarousel>
            ) : (
              <Slider
                key={isRtl ? "rtl" : "ltr"}
                {...{
                  ...settingsSearch,
                  slidesToShow: 3.8,
                  initialSlide: isRtl
                    ? uniqueArr.length - 3.8
                    : 0,
                  nextArrow: <SampleNextArrow slidesToShow={3.8} />,
                }}
              >
                { uniqueArr.map(propertyId =>
                    <MainCard key={propertyId} propertyId={propertyId} is_heart={true} />
                )}
              </Slider>
            )}
        </div>
        }
      
        {/* Homes Carousel */}
        { HomeArr?.length &&
        <div>
        <div className="py-4 flex justify-between">
          <h2 className="text-2xl font-bold ">
            {t("home.lovedHomesDealsHeader")}
          </h2>
          <Button variant={"simpleLink"}>{t("home.lovedHomesButton")}</Button>
        </div>
          {isMobile || HomeArr.length <= 3 ? (
                <MainCarousel>
                  { HomeArr.map(propertyId =>
                    <MainCard key={propertyId} propertyId={propertyId} is_heart={true}/>
                  )}
                </MainCarousel>
            ) : (
              <Slider
                key={isRtl ? "rtl" : "ltr"}
                {...{
                  ...settingsSearch,
                  slidesToShow: 3.8,
                  initialSlide: isRtl
                    ? HomeArr.length - 3.8
                    : 0,
                  nextArrow: <SampleNextArrow slidesToShow={3.8} />,
                }}
              >
                { HomeArr.map(propertyId =>
                    <MainCard key={propertyId} propertyId={propertyId} is_heart={true} />
                )}
              </Slider>
            )}
        </div>
        }

        <LiveFooter />
        
      </div>
    </div>
  );
}

export default Home;


function SkeletonCard(length = 1) {
  return (
    <div className="flex gap-3 -ms-[380px]">
      {[...Array(length)].map((_, index) => (
        <Card key={index} className="flex flex-col p-4 gap-2 h-[100px] min-w-[294px]">
          <Skeleton className="w-full rounded-xl" />
          <Skeleton className="h-4 w-full mb-5" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-5/6" />
        </Card>
      ))}
    </div>
  );
}
