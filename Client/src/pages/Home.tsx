import MainCard from "@/components/MainCard";
import MainNav from "@/components/MainNav";
import OffersCard from "@/components/OffersCard";
import Search from "@/components/search";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";

function Home() {
  const { t } = useTranslation();
  const sliderRef = useRef<Slider>(null);

  const settings = {
    // dots: true,
    // dotsClass: "slick-dots custom-dots bg-blue-200",
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 2,
    swipeToSlide: true,
    arrows: true,
  };

  const handleWheel = (event: React.WheelEvent) => {
    if (sliderRef.current) {
      if (event.deltaY > 0) {
        // גלילה כלפי מטה - מעבר לשקף הבא
        sliderRef.current.slickNext();
      } else {
        // גלילה כלפי מעלה - חזרה לשקף הקודם
        sliderRef.current.slickPrev();
      }
    }
  };

  return (
    <div>
      <Search></Search>

      <h2>{t("home.interestedInHeader")}</h2>
      <div onWheel={handleWheel}>
        <Slider {...settings} ref={sliderRef}>
          <MainCard discount={{ coin: "$", value: "1022" }} type="Hotel" />
          <MainCard discount={{ coin: "$", value: "1022" }} type="Hotel" />
          <MainCard discount={{ coin: "$", value: "1022" }} type="Hotel" />
          <MainCard discount={{ coin: "$", value: "1022" }} type="Hotel" />
          <MainCard discount={{ coin: "$", value: "1022" }} type="Hotel" />
        </Slider>
      </div>
      <h2>{t("home.OffersHeader")}</h2>
      <OffersCard />
      {/* <MainNav /> */}
      {/* <CardWithDescription /> */}
      {/* <ImageCard /> */}
    </div>
  );
}

export default Home;
