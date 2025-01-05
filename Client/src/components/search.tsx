import { t } from "i18next";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";
import { DateRange, IconLeft } from "react-day-picker";
import { addDays, format } from "date-fns";
import { he, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

// damy data
const items = [
  { id: "1a", city: "ramat gan", country: "Israel", icon: "location" },
  { id: "2", city: "tel aviv", country: "Israel", icon: "location" },
  { id: "3", city: "jerusalem", country: "Israel", icon: "location" },
  { id: "4", city: "haifa", country: "Israel", icon: "location" },
  { id: "6", city: "maon", country: "Israel", icon: "location" },
  { id: "5", city: "beer sheva", country: "Israel", icon: "location" },
];

interface IUnknownData {
  // todo: change the name
  id: string;
  city: string; // region:
  country: string;
  icon: string;
}

// ! need to get props "isAllHome" that make the search diffrent
// todo: icons and "powred by google"
function Search() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [res, setRes] = useState<Array<IUnknownData> | null>(items); // !need to change the type with the real data
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  //   const [locale, setLocale] = useState("he");
  const { i18n } = useTranslation();
  const currentLocale = i18n.language === "he" ? he : enUS;

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

  const handleLocationListClick = (element: IUnknownData) => {
    console.log(element);
    setInputValue(() => [element.city, element.country].join(", "));
  };

  // פורמט בעברית
  const formattedHebrew = "EEE, dd MMMM";
  // פורמט באנגלית
  const formattedEnglish = "EEE, MMM dd";

  useEffect(() => {
    console.log("date");
    console.log(date);
  }, [date]);

  return (
    <form className="p-2 text-[14px]">
      <Card
        dir={i18n.language === "he" ? "rtl" : "ltr"}
        className="border-search flex flex-col md rounded-[8px] p-1 bg-search gap-1 search:flex-row  font-medium justify-items-stretch"
      >
        {/* input */}
        <div className="border-search   bg-white rounded-[4px] p-[11.5px]  flex hover:border-[#f56700]  search:basis-1/3">
          <div className="relative ">
            <Card
              className={`border-0 absolute top-10 start-[-12px]  ${
                open ? "" : "hidden"
              } min-w-[430px] rounded-[8px] `}
            >
              <div className="p-3 font-bold">
                {res && t("search.dropDouwnHeader")}
                {/* only when initialized */}
              </div>
              <ul>
                {res?.map((element, i) => {
                  return (
                    i < 5 && (
                      <li
                        onClick={() => handleLocationListClick(element)}
                        key={element.id}
                        className={`${
                          i !== res.length - 1 && " border-b"
                        } border-[#e7e7e7] p-2  hover:bg-[#1a1a1a0f]`}
                      >
                        <div className="flex gap-2">
                          {/*? element.icon */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
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
            className="w-6 h-6 "
            // width="24px"
            // height="24px"
          >
            <path d="M2.75 12h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25m0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18m22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0m-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0m-13.25-3h7a.25.25 0 0 1 .25.25v2.75l.75-.75h-9l.75.75V8.5a.25.25 0 0 1 .25-.25m0-1.5A1.75 1.75 0 0 0 6.75 8.5v2.75c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75V8.5a1.75 1.75 0 0 0-1.75-1.75z"></path>
          </svg>

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
              className=" w-auto p-0 PopoverContent rounded-none"
              sideOffset={11}
              align="start"
              alignOffset={-11}
              avoidCollisions={false}
            >
              <Calendar
                initialFocus
                mode="range"
                classNames={{
                  months: "flex flex-row gap-4",
                }}
                fromDate={new Date()}
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                locale={currentLocale}
                dir={i18n.language === "he" ? "rtl" : "ltr"}
              />
            </PopoverContent>
            <PopoverTrigger asChild>
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M22.5 13.5v8.25a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75zm1.5 0V5.25A2.25 2.25 0 0 0 21.75 3H2.25A2.25 2.25 0 0 0 0 5.25v16.5A2.25 2.25 0 0 0 2.25 24h19.5A2.25 2.25 0 0 0 24 21.75zm-23.25-3h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5M7.5 6V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0M18 6V.75a.75.75 0 0 0-1.5 0V6A.75.75 0 0 0 18 6M5.095 14.03a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06m.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06m.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m5.845-3.97a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06m.53-1.28A1.125 1.125 0 1 0 12 15a1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06M12 18a1.125 1.125 0 1 0 0 2.25A1.125 1.125 0 0 0 12 18a.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m5.845-3.97a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06m.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06m.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5"></path>
                </svg>

                {date?.from ? (
                  date.to ? (
                    <div className="py-1 px-2">
                      {format(
                        date.from,
                        currentLocale === he
                          ? formattedHebrew
                          : formattedEnglish,
                        { locale: currentLocale }
                      )}{" "}
                      —{" "}
                      {format(
                        date.to,
                        currentLocale === he
                          ? formattedHebrew
                          : formattedEnglish,
                        { locale: currentLocale }
                      )}
                    </div>
                  ) : (
                    format(
                      date.from,
                      currentLocale === he ? formattedHebrew : formattedEnglish,
                      { locale: currentLocale }
                    )
                  )
                ) : (
                  <div className="py-1 px-2">
                    <span>{t("search.checkIn")}</span>
                    {"  "}
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
            className="w-6 h-6"
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
