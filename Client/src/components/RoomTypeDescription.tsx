import PopularFacilities from "./PopularFacilities";
import RoomFeatures from "./RoomFeatures";
import { IRoom } from "@/types/roomTypes";

interface RoomTypeDescription {
  room: IRoom;
}

function RoomTypeDescription({ room }: RoomTypeDescription) {
  return (
    <div>
      <h3 className="text-primary cursor-pointer font-bold underline ">
        {room.title}
      </h3>
      <div>{/* {room.rooms.map(()=>{})} */}</div>
      <div className="pb-3">
        <PopularFacilities
          iconsClassName={"fill-black w-4 h-4"}
          facilityTitleClassName={"text-[12px]"}
          facilityWrapperClassName="py-0"
          popularFacilities={room.facilities}
        />
      </div>
      <hr />
      <div className="py-2">
        <RoomFeatures features={room.features} />
      </div>
    </div>
  );
}

export default RoomTypeDescription;
