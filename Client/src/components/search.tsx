import styles from "@/css/search.module.css";
import { t } from "i18next";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { he, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { searchCalendarButtonsData, monthsAndYears } from "@/utils/staticData";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { EmptyCalendarImg, IconMen } from "./ui/Icons";
import { cn } from "@/lib/utils";
import SearchPeople from "./SearchPeople";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAutocompleteLocations } from "@/utils/api/propertyApi";

import { makeUrlForSearch } from "@/utils/functions";
import { modifyUserArrays } from "@/utils/api/userApi";
import { useDispatch } from "react-redux";
import { addSearchEntry } from "@/store/slices/userSlices";
import { ISearchPropertiesReq } from "@/types/propertyTypes";
import MainCarousel from "./MainCarousel";

// location initial data data
const items: LocationRes[] = [
  {
    location: {
      _id: "1a",
      city: "Ramat gan",
      country: "Israel",
      region: "Tel Aviv District",
    },
    matchedIn: "city",
  },
  {
    location: {
      _id: "2",
      city: "Tel aviv",
      country: "Israel",
      region: "Tel Aviv District", // אזור רלוונטי
      addressLine: "3323",
    },
    matchedIn: "addressLine",
  },
  {
    location: {
      _id: "3",
      city: "Jerusalem",
      country: "Israel",
      region: "Jerusalem District",
    },
    matchedIn: "city",
  },
  {
    location: {
      _id: "4",
      city: "Haifa",
      country: "Israel",
      region: "Haifa District",
    },
    matchedIn: "city",
  },
  {
    location: {
      _id: "6",
      city: "Maon",
      country: "Israel",
      region: "Southern District",
    },
    matchedIn: "city",
  },
  {
    location: {
      _id: "5",
      city: "Beer sheva",
      country: "Israel",
      region: "Southern District",
    },
    matchedIn: "city",
  },
];

export interface MonthNameYear {
  month?: number;
  monthName?: string;
  year: number;
}

export interface Location {
  _id?: string;
  country: string;
  region?: string | null;
  city?: string | null;
  addressLine?: string | null;
}

export interface LocationRes {
  location: Location;
  matchedIn: "region" | "city" | "country" | "addressLine";
}

// ! need to get props "isAllHome" that make the search diffrent

function Search() {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // * place
  const [openLocationDropDown, setOpenLocationDropDown] = useState(false);
  const [locationInputValue, setLocationInputValue] = useState("");
  const [locationSearchRes, setLocationSearchRes] =
    useState<LocationRes[]>(items); // for drop down initialization
  const [finalLocation, setFinalLocation] = useState<Location>({
    country: searchParams.get("country") ?? "Israel",
    region: searchParams.get("region") ?? null,
    city: searchParams.get("city") ?? null,
    addressLine: searchParams.get("addressLine") ?? null,
  });

  // * dates
  const [isOther, setIsOther] = useState<boolean>(false);
  const [variant, setVariant] = useState<"default" | "disabled">("disabled");

  const [openDatesPopHover, setOpenDatesPopHover] = useState(false);
  const [clickedMonthsCards, setClickedMonthsCards] = useState<MonthNameYear[]>(
    []
  );
  const [rangeDates, setRangeDates] = React.useState<DateRange | undefined>({
    from: new Date(searchParams.get("startDate") || new Date()),
    to: new Date(searchParams.get("endDate") || addDays(new Date(), 6)),
  });

  const [activePlusMinusButton, setActivePlusMinusButton] =
    useState<string>("");
  const [activeNavButton, setActiveNavButton] = useState<string>("calendar");
  const [isWeekend, setIsWeekend] = useState(false);
  const [preferredDays, setPreferredDays] = useState("");
  const [fromDay, setFromDay] = useState("1");
  const [nights, setNights] = useState("1");

  // * people && rooms

  const [openPeoplePopHover, setOpenPeoplePopHover] = useState(false);
  const [adultsCount, setAdultsCount] = useState(
    parseInt(searchParams.get("adults") || "1")
  );
  const [childrenCount, setChildrenCount] = useState(
    searchParams.get("childrenAges")
      ? searchParams.get("childrenAges")!.length <= 2
        ? 1
        : searchParams.get("childrenAges")?.split(",")?.length ?? 0
      : 0
  );
  const [roomsCount, setRoomsCount] = useState(
    Number(searchParams.get("rooms") ?? 1)
  );
  const [isPets, setIsPets] = useState(!!searchParams.get("isAnimalAllowed"));
  const [childrenAges, setChildrenAges] = useState<
    (number | typeof NaN | undefined | null | "")[]
  >(
    searchParams.get("childrenAges")
      ? searchParams
          .get("childrenAges")!
          .split(",")
          .map((age) => {
            const num = parseInt(age.trim(), 10);
            return isNaN(num) ? "" : num;
          })
      : []
  );

  const generateLocationChain = () => {
    const country = searchParams.get("country");
    const region = searchParams.get("region");
    const city = searchParams.get("city");
    const addressLine = searchParams.get("addressLine");

    const locationParts: string[] = [];

    if (country) locationParts.push(country);
    if (region) locationParts.push(region);
    if (city) locationParts.push(city);
    if (addressLine) locationParts.push(addressLine);

    return locationParts.join(", ");
  };

  // Changing searchParams
  useEffect(() => {
    setLocationInputValue(generateLocationChain());
    setFinalLocation({
      country: searchParams.get("country") ?? "Israel",
      region: searchParams.get("region") ?? null,
      city: searchParams.get("city") ?? null,
      addressLine: searchParams.get("addressLine") ?? null,
    });

    setRangeDates({
      from: new Date(searchParams.get("startDate") || new Date()),
      to: new Date(searchParams.get("endDate") || addDays(new Date(), 6)),
    });

    setAdultsCount(parseInt(searchParams.get("adults") || "1"));
    setChildrenCount(
      searchParams.get("childrenAges")
        ? searchParams.get("childrenAges")!.split(",").length
        : 0
    );
    setRoomsCount(Number(searchParams.get("rooms") ?? 1));
    setIsPets(!!searchParams.get("isAnimalAllowed"));
    setChildrenAges(
      searchParams.get("childrenAges")
        ? searchParams
            .get("childrenAges")!
            .split(",")
            .map((age) => parseInt(age.trim(), 10) || "")
        : []
    );
  }, [searchParams]);

  const dispatch = useDispatch();

  const finalData = {
    primary: {
      location: {
        country: finalLocation.country,
        region: finalLocation.region,
        city: finalLocation.city,
        addressLine: finalLocation.addressLine,
      },
      date: {
        startDate:
          activeNavButton === "calendar" || clickedMonthsCards.length === 0
            ? rangeDates?.from
            : null,
        endDate:
          activeNavButton === "calendar" || clickedMonthsCards.length === 0
            ? rangeDates?.to
            : null,
        length: Number(preferredDays) || Number(nights),
        fromDay,
        yearMonths: clickedMonthsCards,
        isWeekend: isWeekend,
      },
      options: {
        adults: adultsCount,
        childrenAges: childrenAges,
        rooms: roomsCount,
        isAnimalAllowed: isPets,
      },
    },
  } as unknown as ISearchPropertiesReq;

  const { i18n } = useTranslation();
  const currentLocale = i18n.language === "he" ? he : enUS;

  // * place input (include drop down)
  // trigger
  const handleFocus = () => {
    setOpenLocationDropDown(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setOpenLocationDropDown(false);
    }, 100);
  };

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setLocationInputValue(e.target.value);
      if (e.target.value.length > 0) {
        const res = await getAutocompleteLocations(e.target.value);
        res.length > 0 && setLocationSearchRes(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // drop down
  const handleLocationListClick = (
    element: Location,
    matchedIn: string,
    locationChain: string | null
  ) => {
    setLocationInputValue(() => [matchedIn, locationChain].join(", "));
    const locationToSet = {} as Location;
    locationToSet["country"] = element.country;
    if (matchedIn !== element.country) {
      locationToSet["region"] = element.region;
      if (matchedIn !== element.region) {
        locationToSet["city"] = element.city;
        if (matchedIn !== element.city) {
          locationToSet["addressLine"] = element.addressLine;
        }
      }
    }

    setFinalLocation(locationToSet);
  };

  // * dates

  const handlePlusMinusButtonClick = (buttonName: string) => {
    setActivePlusMinusButton(buttonName);
  };

  const handleNavButtonClick = (buttonName: string) => {
    setActiveNavButton(buttonName);
  };

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    if (!selectedDate || !selectedDate.from) {
      setRangeDates(selectedDate);
      return;
    }

    if (!selectedDate.to) {
      if (selectedDate.from.getTime() === rangeDates?.from?.getTime()) {
        return;
      }
      setRangeDates({ from: selectedDate.from, to: undefined });
      return;
    }

    if (selectedDate.from.getTime() === selectedDate.to.getTime()) {
      setRangeDates({ from: selectedDate.from, to: undefined });
    } else {
      setRangeDates(selectedDate);
    }
  };

  // months and years
  const handleClickMonthCard = (monthYear: MonthNameYear) => {
    let newClickedButtons = [];
    if (
      clickedMonthsCards.some(
        (clickedMonth) =>
          clickedMonth.monthName === monthYear.monthName &&
          clickedMonth.year === monthYear.year
      )
    ) {
      // button clicked already - remove:
      newClickedButtons = clickedMonthsCards.filter((element) => {
        return element.monthName !== monthYear.monthName;
      });
    } else {
      // button not clicked:
      newClickedButtons = [...clickedMonthsCards, { ...monthYear }];
    }
    console.log(newClickedButtons);

    setClickedMonthsCards(newClickedButtons);
  };

  //  preferred days - months and day number
  const handleRadioGroup = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLInputElement;
    if (target.value !== undefined) {
      setPreferredDays(target.value);
      if (target.value === "weekend") {
        setIsWeekend(true);
      } else {
        setIsWeekend(false);
      }
    }
  };

  const handleFromDayClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromDay(e.target.value);
  };

  //hebrew format
  const formattedHebrew = "EEE, dd MMMM";
  // english format
  const formattedEnglish = "EEE, MMM dd";

  //  preferred days - months and day number
  const handleSubmit = async () => {
    const url = makeUrlForSearch(finalData);
    navigate(url);
    try {
      const updatedUser = await modifyUserArrays("add", {
        search: finalData.primary,
      });
      dispatch(addSearchEntry(updatedUser.search));
    } catch (err) {
      console.log("React Client Error: ", err);
    }
  };

  useEffect(() => {
    if (preferredDays === "other") {
      setIsOther(true);
    } else setIsOther(false);
  }, [preferredDays]);

  useEffect(() => {
    clickedMonthsCards.length > 0 && preferredDays !== ""
      ? setVariant("default")
      : setVariant("disabled");
  }, [clickedMonthsCards, preferredDays]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const locationDropdownMap = {} as any;

  return (
    <form className="p-2 text-[14px]">
      <Card
        dir={i18n.language === "he" ? "rtl" : "ltr"}
        className="border-search flex flex-col md rounded-[8px] p-1 bg-search gap-1 search:flex-row  font-medium justify-items-stretch"
      >
        {/* input + modal */}
        <div className="border-search bg-white rounded-[4px] p-[11.5px] flex hover:border-[#f56700] search:basis-1/3">
          <div className="relative ">
            {/* open modal */}
            <Card
              className={`border-0 absolute top-10 start-[-12px] shadow-searchPopupsShadow z-[60] ${
                openLocationDropDown ? "" : "hidden"
              } w-[430px] rounded-[8px] max-w-[90vw] overflow-x-auto`}
            >
              <div className="p-3 font-bold">
                {/* only when initialized */}
                {locationSearchRes && t("search.dropDouwnHeader")}
              </div>
              <ul>
                {locationSearchRes?.map((element, i) => {
                  const header =
                    element.location[element.matchedIn] ||
                    element.location.country;
                  const subHeader =
                    element.matchedIn === "region"
                      ? element.location.country
                      : element.matchedIn === "city"
                      ? `${element.location.region}, ${element.location.country} `
                      : element.matchedIn === "addressLine"
                      ? `${element.location.city}, ${element.location.region}, ${element.location.country} `
                      : null;
                  if (locationDropdownMap[header + subHeader]) return null;
                  locationDropdownMap[header + subHeader] = 1;

                  return (
                    Object.values(locationDropdownMap).length < 5 && (
                      <li
                        onClick={() =>
                          handleLocationListClick(
                            element.location,
                            header,
                            subHeader
                          )
                        }
                        key={element.location._id}
                        className={`${
                          i !== locationSearchRes.length - 1 && " border-b"
                        } border-[#e7e7e7] p-2  hover:bg-[#1a1a1a0f] cursor-pointer`}
                      >
                        <div className="flex gap-2 items-center">
                          {/*? element.icon */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                          >
                            <path d="M15 8.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0m1.5 0a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0M12 1.5a6.75 6.75 0 0 1 6.75 6.75c0 2.537-3.537 9.406-6.75 14.25-3.214-4.844-6.75-11.713-6.75-14.25A6.75 6.75 0 0 1 12 1.5M12 0a8.25 8.25 0 0 0-8.25 8.25c0 2.965 3.594 9.945 7 15.08a1.5 1.5 0 0 0 2.5 0c3.406-5.135 7-12.115 7-15.08A8.25 8.25 0 0 0 12 0"></path>
                          </svg>
                          <div className="flex flex-col">
                            <span className="font-bold">{header} </span>
                            <span className="text-xs font-normal">
                              {subHeader}
                            </span>
                          </div>
                        </div>
                      </li>
                    )
                  );
                })}
              </ul>
            </Card>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-[#595959]"
          >
            <path d="M2.75 12h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25m0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18m22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0m-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0m-13.25-3h7a.25.25 0 0 1 .25.25v2.75l.75-.75h-9l.75.75V8.5a.25.25 0 0 1 .25-.25m0-1.5A1.75 1.75 0 0 0 6.75 8.5v2.75c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75V8.5a1.75 1.75 0 0 0-1.75-1.75z"></path>
          </svg>
          {/* trigger - when focus */}
          <input
            type="text"
            placeholder={t("search.placholderInput")}
            aria-label={t("search.placholderInput")} // for screen readers
            aria-controls="autocomplete-results" // for screen readers
            className="flex-grow py-1 px-2 focus:outline-none placeholder:text-black placeholder:font-medium flex"
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={locationInputValue}
          />
        </div>
        {/* date */}
        <Popover open={openDatesPopHover} onOpenChange={setOpenDatesPopHover}>
          <div className=" border-search  bg-white rounded-[4px] p-[11.5px]  flex hover:border-[#f56700]  cursor-pointer  search:basis-1/3 ">
            <PopoverContent
              className=" w-auto p-0 shadow-searchPopupsShadow PopoverContent rounded-none max-w-[90vw] overflow-x-auto"
              sideOffset={11.5}
              side="bottom"
              align={"start"}
              alignOffset={-11.5}
              avoidCollisions={false}
            >
              <div className="px-3 flex ">
                <Button
                  className="flex-grow"
                  variant={
                    activeNavButton === t("search.calendar")
                      ? "navBarUnderlineSelected"
                      : "navBarUnderline"
                  }
                  size="navBarUnderline"
                  onClick={() => handleNavButtonClick("calendar")}
                >
                  {t("search.caledar")}
                </Button>
                <Button
                  className="flex-grow"
                  variant={
                    activeNavButton === t("search.flexible")
                      ? "navBarUnderlineSelected"
                      : "navBarUnderline"
                  }
                  size="navBarUnderline"
                  onClick={() => handleNavButtonClick("flexible")}
                >
                  {t("search.flexible")}
                </Button>
              </div>
              {/* calender */}
              {activeNavButton === "calendar" && (
                <Calendar
                  className="overflow-auto"
                  initialFocus
                  mode="range"
                  classNames={{
                    months: "flex flex-row gap-4",
                  }}
                  fromDate={new Date()}
                  defaultMonth={rangeDates?.from}
                  selected={rangeDates}
                  onSelect={handleDateSelect}
                  numberOfMonths={2}
                  locale={currentLocale}
                  dir={i18n.language === "he" ? "rtl" : "ltr"}
                />
              )}
              {activeNavButton === "calendar" && (
                <div className="flex justify-end gap-2 py-4 mx-6  border-t-[1px] border-[#e7e7e7]">
                  <MainCarousel >
                  {searchCalendarButtonsData.map((element) => (
                    <Button
                      key={element.text}
                      variant={"navBarRounded"}
                      className={` ${
                        activePlusMinusButton === element.text &&
                        "border-[#006ce4] text-[#006ce4] bg-[#f2f6fe]"
                      }`}
                      onClick={() => handlePlusMinusButtonClick(element.text)}
                    >
                      <span className="text-xs ">{t(element.text)}</span>
                      {element.icon && (
                        <element.icon
                          className={` ${
                            activePlusMinusButton === element.text &&
                            " fill-[#006ce4]"
                          } `}
                        />
                      )}
                    </Button>
                  ))}
                  </MainCarousel>
                </div>
              )}
              {/* flexible*/}
              {activeNavButton === "flexible" && (
                <div className="px-4  w-[642px]">
                  <h3 className="font-bold text-base pt-8">
                    {t("search.flexibleHeader")}
                  </h3>
                  <RadioGroup
                    dir={i18n.language === "he" ? "rtl" : "ltr"}
                    loop={true}
                    className="py-2"
                    value={preferredDays}
                    onClick={handleRadioGroup}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={"weekend"} id="weekend" />
                      <Label htmlFor="weekend" className="font-normal">
                        {t("search.flexibleRadioGroup.0")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={"5"} id="A week" />
                      <Label htmlFor="A week" className="font-normal">
                        {t("search.flexibleRadioGroup.1")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={"28"} id="A month" />
                      <Label htmlFor="A month" className="font-normal">
                        {t("search.flexibleRadioGroup.2")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={"other"} id="Other" />
                      <Label htmlFor="Other" className="font-normal">
                        {t("search.flexibleRadioGroup.3")}
                      </Label>
                    </div>
                  </RadioGroup>
                  {isOther && (
                    <div className="flex gap-2 py-1">
                      <div className="rounded-md border-[1px] p-1 border-[#868686] flex ">
                        <input
                          className="px-1 text-md text-searchGrayText focus:outline-none "
                          type="number"
                          id="nights"
                          min="1"
                          max="90"
                          onChange={(e) => setNights(e.target.value)}
                          // defaultValue={1}
                          value={nights}
                        ></input>
                        <label
                          htmlFor="nights" // TODO:1- night / 1 < nights
                          className="text-sm text-searchGrayText  border-s-[1px] px-2 cursor-text mt-[1px] py-0"
                        >
                          nights
                        </label>
                      </div>
                      <select
                        name="baba"
                        id="baba"
                        value={fromDay}
                        onChange={handleFromDayClick}
                        className="focus:outline-none text-sm pe-3 rounded-md border-[1px] cursor-pointer text-searchGrayText border-[#868686]"
                      >
                        <option value="1">
                          {t("search.from") + " " + t("search.flexibleDays.0")}
                        </option>
                        <option value="2">
                          {t("search.from") + " " + t("search.flexibleDays.1")}
                        </option>
                        <option value="3">
                          {" "}
                          {t("search.from") + " " + t("search.flexibleDays.2")}
                        </option>
                        <option value="4">
                          {" "}
                          {t("search.from") + " " + t("search.flexibleDays.3")}
                        </option>
                        <option value="5">
                          {" "}
                          {t("search.from") + " " + t("search.flexibleDays.4")}
                        </option>
                        <option value="6">
                          {" "}
                          {t("search.from") + " " + t("search.flexibleDays.5")}
                        </option>
                        <option value="0">
                          {" "}
                          {t("search.from") + " " + t("search.flexibleDays.6")}
                        </option>
                      </select>
                    </div>
                  )}

                  <h3 className="font-bold text-base pt-6">
                    {t("search.flexibleSecondaryHeader")}
                  </h3>
                  <p className="pt-2 text-sm text-searchGrayText">
                    {t("search.flexibleChoiceLimit")}
                  </p>

                  <div
                    className={cn(
                      "w-full flex gap-2 overflow-scroll py-4",
                      styles.scrollContainer
                    )}
                  >
                    {monthsAndYears().map((monthYear) => {
                      const isClicked = clickedMonthsCards.some(
                        (clickedMonth) =>
                          clickedMonth.monthName === monthYear.monthName &&
                          clickedMonth.year === monthYear.year
                      );
                      const isDisabled =
                        clickedMonthsCards.length >= 3 && !isClicked;
                      let currentMonthAsNumber = new Date().getMonth();
                      if (currentMonthAsNumber++ === 13) {
                        currentMonthAsNumber = 0;
                      }

                      return (
                        <Card
                          onClick={() =>
                            !isDisabled && handleClickMonthCard(monthYear)
                          }
                          key={monthYear.monthName}
                          className={cn(
                            "shadow-none cursor-pointer hover:bg-[#f5f5f5]",
                            isClicked
                              ? "border-primary text-[#006ce4] bg-[#f2f6fe] hover:bg-[#f2f6fe] "
                              : isDisabled
                              ? "bg-[#f5f5f5] text-[#a2a2a2] cursor-not-allowed fill-[#a2a2a2]"
                              : ""
                          )}
                        >
                          <CardContent
                            className={cn(
                              "py-[15px] flex gap-1 flex-col items-center justify-center h-full rounded-md"
                            )}
                          >
                            <EmptyCalendarImg className={cn("h-4 w-4")} />
                            <div>
                              <h4>{monthYear.monthName}</h4>
                              <p className="text-[14px] text-searchGrayText">
                                {monthYear.year}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                  <hr />
                  <div className="flex justify-end items-center gap-3 py-3">
                    <p className="text-sm">
                      {t("search.selectDatesParagraph")}
                    </p>
                    <Button
                      onClick={() =>
                        variant === "default" && setOpenDatesPopHover(false)
                      }
                      className="px-2"
                      variant={variant}
                    >
                      {t("search.selectDates")}
                    </Button>
                  </div>
                </div>
              )}
            </PopoverContent>
            <PopoverTrigger asChild>
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-[#595959]"
                >
                  <path d="M22.5 13.5v8.25a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75zm1.5 0V5.25A2.25 2.25 0 0 0 21.75 3H2.25A2.25 2.25 0 0 0 0 5.25v16.5A2.25 2.25 0 0 0 2.25 24h19.5A2.25 2.25 0 0 0 24 21.75zm-23.25-3h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5M7.5 6V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0M18 6V.75a.75.75 0 0 0-1.5 0V6A.75.75 0 0 0 18 6M5.095 14.03a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06m.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06m.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m5.845-3.97a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06m.53-1.28A1.125 1.125 0 1 0 12 15a1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06M12 18a1.125 1.125 0 1 0 0 2.25A1.125 1.125 0 0 0 12 18a.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m5.845-3.97a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06m.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06m.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5"></path>
                </svg>
                {rangeDates?.from ? (
                  rangeDates.to ? (
                    <div className="py-1 px-2">
                      {format(
                        rangeDates.from,
                        currentLocale === he
                          ? formattedHebrew
                          : formattedEnglish,
                        { locale: currentLocale }
                      )}
                      <span className="px-2">—</span>
                      {format(
                        rangeDates.to,
                        currentLocale === he
                          ? formattedHebrew
                          : formattedEnglish,
                        { locale: currentLocale }
                      )}
                      <span className="px-1">
                        {activePlusMinusButton ===
                        "search.caledarPlusMinusButtons.1"
                          ? "(±1)"
                          : activePlusMinusButton ===
                            "search.caledarPlusMinusButtons.2"
                          ? "(±2)"
                          : activePlusMinusButton ===
                            "search.caledarPlusMinusButtons.3"
                          ? "(±3)"
                          : activePlusMinusButton ===
                            "search.caledarPlusMinusButtons.4"
                          ? "(±7)"
                          : ""}
                      </span>
                    </div>
                  ) : (
                    // date.from only
                    <div className="py-1 px-2">
                      {format(
                        rangeDates.from,
                        currentLocale === he
                          ? formattedHebrew
                          : formattedEnglish,
                        { locale: currentLocale }
                      )}
                      <span className="px-2">—</span>
                      <span>{t("search.checkOut")}</span>
                    </div>
                  )
                ) : (
                  <div className="py-1 px-2">
                    <span>{t("search.checkIn")}</span>
                    <span className="px-2">—</span>
                    <span>{t("search.checkOut")}</span>
                  </div>
                )}
              </div>
            </PopoverTrigger>
          </div>
        </Popover>
        {/* people number */}
        <div className="border-search bg-white rounded-[4px] p-[11px]  flex hover:border-[#f56700]  cursor-pointer  search:basis-1/3">
          <Popover
            open={openPeoplePopHover}
            onOpenChange={setOpenPeoplePopHover}
          >
            <PopoverContent
              className="w-[475px] p-10  shadow-searchPopupsShadow PopoverContent rounded-xl max-w-[90vw] overflow-x-auto"
              sideOffset={11.5}
              side="bottom"
              align={windowWidth > 900 ? "end" : "start"}
              alignOffset={-11.5}
              avoidCollisions={false}
            >
              <SearchPeople
                setopenPepolePophover={setOpenPeoplePopHover}
                setChildrenCount={setChildrenCount}
                adultsCount={adultsCount}
                roomsCount={roomsCount}
                setRoomsCount={setRoomsCount}
                setAdultsCount={setAdultsCount}
                childrenCount={childrenCount}
                childrenAges={childrenAges}
                setChildrenAges={setChildrenAges}
                isPets={isPets}
                setIsPets={setIsPets}
              ></SearchPeople>
            </PopoverContent>
            <PopoverTrigger
              className="flex-grow py-1 px-2 focus:outline-none placeholder:text-black placeholder:font-medium flex"
              asChild
            >
              <div className="flex gap-2">
                <IconMen />
                <p>
                  {`${adultsCount} ${t("SearchPeople.Adults")}`}{" "}
                  {childrenCount > 0 &&
                    `· ${childrenCount} ${t("SearchPeople.Children")}`}{" "}
                  {isPets && `· ${t("SearchPeople.pets")} `}
                  {`· ${roomsCount} ${t("SearchPeople.rooms")} `}
                </p>
              </div>
            </PopoverTrigger>
          </Popover>
        </div>
        <Button
          type="button"
          onClick={handleSubmit}
          size={null}
          className="p-2 py-[13px] text-xl hover:bg-[#0057b8]"
        >
          {t("button.search")}
        </Button>
      </Card>
    </form>
  );
}

export default Search;
