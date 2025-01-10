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
import { EmptyCalendarImg } from "./ui/Icons";
import { cn } from "@/lib/utils";
import { ISearchPropertiesReq } from "@/types/propertyTypes";
import { searchPropertiesChunks } from "@/utils/api/propertyApi";

// damy data
const items = [
  { id: "1a", city: "ramat gan", country: "Israel", icon: "location" },
  { id: "2", city: "tel aviv", country: "Israel", icon: "location" },
  { id: "3", city: "jerusalem", country: "Israel", icon: "location" },
  { id: "4", city: "haifa", country: "Israel", icon: "location" },
  { id: "6", city: "maon", country: "Israel", icon: "location" },
  { id: "5", city: "beer sheva", country: "Israel", icon: "location" },
];

// todo: change the name
interface IUnknownData {
  id: string;
  city: string; // region:
  country: string;
  icon: string;
}

interface MonthYear {
  month?: number;
  monthName: string;
  year: number;
}

// ! need to get props "isAllHome" that make the search diffrent

// todo: icons and "powred by google"

function Search() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [popularSearches, setpopularSearches] =
    useState<Array<IUnknownData> | null>(items); // for drop down initialization
  // !need to change the type with the real data
  const [isOther, setIsOther] = useState<boolean>(false);
  const [variant, setVariant] = useState<"default" | "disabled">("disabled");

  // * dates
  const [clickedMonthsCards, setClickedMonthsCards] = useState<MonthYear[]>([]);
  const [rangeDates, setRangeDates] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 6),
  });

  const [activePlusMinusButton, setActivePlusMinusButton] =
    useState<string>("");
  const [activeNavButton, setActiveNavButton] = useState<string>(
    t("search.calendar")
  );

  const [isWeedend, setIsWeedend] = useState(false);
  const [preferredDays, setPreferredDays] = useState("");
  const [fromDay, setfromDay] = useState("1");
  const [nights, setNights] = useState("1");

  // const [yearsMonths, setYearsMonths] = useState<MonthYear[] | []>([]);
  const finalData = {
    primary: {
      location: {
        country: "Israel",
        region: "Center District Israel",
        city: "Ness Ziona",
        addressLine: "24 Rothschild Street",
      },
      date: {
        startDate:
          activeNavButton === t("search.calendar") ||
          clickedMonthsCards.length === 0
            ? rangeDates?.from
            : null,
        endDate:
          activeNavButton === t("search.calendar") ||
          clickedMonthsCards.length === 0
            ? rangeDates?.to
            : null,
        length: Number(preferredDays) || Number(nights),
        fromDay: fromDay,
        yearMonths: clickedMonthsCards,
        isWeekend: isWeedend,
      },
      options: {
        adults: 3,
        rooms: 1,
        childrenAges: [4],
      },
    },
  };

  //   preferredDays = {length: number , name: name}
  //  clickedMonthsCards = [] | [index ] max length 3
  //  finel data to be yearsMonths[clickedindex[0]...] (clickedMonthsCards.forEach...)

  const { i18n } = useTranslation();
  const currentLocale = i18n.language === "he" ? he : enUS;

  // * place input (includ drop down)
  // trigger
  const handleFocus = () => {
    setOpen(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setOpen(false);
    }, 250);
  };

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setInputValue(e.target.value);
      //  const res = await someSearchFunction(e.target.value)  // * when connect to the data base
    } catch (error) {
      console.log(error);
    }
  };

  // drop down
  const handleLocationListClick = (element: IUnknownData) => {
    console.log(element);
    setInputValue(() => [element.city, element.country].join(", "));
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

  // monthes and years
  const handleClickMonthCard = (monthYear: MonthYear, index: number) => {
    let newClickedButtons = [];
    if (
      clickedMonthsCards.some(
        (clickedMonth) =>
          clickedMonth.monthName === monthYear.monthName &&
          clickedMonth.year === monthYear.year
      )
    ) {
      //button clicked allrady - remove:
      newClickedButtons = clickedMonthsCards.filter((element) => {
        return element.monthName !== monthYear.monthName;
      });
    } else {
      // button not clicked:
      newClickedButtons = [
        ...clickedMonthsCards,
        { ...monthYear, month: index },
      ];
    }

    setClickedMonthsCards(newClickedButtons);
  };

  //  preferred days - monthes and day number
  const handleRadioGroup = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLInputElement;
    if (target.value !== undefined) {
      setPreferredDays(target.value);
      if (target.value === "weekend") {
        setIsWeedend(true);
      } else {
        setIsWeedend(false);
      }
      // console.log(preferredDays);
    }
  };

  const handleFromDayClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setfromDay(e.target.value);
  };

  //hebrew formt
  const formattedHebrew = "EEE, dd MMMM";
  // english format
  const formattedEnglish = "EEE, MMM dd";

  useEffect(() => {
    if (preferredDays === "other") {
      setIsOther(true);
    } else setIsOther(false);
  }, [preferredDays]);

  useEffect(() => {
    // // date?.from === date?.to ? date?.to = undefined :
    // if (date && date?.to === date?.from) {
    //   console.log("equle");
    // }
    // console.log("date");
    // console.log(date);
  }, [rangeDates]);

  useEffect(() => {
    // console.log(preferredDays);

    clickedMonthsCards.length > 0
      ? setVariant("default")
      : setVariant("disabled");
  }, [clickedMonthsCards]);

  useEffect(() => {
    console.log(finalData.primary.date);

    // console.log(finalData.primary.date.startDate);
    // console.log(finalData.primary.date.endDate);
    // console.log(finalData.primary.date.isWeekend);
    // if(clickedMonthsCards.length> 0) console.log([clickedMonthsCards[]]);
    // monthsAndYears()
    // setYearsMonths(monthsAndYears());
  }, [finalData]);

  return (
    <form className="p-2 text-[14px]">
      <Card
        dir={i18n.language === "he" ? "rtl" : "ltr"}
        className="border-search flex flex-col md rounded-[8px] p-1 bg-search gap-1 search:flex-row  font-medium justify-items-stretch"
      >
        {/* input + modal */}
        <div className="border-search bg-white rounded-[4px] p-[11.5px] flex hover:border-[#f56700] search:basis-1/3">
          <div className="relative">
            {/* open modal */}
            <Card
              className={`border-0 absolute top-10 start-[-12px] shadow-searchPopupsShadow z-50 ${
                open ? "" : "hidden"
              } min-w-[430px] rounded-[8px] `}
            >
              <div className="p-3 font-bold">
                {popularSearches && t("search.dropDouwnHeader")}
                {/* only when initialized */}
              </div>
              <ul>
                {popularSearches?.map((element, i) => {
                  return (
                    i < 5 && (
                      <li
                        onClick={() => handleLocationListClick(element)}
                        key={element.id}
                        className={`${
                          i !== popularSearches.length - 1 && " border-b"
                        } border-[#e7e7e7] p-2  hover:bg-[#1a1a1a0f]`}
                      >
                        <div className="flex gap-2 items-center">
                          {/*? element.icon */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-6 h-6 "
                          >
                            <path d="M15 8.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0m1.5 0a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0M12 1.5a6.75 6.75 0 0 1 6.75 6.75c0 2.537-3.537 9.406-6.75 14.25-3.214-4.844-6.75-11.713-6.75-14.25A6.75 6.75 0 0 1 12 1.5M12 0a8.25 8.25 0 0 0-8.25 8.25c0 2.965 3.594 9.945 7 15.08a1.5 1.5 0 0 0 2.5 0c3.406-5.135 7-12.115 7-15.08A8.25 8.25 0 0 0 12 0"></path>
                          </svg>
                          <div className="flex flex-col">
                            <span className="font-bold">{element.city} </span>
                            <span className="text-xs font-normal">
                              {element.country}
                            </span>
                          </div>
                        </div>
                      </li>
                    )
                  );
                })}
              </ul>
              in some cases put here "power by google" img
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
            value={inputValue}
          />
        </div>
        {/* date */}
        <Popover>
          <div className=" border-search  bg-white rounded-[4px] p-[11.5px]  flex hover:border-[#f56700]  cursor-pointer  search:basis-1/3 ">
            <PopoverContent
              className=" w-auto p-0 shadow-searchPopupsShadow PopoverContent rounded-none "
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
                  onClick={() => handleNavButtonClick(t("search.calendar"))}
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
                  onClick={() => handleNavButtonClick(t("search.flexible"))}
                >
                  {t("search.flexible")}
                </Button>
              </div>
              {/* calender */}
              {activeNavButton === t("search.calendar") && (
                <Calendar
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
              {activeNavButton === t("search.calendar") && (
                <div className="flex justify-end gap-2 py-4 mx-6  border-t-[1px] border-[#e7e7e7]">
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
                </div>
              )}
              {/* flexible*/}
              {activeNavButton === t("search.flexible") && (
                <div className="px-4  w-[642px]">
                  <h3 className="font-bold text-base pt-8">
                    {t("search.flexibleHeader")}
                  </h3>
                  <RadioGroup
                    dir={i18n.language === "he" ? "rtl" : "ltr"}
                    loop={true}
                    className="py-2"
                    value={preferredDays}
                    // onChange={handleRadioGroup}
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
                    {monthsAndYears().map((monthYear, index) => {
                      const isClicked = clickedMonthsCards.some(
                        (clickedMonth) =>
                          clickedMonth.monthName === monthYear.monthName &&
                          clickedMonth.year === monthYear.year
                      );
                      const isDisabled =
                        clickedMonthsCards.length >= 3 && !isClicked;

                      return (
                        <Card
                          onClick={() =>
                            !isDisabled &&
                            handleClickMonthCard(monthYear, index)
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
                    <p className="text-sm">Select preferred days</p>
                    <Button className="px-2" variant={variant}>
                      select dates
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
        {/* pepole number */}
        <div className="border-search bg-white rounded-[4px] p-[11px]  flex hover:border-[#f56700]  cursor-pointer  search:basis-1/3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-[#595959]"
          >
            <path d="M16.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0M18 6A6 6 0 1 0 6 6a6 6 0 0 0 12 0M3 23.25a9 9 0 1 1 18 0 .75.75 0 0 0 1.5 0c0-5.799-4.701-10.5-10.5-10.5S1.5 17.451 1.5 23.25a.75.75 0 0 0 1.5 0"></path>
          </svg>
          <p>{["23;o,iluy42", "uykf"].join(". ")}</p>
        </div>
        <Button
          type="button"
          size={null}
          className="p-2 py-3 hover:bg-[#0057b8]"
        >
          {t("button.search")}
        </Button>
      </Card>
    </form>
  );
}

export default Search;
