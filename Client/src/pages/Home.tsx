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
import TelAvivImage from "../assets/images/telAviv.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TrendingImages } from "@/utils/staticData.ts";

import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import CardWithDescription from "@/components/CardWithDescritpion";
import { useEffect, useState } from "react";
import MainCarousel from "@/components/MainCarousel.tsx";
import { useSelector } from "react-redux";
import { RootState } from "./../store/index.ts";
import { IUser } from "@/types/userTypes.ts";
import { getCityImage } from "@/utils/functions.ts";
import Slider from "react-slick";
import { TFunctionNonStrict } from "i18next";

interface HomeProps {
  country: string;
}

function SampleNextArrow({
  onClick,
  currentSlide,
  slideCount,
  slidesToShow,
}: any) {
  const isDisabled = currentSlide >= slideCount - slidesToShow;

  return (
    <div onClick={onClick}>
      <svg
        className={`absolute top-1/3 -right-6 z-50 ring-1 ring-gray-100 bg-white rounded-full h-[36px] 
      w-[36px] hover:bg-gray-200 transition-all p-2 cursor-pointer 
      ${isDisabled ? "hidden" : ""}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="50px"
        data-rtl-flip="true"
      >
        <path d="M8.913 19.236a.9.9 0 0 0 .642-.266l6.057-6.057a1.3 1.3 0 0 0 .388-.945c.008-.35-.123-.69-.364-.945L9.58 4.966a.91.91 0 0 0-1.284 0 .896.896 0 0 0 0 1.284l5.694 5.718-5.718 5.718a.896.896 0 0 0 0 1.284.88.88 0 0 0 .642.266"></path>
      </svg>
    </div>
  );
}
function SamplePrevArrow({ onClick, currentSlide }: any) {
  const isDisabled = currentSlide === 0;

  return (
    <div onClick={onClick}>
      <svg
        className={`absolute top-1/3 -left-5 z-50 ring-1 ring-gray-100 bg-white rounded-full h-[36px] 
      w-[36px] hover:bg-gray-200 transition-all p-2 cursor-pointer 
      ${isDisabled ? "hidden" : ""}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="50px"
        data-rtl-flip="true"
      >
        <path d="M15.087 19.236a.9.9 0 0 1-.642-.266l-6.057-6.057A1.3 1.3 0 0 1 8 11.968c-.008-.35.123-.69.364-.945l6.057-6.057a.91.91 0 0 1 1.284 0 .895.895 0 0 1 0 1.284l-5.694 5.718 5.718 5.718a.896.896 0 0 1 0 1.284.88.88 0 0 1-.642.266"></path>
      </svg>
    </div>
  );
}

// Tailwind - render
("col-span-2");
("col-span-3");

function Home({ country }: HomeProps) {
  const HomeMobileWidth = 1140;
  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as IUser;
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < HomeMobileWidth
  );

  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "he";
  const dateLanguage = isRtl ? "he-IL" : "en-US";

  const settingsSearch = {
    infinite: false,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow />,
  };

  console.log(currentUser);

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
  useEffect(() => {}, [dateLanguage]);

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
            {isMobile ? (
              <div
                className={cn(
                  "w-full flex gap-2 overflow-scroll",
                  styles.scrollContainer
                )}
              >
                {mapUserSearches(currentUser, t)}
              </div>
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
            {isMobile ? (
              <div
                className={cn(
                  "w-full flex gap-2 overflow-scroll",
                  styles.scrollContainer
                )}
              >
                {currentUser.interested.map((propertyId) => (
                  <MainCard
                    key={propertyId}
                    is_heart={true}
                    propertyId={propertyId}
                  />
                ))}
                <MainCard
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
                />
                <MainCard
                  is_heart={true}
                  propertyId={currentUser.interested[0]}
                />
              </div>
            ) : (
              <Slider
                key={isRtl ? "rtl" : "ltr"}
                {...{
                  ...settingsSearch,
                  slidesToShow: 3.8,
                  initialSlide: isRtl
                    ? currentUser.interested.length * 2 - 3.8
                    : 0,
                  nextArrow: <SampleNextArrow slidesToShow={3.8} />,
                }}
              >
                {currentUser.interested.map((propertyId) => (
                  <MainCard
                    key={propertyId}
                    is_heart={true}
                    propertyId={propertyId}
                  />
                ))}
                <MainCard
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
                />
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
            <div
              className={cn(
                "w-full flex gap-2 overflow-scroll",
                styles.scrollContainer
              )}
            >
              {[...Array(3)].map((_, index) => (
                <OffersCard key={index} />
              ))}
            </div>
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

        {i18n.language === "en" && (
          <div>
            <div className="py-4">
              <h2 className="text-2xl font-bold ">
                {t("home.inspirationDealsHeader")}
              </h2>
              <Button variant={"simpleLink"}>
                {t("home.inspirationButton")}
              </Button>
            </div>
            <div
              className={cn(
                "w-full flex gap-2 overflow-scroll py-4",
                styles.scrollContainer
              )}
            >
              <CardWithDescription className="flex-shrink-0" />
              <Card className="h-40 w-40 flex-shrink-0">
                <img src={DubaiImage} alt="" />
              </Card>
              <Card className="h-40 w-40 flex-shrink-0">
                <img src={DubaiImage} alt="" />
              </Card>
              <Card className="h-40 w-40 flex-shrink-0">
                <img src={DubaiImage} alt="" />
              </Card>
              <Card className="h-40 w-40 flex-shrink-0">
                <img src={DubaiImage} alt="" />
              </Card>
              <Card className="h-40 w-40 flex-shrink-0">
                <img src={DubaiImage} alt="" />
              </Card>
              <Card className="h-40 w-40 flex-shrink-0">
                <img src={DubaiImage} alt="" />
              </Card>
              <Card className="h-40 w-40 flex-shrink-0">
                <img src={DubaiImage} alt="" />
              </Card>
              <Card className="h-40 w-40 flex-shrink-0">
                <img src={DubaiImage} alt="" />
              </Card>
              <Card className="h-40 w-40 flex-shrink-0">
                <img src={DubaiImage} alt="" />
              </Card>
              <Card className="h-40 w-40 flex-shrink-0">
                <img src={DubaiImage} alt="" />
              </Card>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold ">
            {t("home.lovedHomesDealsHeader")}
          </h2>
          <Button variant={"simpleLink"}>{t("home.lovedHomesButton")}</Button>
        </div>

        <div
          className={cn(
            "w-full flex gap-2 overflow-scroll py-4",
            styles.scrollContainer
          )}
        >
          <MainCard propertyId={currentUser.interested[0]} />
          <MainCard propertyId={currentUser.interested[0]} />
          <MainCard propertyId={currentUser.interested[0]} />
          <MainCard propertyId={currentUser.interested[0]} />
          <MainCard propertyId={currentUser.interested[0]} />
          <MainCard propertyId={currentUser.interested[0]} />
        </div>
        <div className="py-4">
          <h2 className="text-2xl font-bold ">{t("home.uniqueHeader")}</h2>
          <h3 className="text-searchGrayText ">
            {t("home.uniqueSecondaryHeader")}
          </h3>
        </div>
        <div
          className={cn(
            "w-full flex gap-2 overflow-scroll py-4",
            styles.scrollContainer
          )}
        >
          <MainCard propertyId={currentUser.interested[0]} />
          <MainCard propertyId={currentUser.interested[0]} />
          <MainCard propertyId={currentUser.interested[0]} />
          <MainCard propertyId={currentUser.interested[0]} />
          <MainCard propertyId={currentUser.interested[0]} />
          <MainCard propertyId={currentUser.interested[0]} />
          <MainCard propertyId={currentUser.interested[0]} />
        </div>
      </div>
    </div>
  );
}

export default Home;

function mapUserSearches(
  user: IUser,
  t: TFunctionNonStrict<"translation", undefined>
) {
  return user.search.map((details) => (
    <div
      key={details._id}
      className="flex-shrink-0 !flex gap-2 items-center 
        shadow-searchPopupsShadow p-4 rounded-xl h-[100px] w-[294px] mx-1 my-2"
    >
      <img
        className=" rounded-lg h-16 w-16"
        src="https://cf.bstatic.com/xdata/images/region/64x64/59876.jpg?k=711533b814bfa5152506e24d0d424891a41ebb90577413a61d858cbf0bd60d32&o="
        alt={details.location.city}
      />
      <div>
        <b>{details.location.city} </b>
        <p className="text-gray-500">
          <span>
            {details.checkin &&
              new Date(details.checkin).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
              })}
          </span>
          <span>
            {details.checkout && <span>-</span>}
            {details.checkout &&
              new Date(details.checkout).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
              })}
            {", "}
          </span>
          {(Number(details.group_adults) || 0) +
            (Number(details.group_children) || 0) <=
          1 ? (
            <span>{t("home.1 person")}</span>
          ) : (
            <span>
              {Number(details.group_adults) + Number(details.group_children)}{" "}
              {t("home.people")}
            </span>
          )}
        </p>
      </div>
    </div>
  ));
}
