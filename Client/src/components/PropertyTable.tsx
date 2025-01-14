import { IRoom } from "@/types/roomTypes";
import { useTranslation } from "react-i18next";
import PopularFacilities from "./PopularFacilities";
import RoomFeatures from "./RoomFeatures.tsx";
import { IoPersonSharp } from "react-icons/io5";
import { off } from "process";

const headerRowsNumber = 6;

type PropertyRoomsTableProps = {
  rooms: IRoom[] | undefined;
  nightsNum: number;
};

function PropertyTable({ rooms, nightsNum }: PropertyRoomsTableProps) {
  const { t } = useTranslation();
  return (
    <table>
      <thead>
        <tr className="bg-[#4b76b2] text-white text-xs  sticky top-0 z-10">
          {[...Array(headerRowsNumber)].map((_, i) => (
            <th
              key={i}
              className="border-e-[1px] border-b-[1px] align-text-top text-start  py-2 border-[#5bbaff] "
            >
              {i === 2
                ? t(`propertyTable.THeader.${i}`) +
                  ` ${nightsNum} ` +
                  t(`propertyTable.THeader.${i + 1}`)
                : i === 3 || i === 4
                ? t(`propertyTable.THeader.${i + 1}`)
                : t(`propertyTable.THeader.${i}`)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rooms?.map((room) => (
          <tr>
            <td className="border-e-[1px] border-b-[3px] border-[#5bbaff]">
              <h3 className="text-primary cursor-pointer font-bold underline py-">
                {room.title}
              </h3>
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
            </td>
            <td className="border-e-[1px] border-[#5bbaff]">
              {room.offers.map((offer) => (
                <div className="border-[1px] border-[#5bbaff] flex flex-col">
                  {Array.from({ length: offer.group_adults }).map(
                    (_, index) => (
                      <div className="inline">
                        <IoPersonSharp key={index} />
                      </div>
                    )
                  )}
                </div>
              ))}
            </td>
            <td className="border-e-[1px] border-[#5bbaff]">
              {room.offers.map((offer) => (
                <div className="border-[1px] border-[#5bbaff] flex flex-col">
                  {offer.price_per_night * nightsNum}
                </div>
              ))}
            </td>
            <td className="border-e-[1px] border-[#5bbaff]">vavasdfssdf</td>
            <td className="border-e-[1px] border-[#5bbaff]">vavasdfssdf</td>
            <td className="">vavasdfssdf</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PropertyTable;
