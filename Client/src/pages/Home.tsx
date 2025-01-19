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

import { TrendingImages } from "@/utils/staticData.ts";

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

// Tailwind - render
("col-span-2");
("col-span-3");

const offersArr = [
  {
    title:"Go for a good time, not a long time",
    desc:"Finish your year with a mini break. Save 15% or more when you book and stay by 7 January 2025.",
    button:"Find Late Escape Deals",
    img:"https://q-xx.bstatic.com/xdata/images/xphoto/500x500/420460173.jpeg?k=0654940492bab9993284109d6136f220e700bbb4d5a0a972c4b4de3bdc0d8204&o=" 
  },
  {
    title:"Save on stays worldwide",
    desc:"Start your year with an adventure, saving 15% or more with Early 2025 Deals.",
    button:"Save 15% or more",
    img:kidsImg 
  },
  {
    title: "Escape the Ordinary",
    desc: "Start your year with an adventure. Save up to 20% when you book and stay by 15 February 2025.",
    button: "Explore Early Bird Deals",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3kMUn6mYeJxT6TLuOQ8_x1zdz5NxIMnJZw&s"
  }
]
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
  "677ebec78be19680bdc0aa7f",
  "678109aa824440db4b93a708",
  "67810bb5824440db4b93a785",
  "67875a41f4b0ac0f7dcfb87a",
  "67876104f4b0ac0f7dcfb914",
  "67876453313a94ca77e39afc",
]
const HomeArr = [
  "67876637313a94ca77e39b87",
  "678768f9313a94ca77e39c7f",
  "67877113313a94ca77e3b97b",
  "678772fc313a94ca77e3ba2d",
  "67877447313a94ca77e3ba9e",
  "6787767f313a94ca77e3bb5f",
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
const easyTripObj = {
  outdoors : [
    {
      title: "Zikhron Ya'akov",
      distance: "73 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034195.jpg?k=b3260ed45afde8b3f6f33db6ade0cf17e76a3dafa2153698e5a680580bcb408a&o="
    },
    {
      title: "Arad",
      distance: "84 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034315.jpg?k=9991ed396116b6d766dead284571c49fff8c2eb20d878a5597555acd739be153&o="
    },
    {
      title: "Midreshet Ben Gurion",
      distance: "120 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140052393.jpg?k=98669ffff507d191373b4abb0f31ae1808f2470b51225921bce257cfe2902e67&o="
    },
    {
      title: "Kefar Weradim",
      distance: "127 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140046060.jpg?k=edd093e4f0a3fe021efa00e949ff3af14bcefb06b228c067c98f0d345f675c11&o="
    },
    {
      title: "Amirim",
      distance: "128 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034317.jpg?k=b290864663693fea0d5ff14448a1394f8048df0367c2a1217a409752cc91a53b&o="
    },
    {
      title: "Rosh Pinna",
      distance: "135 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034218.jpg?k=bc6f0819c7c2cea70af1b20ade7d110afd25167c242f8bf8f283099ce1a30339&o="
    },
    {
      title: "Had Nes",
      distance: "136 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140046531.jpg?k=c5f2c5634a4d58f7880d572f58e578e5a87873dc2d7320672a8b358efc3289fa&o="
    },
    {
      title: "Qasrîne",
      distance: "145 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140015356.jpg?k=c8d9f8882557074cd6a18e6f57501640772cb9cd8bceb3ca59210516f070c3e3&o="
    },
    {
      title: "Mitzpe Ramon",
      distance: "146 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140051118.jpg?k=19e7e875f7b02759fd871a331ce3bab5663fc3e9c39008f60cef7282b5453260&o="
    }
  ],
  beach: [
    {
      title: "Rishon LeẔiyyon",
      distance: "4.2 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034219.jpg?k=660d61e5a83380c6da83559e7ed5fc89d38b122ddbe82d9939c50afb9ac2f633&o="
    },
    {
      title: "Bat Yam",
      distance: "11 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034310.jpg?k=665f9aabad6b08d1613a309c2ddc15656633de923f4e83b5414585a1a5f8107c&o="
    },
    {
      title: "Tel Aviv",
      distance: "17 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034205.jpg?k=ba18b085be5bab9bd27a82ccc79dbc91c2160912a15d9f45af7ef54d11f74d92&o="
    },
    {
      title: "Ashdod",
      distance: "20 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034313.jpg?k=95697f0fa7b280d24a7fd66e51859dd9d5f7e09ca2e29ed7fb33077d1d594f48&o="
    },
    {
      title: "Herzliya",
      distance: "27 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034268.jpg?k=018123373b35d93c45c8085f4ab4d8a369e6e166c4b03c72b9da3a6b44aca5b7&o="
    },
    {
      title: "Ashkelon",
      distance: "36 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034312.jpg?k=a3b79665fbd1a3d0bac1c73ab37706374dee36ed8a4d72f54096c1fcf7400f82&o="
    },
    {
      title: "Netanya",
      distance: "45 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034232.jpg?k=3a31fcfccbcbc8052c3b6f42b407e6e9b93bc449e31cff4bbad5ed3784f14824&o="
    },
    {
      title: "Mikhmoret",
      distance: "54 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034239.jpg?k=bc81d5029cdb2ee977e4e12b5317f5f12ea331f87b5d7c102aaca6857b4443c4&o="
    },
    {
      title: "H̱adera",
      distance: "58 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034274.jpg?k=13cc8c6d4687ac52522bc7a68dc820fb07b512ad2a72055c28bccd640d49a8f9&o="
    },
    {
      title: "Caesarea",
      distance: "66 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034214.jpg?k=711a0fd5530a7a370b3a3af67bd69e46c1ef714adee49c1fd0a96a04a8c777b3&o="
    },
    {
      title: "Dor",
      distance: "77 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034293.jpg?k=1d5e18dada82a31d981b6041333dbae348556871dd38ba4527f821c2d49cc31f&o="
    },
  ],
  romance: [
    {
      title: "Ramat Gan",
      distance: "16 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034222.jpg?k=2f64ed82713b2f01a652d5d7f2ac96d4a0b9d61e85f8f011de81c8665a2bf5fc&o="
    },
    {
      title: "Beer Sheva",
      distance: "75 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034308.jpg?k=7fa481044d119d17f5c01a00a5a799358eed64fd1c66848e1184042a773d9253&o="
    },
    {
      title: "Haifa",
      distance: "101 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034269.jpg?k=ecd2e266b1934d7baac592c499390b8fe525d20ffe3bec487a776591c87d4138&o="
    },
    {
      title: "Yavneʼel",
      distance: "109 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034202.jpg?k=6de0858122897f42014a65cc938284a7e0d6901210125a6c56bd73fd54e7ddc2&o="
    },
    {
      title: "Livnim",
      distance: "123 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140051705.jpg?k=216052d3233d8cec3eb0aaabf92348540e6c5676e1f6070be49f02dd61d636c9&o="
    },
    {
      title: "Neot Golan",
      distance: "127 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140051712.jpg?k=291c9cd28a8e1cc542650debb694d0837ccc8909db2d78325da448a1b2cce0ab&o="
    },
    {
      title: "Ramot Naftali",
      distance: "148 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034220.jpg?k=658f48467ccf13377bb98750d5c352e89ba89556aa5ea0b1d8a20bb969f32c93&o="
    },
  ],
  city: [
    {
      title: "Jerusalem",
      distance: "43 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140050084.jpg?k=5e92410af29416aaee6dfaa52249c26b57418d22fbb00373378632e49e8b1d6e&o="
    },
    {
      title: "Nazareth",
      distance: "99 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034235.jpg?k=14d3f60aba1a2b73280740fc55b8ebe841446d9f0f4f626575fd85fd88726bcb&o="
    },
    {
      title: "Acre",
      distance: "114 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034318.jpg?k=b957f73a8e01ba08a7fb4671ef4d90685e8a26462d132a0ea33b028f37eb735e&o="
    },
    {
      title: "Safed",
      distance: "133 km away",
      img: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140034196.jpg?k=154576a207c2245da5a62e2cca16d62b44e098f30f682ccc46227d1b2260a5ff&o="
    },
  ]

} as any

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
