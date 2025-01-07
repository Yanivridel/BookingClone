import styles from "@/css/search.module.css";
import ImageCard from "@/components/ImageCard";
import MainCard from "@/components/MainCard";
import OffersCard from "@/components/OffersCard";
import Search from "@/components/search";
import { Card } from "@/components/ui/card";
import MainNav from "@/components/MainNav";
import { Button } from "@/components/ui/button";
import DubaiImage from "../assets/images/Dubai.jpg";
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
import { useEffect } from "react";

interface HomeProps {
  country: string;
}
function Home({ country }: HomeProps) {
  const { t, i18n } = useTranslation();
  const dateLanguage = i18n.language === "he" ? "he-IL" : "en-US";

  const currentdate = new Date();

  const dayOfWeek = currentdate.getDay();
  const daysToFriday = (5 - dayOfWeek + 7) % 7;

  const friday = new Date(currentdate);
  friday.setDate(currentdate.getDate() + daysToFriday);

  const sunday = new Date(currentdate);
  sunday.setDate(currentdate.getDate() + daysToFriday + 2);

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
    <div className="p-20">
      <Search></Search>
      <h2 className="text-2xl font-bold py-4">
        {t("home.interestedInHeader")}
      </h2>
      <Carousel>
        <CarouselPrevious />
        <CarouselContent>
          <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
            <MainCard discount={{ coin: "$", value: "1022" }} type="Hotel" />
          </CarouselItem>
          <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
            <MainCard discount={{ coin: "$", value: "1022" }} type="Hotel" />
          </CarouselItem>
          <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
            <MainCard discount={{ coin: "$", value: "1022" }} type="Hotel" />
          </CarouselItem>
          <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
            <MainCard discount={{ coin: "$", value: "1022" }} type="Hotel" />
          </CarouselItem>
          <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
            <MainCard discount={{ coin: "$", value: "1022" }} type="Hotel" />
          </CarouselItem>
          <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
            <MainCard discount={{ coin: "$", value: "1022" }} type="Hotel" />
          </CarouselItem>
        </CarouselContent>
        <CarouselNext />
      </Carousel>
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
        <h2 className="text-2xl font-bold ">{t("home.PerfectPlacesHeader")}</h2>
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
        <h2 className="text-2xl font-bold ">{t("home.weekendDealsHeader")}</h2>
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
            <CardWithDescription />
            <Card className="h-40 w-40">
              <img src={DubaiImage} alt="" />
            </Card>
            <Card className="h-40 w-40">
              <img src={DubaiImage} alt="" />
            </Card>
            <Card className="h-40 w-40">
              <img src={DubaiImage} alt="" />
            </Card>
            <Card className="h-40 w-40">
              <img src={DubaiImage} alt="" />
            </Card>
            <Card className="h-40 w-40">
              <img src={DubaiImage} alt="" />
            </Card>
            <Card className="h-40 w-40">
              <img src={DubaiImage} alt="" />
            </Card>
            <Card className="h-40 w-40">
              <img src={DubaiImage} alt="" />
            </Card>
            <Card className="h-40 w-40">
              <img src={DubaiImage} alt="" />
            </Card>
            <Card className="h-40 w-40">
              <img src={DubaiImage} alt="" />
            </Card>
            <Card className="h-40 w-40">
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
        quam debitis ipsa obcaecati esse illo sit, repellat alias. Illo aliquid
        nesciunt ratione. Sequi consequatur tempore repellat suscipit nam
        nesciunt, tenetur voluptatem at quam, earum doloribus. Nostrum aliquid
        alias praesentium non, ullam doloremque beatae sed ipsum optio
        perferendis quibusdam architecto numquam quisquam temporibus? Sint
        tenetur quae earum in tempora similique hic repudiandae veritatis ipsam
        libero autem unde debitis minus maxime, assumenda dignissimos explicabo
        ad harum. Voluptatibus perspiciatis aliquam dolorem quae blanditiis eum
        labore. Dolor facere officiis pariatur, repellat repudiandae aliquid
        nesciunt consectetur voluptatem, cum, magni culpa harum sit. Voluptate
        doloribus quibusdam corrupti? Tenetur nulla possimus minus commodi,
        autem assumenda explicabo a necessitatibus aliquid? Laborum ipsum ullam
        vero doloribus ducimus! Id accusamus, alias possimus accusantium omnis
        facilis magnam incidunt, assumenda consequatur quos mollitia fuga maxime
        impedit repudiandae a eveniet, libero dolore reiciendis eaque ad. Nulla
        velit laudantium eaque tempore dolores quos quia ad consectetur
        aspernatur in deserunt vitae possimus voluptate, accusantium fugiat nisi
        sit explicabo optio fuga, vero ipsam. Recusandae impedit commodi
        molestias quibusdam? Obcaecati fuga aliquid, magni aut quam ipsa
        incidunt perferendis perspiciatis molestias reprehenderit expedita! Rem
        dicta, sit cupiditate odit, ipsam quibusdam sint ratione omnis veniam
        provident quae, ad eos sequi eveniet. Laborum et sunt eveniet porro
        tenetur illum, ducimus, vel sequi quas distinctio perspiciatis
        blanditiis eum debitis libero voluptatem. Provident dolorum tempora
        quasi, esse accusamus itaque! Quos voluptatum reiciendis consequuntur
        officia. Eveniet, quam impedit aspernatur enim optio ex mollitia culpa
        magni ea minus cupiditate harum eos a sed rerum reiciendis corporis vel
        corrupti praesentium distinctio rem error officiis natus facere.
        Reiciendis. Natus placeat labore dolorem cumque adipisci tenetur
        assumenda fuga? Illo aperiam, laborum reiciendis sunt corrupti esse
        aspernatur inventore? Ad numquam sequi iusto qui odit! Non, unde. Iure
        voluptates accusamus corporis.
      </div>
    </div>
  );
}

export default Home;
