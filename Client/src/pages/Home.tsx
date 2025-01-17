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
const propertyTypesArr = [
  {
    title: "home.hotels",
    img: "https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550862.jpeg?k=3514aa4abb76a6d19df104cb307b78b841ac0676967f24f4b860d289d55d3964&o="
  },
  {
    title: "home.Apartments",
    img: "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595548591.jpeg?k=01741bc3aef1a5233dd33794dda397083092c0215b153915f27ea489468e57a2&o="
  },
  {
    title: "home.Resorts",
    img: "https://q-xx.bstatic.com/xdata/images/hotel/263x210/595551044.jpeg?k=262826efe8e21a0868105c01bf7113ed94de28492ee370f4225f00d1de0c6c44&o="
  },
  {
    title: "home.Villas",
    img: "https://q-xx.bstatic.com/xdata/images/hotel/263x210/620168315.jpeg?k=300d8d8059c8c5426ea81f65a30a7f93af09d377d4d8570bda1bd1f0c8f0767f&o="
  },
  {
    title: "home.Cabins",
    img: "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595549239.jpeg?k=ad5273675c516cc1efc6cba2039877297b7ad2b5b3f54002c55ea6ebfb8bf949&o="
  },
  {
    title: "home.Cottages",
    img: "https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550000.jpeg?k=71eeb3e0996d7f734e57a6fa426c718749a36df768ca5d2fb1dc65fcd7483c1d&o="
  },
  {
    title: "home.ServicedApartments",
    img: "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595551195.jpeg?k=fe19403cca087623a33bf24c4154a636cd26d04c2aa948634fb05afa971e7767&o="
  },
  {
    title: "home.VacationHomes",
    img: "https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550229.jpeg?k=2ae1f5975fa1f846ac707d3334eb604a7e8f817f640cbd790185b2691532476b&o="
  },
  {
    title: "home.GuestHouses",
    img: "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595550178.jpeg?k=1db9bffadd03a0f2a9f0a06ba6c7751b16465f2dd251738f229d7a57dca799ef&o="
  },
  {
    title: "home.Hostels",
    img: "https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550415.jpeg?k=8967853a074040381dfa25a568e6c780e309b529e0c144995c5bbc9644721eca&o="
  },
  {
    title: "home.Motels",
    img: "https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550975.jpeg?k=6d2c22368ec017e1f99a4811c8abb1cb2d7fd829c9ddd12a82ff1aa77ab7da19&o="
  },
  {
    title: "home.B&Bs",
    img: "https://q-xx.bstatic.com/xdata/images/hotel/263x210/595549020.jpeg?k=f5df2d3dc0000073bef517b0cab9593036f3f1aafa2421df31a6538a8c56b834&o="
  },
  {
    title: "home.Ryokans",
    img: "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595551145.jpeg?k=52a1d8bd9bc1f2199bf8d95f5399377c521d3a6291013e3a36f4dbeecd337bd7&o="
  },
  {
    title: "home.Riads",
    img: "https://q-xx.bstatic.com/xdata/images/hotel/263x210/595551127.jpeg?k=3ce17a8b06333670edd53b58e47ab30acebb737f3bd21ebc7ea2ea849be7dc3e&o="
  },
  {
    title: "home.ResortVillages",
    img: "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595550306.jpeg?k=00c1d9a10179cc21b1e7e2ad1429ac21a5e779f258cf4cf66ddce30d618c05c9&o="
  },
  {
    title: "home.Homestays",
    img: "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595550377.jpeg?k=ef93cbc1a3af0d6db84e27b6da280a4ef24dbcfeb065fcfeae4fe9c43dddd2da&o="
  },
  {
    title: "home.Campgrounds",
    img: "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595549938.jpeg?k=88e50f4acf09b4edc03ca94818723b3baca6eeaf49bf318edf8dc6690775c480&o="
  },
  {
    title: "home.CountryHouses",
    img: "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595550059.jpeg?k=323042e47ead9072a6ca4cd3386519f9c59faff1b74043d17b486dbd5f0d5d67&o="
  },
  {
    title: "home.FarmStays",
    img: "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595550098.jpeg?k=d1b5a6f6faa0c76496d57dd0d263a88c07ad220b3873e14fcd71c9d8a81c5c25&o="
  },
  {
    title: "home.Boats",
    img: "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595549146.jpeg?k=ac87efa3e3faf75d3d5e24376940d48f3a0c46d73dee59fce17907166502552e&o="
  },
  {
    title: "home.LuxuryTents",
    img: "https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550925.jpeg?k=c0db68290ad93f4dea18b95395397a874a8801159fb4d6308bd6164ebcd28a11&o="
  },
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
                  <CardWithDescription/>
                  { inspirationArr.map(el =>
                    <CardWithLocationHome title={el.title} description={el.desc} 
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
          {isMobile || currentUser.search.length <= 3 ? (
                <MainCarousel>
                  { propertyTypesArr.map(prop =>
                    <CardWithLocationHome key={prop.title} title={t(prop.title)} 
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
                    <CardWithLocationHome key={prop.title} title={t(prop.title)}
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
