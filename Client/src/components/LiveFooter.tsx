import Slider from "react-slick";
import { Card } from "./ui/card";
import { useNavigate } from "react-router-dom";

const findArr = [
  "apartments",
  "villas",
  "condo hotels",
  "vacation homes",
  "cottages",
  "homes",
];

const LiveFooter = () => {
  const navigate = useNavigate();
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 1500,
    vertical: true,
    // verticalSwiping: true,
  };

  return (
    <div className="max-w-[1100px] mx-auto">
    <Card className="my-6 relative p-6 bg-white border rounded-lg shadow-lg overflow-hidden  mx-2">
      {/* Background circles */}
      <div className="absolute top-2/3 left-1/6 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] bg-yellow-500 rounded-full"></div>
      <div className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500 rounded-full"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center">
        <div className="text-left absolute top-1/2 left-[95%] sm2:left-[50%] -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-lg sm2:text-2xl font-bold text-white flex gap-5 items-center">
            Find{" "}
            <span className="font-normal">
              <Slider {...settings} className="sm2:my-4">
                {findArr.map((item) => (
                  <div key={item}>
                    <h3
                      className="text-white text-lg sm2:text-2xl font-semibold underline 
                        underline-offset-4 decoration-[#f8b830] w-fit"
                    >
                      {item}
                    </h3>
                  </div>
                ))}
              </Slider>
            </span>
          </h2>
          <p className="text-white mb-4 text-lg sm2:text-2xl font-bold">
            for your next trip
          </p>
          <button
            onClick={() => navigate("/searchresults?country=Israel")}
            className="w-fit px-2 py-1 sm2:px-4 sm2:py-2 sm2:w-[200px] bg-white text-blue-500 font-semibold rounded-lg text-xs sm2:text-xl"
          >
            Discover homes
          </button>
        </div>
        <img
          className="max-w-[400px] w-[100px] sm2:w-[35vw] ms-auto mb-auto"
          src="https://cf.bstatic.com/psb/capla/static/media/bh_aw_cpg_main_image.b4347622.png"
          alt="Chair illustration"
        />
      </div>
    </Card>
    </div>
  );
};

export default LiveFooter;
