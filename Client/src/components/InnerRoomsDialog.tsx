import { IRoom } from "@/types/roomTypes";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import PopularFacilities from "./PopularFacilities";
import QueenBad from "../assets/images/Screenshot 2025-01-15 at 22.24.04.png";
import BunkBad from "../assets/images/bunk.png";
import SofaBad from "../assets/images/sofa.png";
import TweenSingleBad from "../assets/images/tweenSingle.png";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { SampleNextArrow, SamplePrevArrow } from "./ui/carousel-slick";
interface InnerRoomsDialogProps {
  room: IRoom;
}

function InnerRoomsDialog({ room }: InnerRoomsDialogProps) {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "he";

  const settingsCarousel = {
    customPaging: function (i: any) {
      return (
        <img
          className="object-cover w-12 max-h-[48px] min-h-[48px] mt-3"
          src={room.images[i]}
          alt={`Thumbnail ${i + 1}`}
          onError={(e) => e.currentTarget.closest('li')?.remove()}
        />
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb image-carousel !flex !mt-10 flex-wrap justify-center !gap-y-10 bg-white",
    infinite: true,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="cursor-pointer" asChild>
          <h3 className="text-primary cursor-pointer font-bold underline  hover:text-[#bc5b02]">
            {room.title}
          </h3>
        </DialogTrigger>
        <DialogContent className="h-[70vh] w-[90vw] max-w-[1100px] max-h-[700px] rounded-2xl p-5 grid grid-cols-[40%_60%]">
          <div className="flex flex-col gap-4 overflow-y-auto max-h-full">
            <h3 className="text-xl font-bold">{room.title}</h3>
            <PopularFacilities
              iconsClassName={"fill-black w-4 h-4"}
              facilityTitleClassName={"text-[12px]"}
              facilityWrapperClassName="py-0"
              popularFacilities={room.facilities}
            />
            {/* beds */}
            {room.rooms.map((innerRoom) => (
              <div key={innerRoom.room_num}>
                <span className="font-bold pe-1">{innerRoom.type}</span>
                <span className="font-bold pe-1">{innerRoom.room_num}:</span>
                <div className="flex flex-wrap">
                  {Object.entries(innerRoom.beds).map(
                    ([bedType, count]) =>
                      count > 0 && (
                        <div className="flex pe-1" key={bedType}>
                          <span>
                            {" "}
                            {count} {bedType} {count === 1 ? "bed" : "beds"}
                          </span>
                          {bedType === "double" &&
                            Array.from({ length: count }).map((_, index) => (
                              <img key={index} className="h-4 w-7" src={TweenSingleBad} />
                            ))}

                          {bedType === "bunk" &&
                            Array.from({ length: count }).map((_, index) => (
                              <img key={index} className="h-6 w-6" src={BunkBad} />
                            ))}

                          {bedType === "queen" &&
                            Array.from({ length: count }).map((_, index) => (
                              <img key={index} className="h-5 w-10" src={QueenBad} />
                            ))}

                          {bedType === "single" &&
                            Array.from({ length: count }).map((_, index) => (
                              <img key={index} className="h-4 w-7" src={TweenSingleBad} />
                            ))}

                          {bedType === "sofa" &&
                            Array.from({ length: count }).map((_, index) => (
                              <img key={index} className="h-5 w-8" src={SofaBad} />
                            ))}
                        </div>
                      )
                  )}
                </div>
              </div>
            ))}
            {/* beds count */}
            <div className="flex">
              <span className="font-bold pe-1">rooms:</span>
              <span> {room.rooms.length}</span>
            </div>
            {/* description */}
            <p>{room.desc}</p>
          </div>

          {/*  carousel */}
          <div className="h-fit w-full">
            <Slider
              key={isRtl ? "rtl" : "ltr"}
              {...{
                ...settingsCarousel,
                slidesToShow: 1,
                initialSlide: isRtl ? room.images.length - 1 : 0,
                nextArrow: <SampleNextArrow myClassName="left-1/2" slidesToShow={1} />,
              }}
            >
              {room.images.map((image, index) => (
                <div key={index} className="px-2 w-full h-[350px]">
                  <img
                    className="h-fit w-full object-contain object-top"
                    src={image}
                    alt={`Room Image ${index + 1}`}
                    onError={(e) => e.currentTarget.closest('.slick-slide')?.remove()}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InnerRoomsDialog;
