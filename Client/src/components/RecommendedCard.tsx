import { IProperty, RecommendedData } from "@/types/propertyTypes";
import { IRoom } from "@/types/roomTypes";
import { BlackMen } from "./ui/Icons";

import QueenBad from "../assets/images/Screenshot 2025-01-15 at 22.24.04.png";
import BunkBad from "../assets/images/bunk.png";
import SofaBad from "../assets/images/sofa.png";
import TweenSingleBad from "../assets/images/tweenSingle.png";

export interface RecommendedCardProps {
  recommendedData: RecommendedData;
  propertyData: IProperty;
}

function RecommendedCard({
  recommendedData,
  propertyData,
}: RecommendedCardProps) {
  const selectedRooms = recommendedData.selectedRooms.map((selectedRoom) => ({
    room: (propertyData.rooms as IRoom[]).find(
      (room) => room._id === selectedRoom.id
    ),
    count: selectedRoom.count,
    available: selectedRoom.available,
  }));
  const adults = recommendedData.adults ?? 1;

  //   const bedsCount = selectedRooms.map((room) =>
  //     room.room?.rooms.map((innerRoom) => {
  //       Object.entries(innerRoom.beds).reduce(
  //         (acc, [_key, bed]) => (acc += bed),
  //         0
  //       );
  //     })
  //   );
  //   console.log(bedsCount);

  console.log(selectedRooms);

  return (
    <div>
      <div className="border-[1px] rounded-[8px] border-softGrayBorder p-4">
        <h2 className="text-xl font-bold">
          Recommended for {recommendedData.adults}{" "}
          {adults > 1 ? "adults" : "adult"}
          {recommendedData.childrenAges &&
            `, ${recommendedData.childrenAges.split(",").length}  ${
              recommendedData.childrenAges.split(",").length > 1
                ? "children"
                : "child"
            }`}
        </h2>
        {selectedRooms.map((room) => (
          <div className="flex flex-col text-[16px]">
            {/* room count */}
            <div className="">
              {room.count} <span className="text-sm self-center">x</span>{" "}
              <span className="underline text-buttonBlue hover:cursor-pointer">
                {room.room?.title}{" "}
              </span>
            </div>
            {/* pepole count */}
            <div className="flex">
              <span className="me-1 text-sm">Price for:</span>
              {room.room?.offers[0].group_adults &&
                Array.from(
                  { length: room.room?.offers[0].group_adults },
                  (_, i) => (
                    <div key={i} className="self-center">
                      <BlackMen />
                    </div>
                  )
                )}

              {room.room?.offers[0].group_children ? (
                <div className="flex">
                  <span className="text-xs self-center mx-1">+</span>
                  {Array.from(
                    { length: room.room?.offers[0].group_children },
                    (_, i) => (
                      <div key={i} className="self-center">
                        <BlackMen className=" w-3 h-3" />
                      </div>
                    )
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            {/* beds */}
            <div>
              <div className="flex text-sm">
                <span className="me-1 "> Bads:</span>
                {room.room?.rooms.map((innerRoom) => {
                  return (
                    <div key={innerRoom.room_num}>
                      <div className="flex flex-wrap">
                        {Object.entries(innerRoom.beds).map(
                          ([bedType, count]) =>
                            count > 0 && (
                              <div
                                className="flex self-center pe-1"
                                key={bedType}
                              >
                                <span className="pe-1">
                                  {" "}
                                  {count} {bedType}{" "}
                                  {count === 1 ? "bed" : "beds"}
                                </span>

                                {bedType === "double" &&
                                  Array.from({ length: count }).map(
                                    (_, index) => (
                                      <img
                                        key={index}
                                        className="h-4 w-7 self-center"
                                        src={TweenSingleBad}
                                      />
                                    )
                                  )}

                                {bedType === "bunk" &&
                                  Array.from({ length: count }).map(
                                    (_, index) => (
                                      <img
                                        key={index}
                                        className="h-6 w-6 self-center"
                                        src={BunkBad}
                                      />
                                    )
                                  )}

                                {bedType === "queen" &&
                                  Array.from({ length: count }).map(
                                    (_, index) => (
                                      <img
                                        key={index}
                                        className="h-5 w-10 self-center"
                                        src={QueenBad}
                                      />
                                    )
                                  )}

                                {bedType === "single" &&
                                  Array.from({ length: count }).map(
                                    (_, index) => (
                                      <img
                                        key={index}
                                        className="h-4 w-7 self-center"
                                        src={TweenSingleBad}
                                      />
                                    )
                                  )}

                                {bedType === "sofa" &&
                                  Array.from({ length: count }).map(
                                    (_, index) => (
                                      <img
                                        key={index}
                                        className="self-center h-5 w-8"
                                        src={SofaBad}
                                      />
                                    )
                                  )}
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className=""></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedCard;
