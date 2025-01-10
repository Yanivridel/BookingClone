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

interface HomeProps {
  country: string;
}

function SampleNextArrow({onClick, currentSlide, slideCount }: any) {
  const isDisabled = currentSlide === slideCount - 1; 

  return (
    <div
    onClick={onClick}
    >
      <svg
      className={`absolute top-7 -right-6 z-50 ring-1 ring-gray-100 bg-white rounded-full h-[36px] 
      w-[36px] hover:bg-gray-200 transition-all p-2 ${isDisabled ? 'hidden' : ''}`}
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50px" data-rtl-flip="true"><path d="M8.913 19.236a.9.9 0 0 0 .642-.266l6.057-6.057a1.3 1.3 0 0 0 .388-.945c.008-.35-.123-.69-.364-.945L9.58 4.966a.91.91 0 0 0-1.284 0 .896.896 0 0 0 0 1.284l5.694 5.718-5.718 5.718a.896.896 0 0 0 0 1.284.88.88 0 0 0 .642.266"></path></svg>
    </div>
  );
}
function SamplePrevArrow({onClick, currentSlide }: any) {
  console.log("currentSlide ", currentSlide )
  const isDisabled = currentSlide === 1;
  return (
    <div
    onClick={onClick}
    >
      <svg
      className={`absolute top-7 -left-5 z-50 ring-1 ring-gray-100 bg-white rounded-full h-[36px] 
      w-[36px] hover:bg-gray-200 transition-all p-2 
      ${isDisabled ? 'hidden' : ''}`}
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50px" data-rtl-flip="true"><path d="M15.087 19.236a.9.9 0 0 1-.642-.266l-6.057-6.057A1.3 1.3 0 0 1 8 11.968c-.008-.35.123-.69.364-.945l6.057-6.057a.91.91 0 0 1 1.284 0 .895.895 0 0 1 0 1.284l-5.694 5.718 5.718 5.718a.896.896 0 0 1 0 1.284.88.88 0 0 1-.642.266"></path></svg>
    </div>
  );
}

function Home({ country }: HomeProps) {
  const currentUser = useSelector((state: RootState) => state.currentUser) as unknown as IUser;
  const [searchSlidesToShow, setSlidesToShow] = useState(3.5);

  
  const settingsSearch = {
    infinite:false,
    slidesToScroll: 1, 
    slidesToShow: searchSlidesToShow,
    // centerMode: true,
    // variableWidth: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true
    //     }
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       initialSlide: 2
    //     }
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1
    //     }
    //   }
    // ]
  };
  
  console.log(currentUser);

  useEffect(() => {
    const updateSlidesToShow = () => {
      console.log("window.innerWidth",window.innerWidth)
      const carouselWidth = window.innerWidth * 0.9;
      const cardWidth = 294;
      const margin = 8;
      if(carouselWidth < 1100)
        setSlidesToShow(carouselWidth / (cardWidth + 2 * margin));
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const { t, i18n } = useTranslation();

  const dateLanguage = i18n.language === "he" ? "he-IL" : "en-US";

  const currentDate = new Date();

  const dayOfWeek = currentDate.getDay();
  const daysToFriday = (5 - dayOfWeek + 7) % 7;

  const friday = new Date(currentDate);
  friday.setDate(currentDate.getDate() + daysToFriday);

  const sunday = new Date(currentDate);
  sunday.setDate(currentDate.getDate() + daysToFriday + 2);
  const monthOptions: Intl.DateTimeFormatOptions = {
    month: "long",
  };
  const dayOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
  };

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
      <div className="p-1 pt-[346px]">
        <Search></Search>
        {currentUser.search.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold py-4 ">
              {t("home.recentSearchHeader")}
            </h2>
            {/* <div
              className={cn(
                "w-full flex gap-2 overflow-scroll py-4",
                styles.scrollContainer
              )}
            > */}
            <div className="slider-container">
            <Slider {...settingsSearch}>
              {currentUser.search.map((details) => (
                <div
                  key={details._id}
                  className="flex-shrink-0 !flex gap-2 items-center 
                  shadow-searchPopupsShadow p-2 rounded-xl h-[100px] w-[294px] mx-2 my-2"
                >
                  <img
                    className=" rounded-lg h-16 w-16"
                    src="https://placehold.it/300x200"
                    alt={details.location.city}
                  />
                  <div>
                    <b>{details.location.city} </b>
                    <p className="">
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
                      </span>
                      <span>{", "}</span>
                      {(Number(details.group_adults) || 0) +
                        (Number(details.group_children) || 0) <=
                      1 ? (
                        <span>1 person</span>
                      ) : (
                        <span>
                          {Number(details.group_adults) +
                            Number(details.group_children)}{" "}
                          people
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
            </div>
          </div>
        )}
        <h2 className="text-2xl font-bold py-4">
          {t("home.interestedInHeader")}
        </h2>

        <MainCarousel>
          <MainCard is_heart={true} />
          <MainCard is_heart={true} />
          <MainCard is_heart={true} />
          <MainCard is_heart={true} />
          <MainCard is_heart={true} />
          <MainCard is_heart={true} />
          <MainCard is_heart={true} />
        </MainCarousel>
        <div className="py-4">
          <h2 className="text-2xl font-bold ">{t("home.OffersHeader")}</h2>
          <h3 className="text-searchGrayText ">
            {t("home.OffersSecondaryHeader")}
          </h3>
        </div>
        <Carousel>
          <CarouselPrevious />
          <CarouselContent>
            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
              <OffersCard />
            </CarouselItem>
            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
              <OffersCard />
            </CarouselItem>
            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
              <OffersCard />
            </CarouselItem>
            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
              <OffersCard />
            </CarouselItem>
            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
              <OffersCard />
            </CarouselItem>
          </CarouselContent>
          <CarouselNext />
        </Carousel>
        <div className="py-4">
          <h2 className="text-2xl font-bold">
            {t("home.trandingDestinationsHeader")}
          </h2>
          <h3>{t("home.trandingDestinationsSecondaryHeader")}</h3>
        </div>
        <div className="grid grid-cols-6 gap-4">
          <ImageCard className="col-span-3" />
          <ImageCard className="col-span-3" />
          <ImageCard className="col-span-2" />
          <ImageCard className="col-span-2" />
          <ImageCard className="col-span-2" />
        </div>
        <div className="py-4">
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
        </Carousel>
        <h2 className="text-2xl font-bold ">
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
        </Carousel>
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
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
        </div>
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
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
        </div>
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
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
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
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
        </div>

        <div className="p-12">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quas,
          mollitia sapiente necessitatibus voluptatum, consequatur aliquid error
          quam debitis ipsa obcaecati esse illo sit, repellat alias. Illo
          aliquid nesciunt ratione. Sequi consequatur tempore repellat suscipit
          nam nesciunt, tenetur voluptatem at quam, earum doloribus. Nostrum
          aliquid alias praesentium non, ullam doloremque beatae sed ipsum optio
          perferendis quibusdam architecto numquam quisquam temporibus? Sint
          tenetur quae earum in tempora similique hic repudiandae veritatis
          ipsam libero autem unde debitis minus maxime, assumenda dignissimos
          explicabo ad harum. Voluptatibus perspiciatis aliquam dolorem quae
          blanditiis eum labore. Dolor facere officiis pariatur, repellat
          repudiandae aliquid nesciunt consectetur voluptatem, cum, magni culpa
          harum sit. Voluptate doloribus quibusdam corrupti? Tenetur nulla
          possimus minus commodi, autem assumenda explicabo a necessitatibus
          aliquid? Laborum ipsum ullam vero doloribus ducimus! Id accusamus,
          alias possimus accusantium omnis facilis magnam incidunt, assumenda
          consequatur quos mollitia fuga maxime impedit repudiandae a eveniet,
          libero dolore reiciendis eaque ad. Nulla velit laudantium eaque
          tempore dolores quos quia ad consectetur aspernatur in deserunt vitae
          possimus voluptate, accusantium fugiat nisi sit explicabo optio fuga,
          vero ipsam. Recusandae impedit commodi molestias quibusdam? Obcaecati
          fuga aliquid, magni aut quam ipsa incidunt perferendis perspiciatis
          molestias reprehenderit expedita! Rem dicta, sit cupiditate odit,
          ipsam quibusdam sint ratione omnis veniam provident quae, ad eos sequi
          eveniet. Laborum et sunt eveniet porro tenetur illum, ducimus, vel
          sequi quas distinctio perspiciatis blanditiis eum debitis libero
          voluptatem. Provident dolorum tempora quasi, esse accusamus itaque!
          Quos voluptatum reiciendis consequuntur officia. Eveniet, quam impedit
          aspernatur enim optio ex mollitia culpa magni ea minus cupiditate
          harum eos a sed rerum reiciendis corporis vel corrupti praesentium
          distinctio rem error officiis natus facere. Reiciendis. Natus placeat
          labore dolorem cumque adipisci tenetur assumenda fuga? Illo aperiam,
          laborum reiciendis sunt corrupti esse aspernatur inventore? Ad numquam
          sequi iusto qui odit! Non, unde. Iure voluptates accusamus corporis.
        </div>
      </div>
    </div>
  );
}

export default Home;
