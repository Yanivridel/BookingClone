import { IRoom } from "@/types/roomTypes";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import PopularFacilities from "./PopularFacilities";
import QueenBad from "../assets/images/Screenshot 2025-01-15 at 22.24.04.png";
import BunkBad from "../assets/images/bunk.png";
import SofaBad from "../assets/images/sofa.png";
import TweenSingleBad from "../assets/images/tweenSingle.png";
interface InnerRoomsDialogProps {
  room: IRoom;
}

function InnerRoomsDialog({ room }: InnerRoomsDialogProps) {
  return (
    <div>
      <Dialog>
        <DialogTrigger className=" cursor-pointer " asChild>
          <h3 className="text-primary cursor-pointer font-bold underline  hover:text-[#bc5b02]">
            {room.title}
          </h3>
        </DialogTrigger>
        <DialogContent className=" h-[100vh] w-[100vw] max-w-[100vw] rounded-2xl sm:rounded-2xl p-5 grid grid-cols-5  overflow-scroll">
          <div className="col-span-2 flex flex-col gap-4">
            <h3 className="text-xl font-bold  ">{room.title}</h3>
            <PopularFacilities
              iconsClassName={"fill-black w-4 h-4"}
              facilityTitleClassName={"text-[12px]"}
              facilityWrapperClassName="py-0"
              popularFacilities={room.facilities}
            />
            {/* beds */}
            {room.rooms.map((innerRoom) => (
              <div>
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
                              <img
                                key={index}
                                className="h-4 w-7"
                                src={TweenSingleBad}
                              />
                            ))}

                          {bedType === "bunk" &&
                            Array.from({ length: count }).map((_, index) => (
                              <img
                                key={index}
                                className="h-6 w-6"
                                src={BunkBad}
                              />
                            ))}

                          {bedType === "queen" &&
                            Array.from({ length: count }).map((_, index) => (
                              <img
                                key={index}
                                className="h-5 w-10"
                                src={QueenBad}
                              />
                            ))}

                          {bedType === "single" &&
                            Array.from({ length: count }).map((_, index) => (
                              <img
                                key={index}
                                className="h-4 w-7"
                                src={TweenSingleBad}
                              />
                            ))}

                          {bedType === "sofa" &&
                            Array.from({ length: count }).map((_, index) => (
                              <img
                                key={index}
                                className="h-5 w-8"
                                src={SofaBad}
                              />
                            ))}
                        </div>
                      )
                  )}
                </div>
              </div>
            ))}
            {/* beds count */}
            <div className="flex">
              <span className="font-bold pe-1">roomes:</span>
              <span> {room.rooms.length}</span>
            </div>
            {/* description */}

            <p>{room.desc}</p>
          </div>

          {/*  carousel */}
          <div className="col-span-3">
            {room.images.map((image) => (
              <img className="" src={image} alt="" />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InnerRoomsDialog;
