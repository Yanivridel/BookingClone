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
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
        voluptate consequatur itaque animi iste tenetur ad explicabo ut eius
        ipsum tempora architecto nam iusto dolore facere, quasi rem nostrum
        corrupti? Tenetur recusandae cupiditate hic sed enim nulla, doloremque,
        maxime, fugiat quia quo et corporis. Aliquam modi fuga quas corrupti hic
        praesentium dicta rem impedit eligendi voluptas, sunt temporibus,
        dolores magnam! Repudiandae nemo, provident pariatur, quod expedita modi
        saepe neque voluptatem rerum eum dignissimos sunt ipsam recusandae
        corrupti iusto? Eos quaerat nam, ut possimus a atque consequatur.
        Pariatur odio facilis rerum? Accusamus, nostrum quam quae reiciendis,
        earum illum modi provident quidem culpa architecto aliquid excepturi
        totam perferendis voluptate expedita asperiores beatae, id alias
        adipisci. Ex accusamus velit modi rerum praesentium ipsum. Adipisci ea
        doloremque odio. Et, nam tempore obcaecati laudantium in voluptas
        mollitia architecto quae adipisci ipsa non, unde possimus assumenda
        deleniti ad. Sapiente animi quibusdam adipisci architecto odio facere
        necessitatibus. Ducimus neque sunt autem! Excepturi vero nesciunt dicta,
        architecto provident corrupti recusandae reiciendis! Nostrum eius sint
        laborum, dignissimos modi eos reprehenderit suscipit pariatur temporibus
        ab. Repellat consequuntur deserunt ut architecto? Rerum molestiae
        nostrum voluptatibus expedita explicabo distinctio quia repudiandae
        tempore quasi dolores veniam perspiciatis doloremque a odio eos totam
        amet voluptatem nemo, sunt sit sint neque atque. Iure, mollitia
        eligendi? Cupiditate a itaque explicabo vitae consectetur fugit qui?
        Aperiam perferendis ex nisi. Quas necessitatibus aliquid, accusamus ex
        debitis sint quasi similique suscipit dolorum optio consectetur,
        deserunt corporis, dolorem autem expedita. Necessitatibus at consectetur
        esse id maxime maiores tempore, aperiam cumque exercitationem explicabo
        ipsa, odio illo, labore vitae nostrum deserunt quidem ut delectus illum
        quasi sequi possimus dolor fugiat magni? Consequatur. Eius
        necessitatibus sunt laborum reiciendis iusto possimus libero, cumque,
        illum, praesentium dolores aut. Magnam, animi. Expedita aperiam
        temporibus fugit obcaecati. Sunt, ex ducimus? Voluptatibus voluptates
        ipsa suscipit, earum dolorum provident. Enim illum omnis optio
        aspernatur possimus eaque accusantium facere veritatis fuga, quaerat
        nemo dicta totam eius deserunt porro sint! Natus distinctio corrupti rem
        et dolorum reiciendis numquam ipsum, perferendis suscipit! Nihil eos
        ducimus provident veritatis assumenda magnam ipsum vel, dolores debitis
        omnis beatae, alias veniam laborum modi voluptates, expedita hic nostrum
        iusto temporibus at. Quia error architecto deserunt nam nihil. In
        eligendi, consequatur harum ex explicabo unde laudantium maxime eveniet!
        Consequatur excepturi, minus ea vero nulla deserunt unde quibusdam,
        delectus fuga ducimus dolor molestias vitae necessitatibus asperiores
        esse, voluptatum adipisci. Quos voluptas molestias quibusdam vel
        voluptate facere consequuntur totam illo eligendi sequi vitae iste atque
        saepe, molestiae labore explicabo aperiam facilis aut mollitia quam
        asperiores suscipit soluta dolores? Commodi, non. Dolor, minima id?
        Commodi iusto nemo nisi doloremque excepturi alias nam odit, repudiandae
        inventore voluptatem molestiae labore reprehenderit qui, eius assumenda
        rerum? Consequatur iusto non placeat, facilis inventore voluptatibus
        earum? Nemo, ipsa dolor! Inventore doloribus error rerum fugit tempore
        reprehenderit consequuntur beatae ipsa dolorum quis eius rem doloremque
        libero necessitatibus mollitia, odit cumque, aliquid sed impedit quaerat
        laborum maxime voluptate. Suscipit nihil sequi dolorem quaerat nam
        illum, enim aspernatur quisquam repellendus aut at maxime iusto sit amet
        rem quidem aliquam autem quis veniam deserunt. Numquam quos asperiores
        magnam alias quis. Neque labore voluptatum tenetur eligendi quae autem
        vitae dicta similique laboriosam, eius voluptates delectus iure debitis!
        Rerum neque eos iure omnis quasi distinctio doloremque. Reprehenderit,
        voluptate. Eos sequi quibusdam non? Illum harum deleniti accusamus quis?
        Veritatis iste quis veniam quasi sint odio. Cumque quibusdam corrupti,
        neque expedita delectus vitae quidem ipsa totam, nostrum aperiam,
        aspernatur animi molestias officiis porro veniam? Obcaecati veritatis
        vitae modi nesciunt? Deserunt praesentium earum officia blanditiis fuga
        provident natus dolor! Aperiam molestiae magni ratione, optio incidunt
        itaque nisi quae asperiores at provident ex minus cum cupiditate?
        Accusantium labore fuga nemo officia numquam obcaecati perferendis error
        porro culpa dolores sint velit, odio qui provident dignissimos modi
        possimus ut quod in. Tenetur perferendis explicabo eos pariatur ratione
        quasi! Labore, assumenda officia vel, ut cumque minima explicabo
        pariatur earum quo culpa tenetur quidem harum architecto error. Facilis,
        harum quaerat dolore nesciunt voluptatibus aspernatur incidunt error
        placeat dolorem repudiandae blanditiis? Atque error reprehenderit ipsum
        laborum hic asperiores minus incidunt facilis alias. Eius consequuntur
        unde animi debitis dicta eum consectetur dignissimos voluptatibus.
        Magnam unde similique placeat quis, corrupti nisi aut provident?
        Explicabo repellendus voluptatum cupiditate ea totam, molestiae, qui
        sunt temporibus possimus voluptatem in natus quasi? Blanditiis
        exercitationem ducimus maxime eius ex ratione. Numquam error dolor
        veniam molestias iusto. Vitae, placeat? Ipsam, neque. Vitae, odio
        aliquid? Esse nisi hic consequatur vero quae. Repellat repellendus
        aperiam dolore placeat. Praesentium itaque nemo distinctio id qui modi
        aliquam animi, amet, ducimus vitae quae eius. Amet ab non possimus
        eligendi adipisci accusamus totam dolorem, odio sed assumenda dolor
        explicabo omnis aliquid nostrum quo atque quia, eaque nobis. Sint amet
        ex, cum recusandae voluptatibus molestiae deserunt! Reiciendis, non
        officiis. Incidunt earum sapiente ad, rem quo nihil, dolorum nam sit
        quam aspernatur in tempora maiores officia? Distinctio sunt
        necessitatibus et veritatis laudantium totam inventore vel aut voluptas!
        Quam quasi saepe minima quod reiciendis explicabo porro doloremque
        quibusdam a odit animi omnis ut dolore modi commodi alias, aut nihil qui
        sed! Dolore placeat facilis iste tenetur. Voluptate, fugiat. Beatae
        voluptatem, totam sit voluptatibus repudiandae aperiam enim harum sint,
        doloribus dolorum ullam illum. Totam cumque nihil facere, quas possimus
        provident rerum optio libero odio pariatur tempora, qui est tempore!
        Laboriosam numquam porro quos architecto soluta officia sequi fuga
        aperiam praesentium voluptatum, eius cumque tenetur excepturi
        consequatur nihil itaque magnam ea nam asperiores. Quasi molestiae
        obcaecati cupiditate quam perspiciatis laudantium! Repellendus officiis
        nemo harum magni a exercitationem debitis quae, beatae explicabo quas
        laborum ullam provident quisquam recusandae accusamus vero natus eum
        veritatis reiciendis? Nesciunt amet adipisci facere quis. Doloribus,
        natus. Cupiditate iste quis temporibus est alias? Nemo inventore quam
        ut, dolorem deserunt facilis quas est voluptatem non officiis pariatur
        assumenda quasi esse totam vero, iusto, perspiciatis enim dolor? Facere,
        nam. Reiciendis itaque natus nesciunt atque dolore id quos numquam
        vitae. Inventore nulla cupiditate nisi rerum fuga unde! Dolore, magni
        id! Quisquam at, vel cupiditate atque perspiciatis consequatur deserunt
        et veritatis. Rem veritatis ea iure itaque neque accusamus nulla nisi
        ducimus harum perspiciatis ullam laboriosam nemo minima praesentium aut,
        optio quaerat? Ullam laboriosam illum, quo dolorum asperiores rem at aut
        eveniet! Blanditiis ab eligendi nesciunt veritatis dolorum dignissimos
        nostrum illum aliquid ipsum, doloribus sapiente culpa magni molestiae
        natus dolor cupiditate quam labore earum! Voluptatibus, non? Soluta
        facere aperiam alias vitae fugiat. Voluptatum est doloremque voluptates
        libero unde laborum deleniti. Eum animi libero deserunt voluptates iusto
        at facere? Delectus tempore quidem fuga? Alias consectetur quae
        necessitatibus ab optio aperiam qui cupiditate dolores! Debitis vero
        itaque a eos reprehenderit possimus ad molestiae, cumque tempora
        laborum, error nostrum obcaecati, quaerat necessitatibus deleniti
        recusandae placeat aspernatur corrupti. Omnis quasi ipsum ut, dolorum
        tempora excepturi accusantium! Id, totam! Illo neque, dolorum sit iusto
        nostrum possimus ad in! Praesentium fuga quis veniam tempore esse,
        reprehenderit, veritatis alias odio exercitationem dolorum ratione hic
        aut numquam nobis explicabo provident! Similique quisquam in asperiores
        placeat veritatis debitis eum, excepturi totam a et saepe sunt
        laboriosam inventore, deserunt blanditiis unde! Pariatur amet nobis
        vitae dolores, exercitationem magni numquam eum id obcaecati? Officiis
        itaque cupiditate, perferendis beatae magnam commodi voluptatibus id,
        culpa inventore pariatur, nam aliquam tempora non expedita mollitia
        tempore debitis omnis at corporis? Delectus consequatur, suscipit quidem
        repellat quaerat officiis! Natus porro atque debitis provident cum
        officia, ex vel itaque! Dolor odio neque modi. Enim minima magnam
        provident natus necessitatibus eos eius. Laudantium magni assumenda
        provident, error quos accusamus libero. Ratione asperiores rem
        necessitatibus quis, iste dolorem eveniet repellat cupiditate animi sint
        esse saepe fuga tempora repudiandae recusandae quae dicta, nostrum error
        ex? Dolorem nisi dignissimos perspiciatis magnam nulla natus. Aspernatur
        ut dignissimos excepturi fugit sunt, repudiandae odit hic provident.
        Minima culpa, reiciendis nisi magni ut nulla quo et dolores totam harum,
        necessitatibus soluta, obcaecati similique? Eaque vel corrupti ex.
        Dolorem cumque necessitatibus ratione amet fuga consequatur quam
        reprehenderit ex ut perspiciatis adipisci vero numquam, animi
        accusantium nam assumenda aperiam autem incidunt odit quos sunt officia
        voluptates blanditiis repudiandae! Nemo. Ullam iste optio animi
        explicabo porro reiciendis quibusdam, quaerat dolorum ipsum, odio,
        debitis quae! Possimus, iure consequatur dolor, nemo deleniti corrupti
        fuga accusantium unde eaque beatae nisi. Expedita, quam aliquid!
        Quibusdam consequatur natus, maxime ut aliquam aliquid voluptas pariatur
        accusantium illum ipsam suscipit fugit corrupti ad placeat, totam
        facilis vitae voluptatem illo sit amet nulla? Magni perferendis nulla
        molestias quos! Ad tempora quisquam perspiciatis, nobis repudiandae eos
        omnis animi deleniti accusamus cupiditate maxime porro, asperiores
        facere soluta doloremque quidem totam ab. Minus doloremque quasi aut
        vero ullam ab odit quidem. Doloremque excepturi eveniet eos quam
        architecto delectus, magnam obcaecati iste alias, quos officia! Sequi
        illo laboriosam, tenetur ducimus a quidem natus nam nulla ad? Nemo
        architecto perferendis odit nisi quia. Quis, voluptate esse tempore
        minus alias reiciendis quaerat molestias nemo quas, maxime magnam, et
        ducimus corrupti! Impedit doloremque quo aliquid nulla iste facere
        officia eum debitis, expedita iusto pariatur laboriosam. Delectus, qui
        quis debitis atque mollitia veritatis voluptatibus et dolore odit unde
        nobis molestiae excepturi doloribus facere laudantium corporis aliquid
        error id. Omnis enim corporis, ipsam sunt aperiam velit repellat!
      </div>
    </form>
  );
}

export default Search;
