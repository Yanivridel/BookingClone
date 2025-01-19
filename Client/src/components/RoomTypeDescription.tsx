import PopularFacilities from "./PopularFacilities";
import RoomFeatures from "./RoomFeatures";
import { IRoom } from "@/types/roomTypes";

import QueenBad from "../assets/images/Screenshot 2025-01-15 at 22.24.04.png";
import BunkBad from "../assets/images/bunk.png";
import SofaBad from "../assets/images/sofa.png";
import TweenSingleBad from "../assets/images/tweenSingle.png";
import { useTranslation } from "react-i18next";
import InnerRoomsDialog from "./InnerRoomsDialog";

interface RoomTypeDescription {
  room: IRoom;
}

function RoomTypeDescription({ room }: RoomTypeDescription) {
  const { t } = useTranslation();
  const badesCount = room.rooms.reduce(
    (acc, innerRoom) => {
      acc.bunk += innerRoom.beds.bunk || 0;
      acc.double += innerRoom.beds.double || 0;
      acc.queen += innerRoom.beds.queen || 0;
      acc.single += innerRoom.beds.single || 0;
      acc.sofa += innerRoom.beds.sofa || 0;
      return acc;
    },
    { bunk: 0, double: 0, queen: 0, single: 0, sofa: 0 } // ערכים התחליים
  );

  return (
    <div>
      <div className="pb-3">
        <InnerRoomsDialog room={room} />
      </div>

      {/* beds 
       TODO:
       1. beds connect to rooms 
       2. rander bads icons * bedNumber */}
      <div className="text-sm pb-3">
        {badesCount.bunk > 0 && (
          <div className="flex flex-wrap">
            <span className="pe-1">{badesCount.bunk}</span>
            <span className="pe-1">{t("beds.bunk")}</span>
            <span>
              <img className="h-6 w-6" src={BunkBad} />
            </span>
          </div>
        )}
        {badesCount.double > 0 && (
          <div className="flex flex-wrap">
            <span className="pe-1">{badesCount.double}</span>
            <span className="pe-1">{t("beds.double")}</span>
            <span>
              <img className="h-4 w-7" src={TweenSingleBad} />
            </span>
          </div>
        )}

        {badesCount.queen > 0 && (
          <div className="flex flex-wrap">
            <span className="pe-1">{badesCount.queen}</span>
            <span className="pe-1">{t("beds.queen")}</span>
            <span>
              <img className="h-5 w-10" src={QueenBad} />
            </span>
          </div>
        )}
        {badesCount.single > 0 && (
          <div className="flex flex-wrap ">
            <span className="pe-1">{badesCount.single}</span>
            <span className="pe-1">{t("beds.single")}</span>
            <span>
              <img className="h-4 w-7" src={TweenSingleBad} />
            </span>
          </div>
        )}
        {badesCount.sofa > 0 && (
          <div className="flex flex-wrap">
            <span className="pe-1">{badesCount.sofa}</span>
            <span className="pe-1">{t("beds.sofa")}</span>

            <span>
              <img className="h-5 w-8" src={SofaBad} />
            </span>
          </div>
        )}
      </div>
      {/* popular */}
      <div className="pb-3">
        <PopularFacilities
          iconsClassName={"fill-black w-4 h-4"}
          facilityTitleClassName={"text-[12px]"}
          facilityWrapperClassName="py-0"
          popularFacilities={room.facilities}
        />
      </div>
      <hr />
      {/* featers */}
      <div className="py-2">
        <RoomFeatures features={room.features} />
      </div>
    </div>
  );
}

export default RoomTypeDescription;
