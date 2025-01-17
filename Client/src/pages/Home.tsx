import styles from "@/css/search.module.css";
import ImageCard from "@/components/ImageCard";
import MainCard from "@/components/MainCard";
import OffersCard from "@/components/OffersCard";
import Search from "@/components/search";
import HomeHeader from "../components/HomeHeader.tsx";
import { Card } from "@/components/ui/card";
import MainNav from "@/components/MainNav";
import { Button } from "@/components/ui/button";
import DubaiImage from "../assets/images/Dubai.jpg";
import { convertMonthsToQueryString, makeUrlForSearch } from "@/utils/functions";

import { TrendingImages } from "@/utils/staticData.ts";

import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
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


// Tailwind - render
("col-span-2");
("col-span-3");

const inspirationArr = [
  {
    title: "The 6 best Orlando hotels for families",
    desc: "Discover the best Orlando hotels for families for your vacation.",
    img: "https://cf.bstatic.com/xdata/images/xphoto/540x405/292056369.webp?k=358d8cd9ede268c8a9660de4debc48b68fe5777bddce07972ac30ae28ab8b8f2&o="
  },
  {
    title: "5 best ski towns around the world",
    desc: "Discover a winter wonderland in these charming ski destinations",
    img: "https://cf.bstatic.com/xdata/images/xphoto/540x405/288300879.webp?k=20a291605b4d1cc6c15b1ee3f9598c22ddb81a8d5ed73135330e426f8d2b9629&o="
  },
  {
    title: "5 vacation homes for a Thanksgiving getaway",
    desc: "Enjoy Thanksgiving dinner at these vacation homes.",
    img: "https://cf.bstatic.com/xdata/images/xphoto/540x405/281113733.webp?k=43768154acdf2261706ad890b1e6196e0b261f88de846c23d3bf5693de202238&o="
  },
  {
    title: "6 incredible Bangkok rooftop bars",
    desc: "Amazing city views, cocktails, and world-class cuisine.",
    img: "https://cf.bstatic.com/xdata/images/xphoto/540x405/266633264.webp?k=7f9eb9bcfb7cd9189036fd6b28f51eb2373fb877f2b10681ae8abbb7a0c63613&o="
  },
]
const uniqueArr = [
  "67875a41f4b0ac0f7dcfb87a",
  "67810bb5824440db4b93a785",
  "678109aa824440db4b93a708",
  "6787767f313a94ca77e3bb5f",
  "67877447313a94ca77e3ba9e",
  "678772fc313a94ca77e3ba2d",
  "67877113313a94ca77e3b97b",
]

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

  const settingsSearch = {
    infinite: false,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow />,
  };

  console.log("USER", currentUser);

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
      t: TFunctionNonStrict<"translation", undefined>
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
            shadow-searchPopupsShadow p-4 rounded-xl h-[100px] w-[294px] mx-1 my-2"
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
                  {mapUserSearches(currentUser, t)}
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
                {mapUserSearches(currentUser, t)}
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
                {/* <MainCard
                  is_heart={true}
                  propertyId={currentUser.interested[0]}
                />
                <MainCard
                  is_heart={true}
                  propertyId={currentUser.interested[0]}
                />
                <MainCard
                  is_heart={true}
                  propertyId={currentUser.interested[0]}
                /> */}
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
              {[...Array(3)].map((_, index) => (
                <OffersCard key={index} />
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
              {[...Array(3)].map((_, index) => (
                <OffersCard key={index} />
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
              />
            ))}
          </div>
        </div>

        {/* ELCHANAN DO WE REALLY NEED THIS ? */}
        {/* <div className="py-4">
          <h2 className="text-2xl font-bold ">
            {t("home.recentCountryHeader")} {country}
          </h2>
          <h3 className="text-searchGrayText ">
            {t("home.recentCountrySecondaryHeader")}
          </h3>
        </div>
        <Carousel>
          <CarouselPrevious />
          <CarouselContent>
            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
              <Card className="h-40 w-40">
                <img src={DubaiImage} alt="" />
              </Card>
            </CarouselItem>
            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
              <Card className="h-40 w-40">
                <img src={DubaiImage} alt="" />
              </Card>
            </CarouselItem>
            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
              <Card className="h-40 w-40">
                <img src={DubaiImage} alt="" />
              </Card>
            </CarouselItem>
            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
              <Card className="h-40 w-40">
                <img src={DubaiImage} alt="" />
              </Card>
            </CarouselItem>
            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
              <Card className="h-40 w-40">
                <img src={DubaiImage} alt="" />
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselNext />
        </Carousel> */}

        {/* Missing Card Type ... ? */}
        {/* <h2 className="text-2xl font-bold ">
          {t("home.ClosePlacesHeader")} {country}
        </h2>
        <h3 className="text-searchGrayText ">
          {t("home.ClosePlacesSecondaryHeader")}
        </h3>
        <MainNav className={"border-0"} />
        <Carousel>
          <CarouselPrevious />
          <CarouselContent>
            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
              <Card className="h-40 w-40">
                <img src={DubaiImage} alt="" />
              </Card>
            </CarouselItem>
            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
              <Card className="h-40 w-40">
                <img src={DubaiImage} alt="" />
              </Card>
            </CarouselItem>
            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
              <Card className="h-40 w-40">
                <img src={DubaiImage} alt="" />
              </Card>
            </CarouselItem>
            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
              <Card className="h-40 w-40">
                <img src={DubaiImage} alt="" />
              </Card>
            </CarouselItem>
            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
              <Card className="h-40 w-40">
                <img src={DubaiImage} alt="" />
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselNext />
        </Carousel> */}

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
          <div
            className={cn(
              "w-full flex gap-2 overflow-scroll py-4",
              styles.scrollContainer
            )}
          >
            <Card>
              <h2>baba</h2>
              <p>babababa</p>
            </Card>
            <Card>
              <h2>baba</h2>
              <p>babababa</p>
            </Card>
            <Card>
              <h2>baba</h2>
              <p>babababa</p>
            </Card>
            <Card>
              <h2>baba</h2>
              <p>babababa</p>
            </Card>
            <Card>
              <h2>baba</h2>
              <p>babababa</p>
            </Card>
            <Card>
              <h2>baba</h2>
              <p>babababa</p>
            </Card>
            <Card>
              <h2>baba</h2>
              <p>babababa</p>
            </Card>
            <Card>
              <h2>baba</h2>
              <p>babababa</p>
            </Card>
            <Card>
              <h2>baba</h2>
              <p>babababa</p>
            </Card>
            <Card>
              <h2>baba</h2>
              <p>babababa</p>
            </Card>
          </div>
        </div> */}

        {/* //! Looking for the perfect stay? */}
        {/* <div>
          <div className="py-4">
            <h2 className="text-2xl font-bold ">
              {t("home.PerfectPlacesHeader")}
            </h2>
            <h3 className="text-searchGrayText ">
              {t("home.PerfectPlacesSecondaryHeader")}
            </h3>
          </div>
          <div
            className={cn(
              "w-full flex gap-2 overflow-scroll py-4",
              styles.scrollContainer
            )}
          >
            <MainCard propertyId={currentUser.interested[0]}/>
            <MainCard propertyId={currentUser.interested[0]}/>
            <MainCard propertyId={currentUser.interested[0]}/>
            <MainCard propertyId={currentUser.interested[0]}/>
            <MainCard propertyId={currentUser.interested[0]}/>
            <MainCard propertyId={currentUser.interested[0]}/>
            <MainCard propertyId={currentUser.interested[0]}/>

          </div>
        </div> */}

        {/* //! Deals for the weekend */}
        {/* <div>
          <div className="py-4">
            <h2 className="text-2xl font-bold ">
              {t("home.weekendDealsHeader")}
            </h2>
            <h3 className="text-searchGrayText ">
              {t("home.weekendDealsSecondaryHeader") + " "}
              {weedend.fromDate.month +
                " " +
                weedend.fromDate.day +
                " - " +
                weedend.toDate.month +
                " " +
                weedend.toDate.day}
            </h3>
          </div>
          <div
            className={cn(
              "w-full flex gap-2 overflow-scroll py-4",
              styles.scrollContainer
            )}
          >
            <MainCard propertyId={currentUser.interested[0]}/>
            <MainCard propertyId={currentUser.interested[0]}/>
            <MainCard propertyId={currentUser.interested[0]}/>
            <MainCard propertyId={currentUser.interested[0]}/>
            <MainCard propertyId={currentUser.interested[0]}/>
            <MainCard propertyId={currentUser.interested[0]}/>
            <MainCard propertyId={currentUser.interested[0]}/>

          </div>
        </div> */}

        {/* //! Get inspiration for your next trip */}

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
          {isMobile || currentUser.search.length <= 3 ? (
                <MainCarousel>
                  <CardWithDescription className="" />
                  { inspirationArr.map(el =>
                    <CardWithLocationHome title={el.title} description={el.desc} image={el.img} />
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

        {/* Top Unique Carousel */}
        { uniqueArr?.length &&
        <div>
        <div className="py-4">
          <h2 className="text-2xl font-bold ">{t("home.uniqueHeader")}</h2>
          <h3 className="text-searchGrayText ">
            {t("home.uniqueSecondaryHeader")}
          </h3>
        </div>
          {isMobile || currentUser.search.length <= 3 ? (
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
        { uniqueArr?.length &&
        <div>
        <div className="py-4 flex justify-between">
          <h2 className="text-2xl font-bold ">
            {t("home.lovedHomesDealsHeader")}
          </h2>
          <Button variant={"simpleLink"}>{t("home.lovedHomesButton")}</Button>
        </div>
          {isMobile || currentUser.search.length <= 3 ? (
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
