import { IHotelAreaInfoCategoty } from "@/types/propertyTypes";
import { hotelAreaInfo } from "@/utils/staticData";

interface PropertyNearByCardProps {
  hotel_area_info:
    | {
        category: IHotelAreaInfoCategoty;
        id: string;
        _id: string;
        sub: {
          content: string;
          distance: number;
          _id: string;
          id: string;
        }[];
      }[]
    | undefined;
}

function PropertyNearBy({ hotel_area_info }: PropertyNearByCardProps) {
  return (
    <div>
      <div className=" grid sm:grid-cols-2 search:grid-cols-3 gap-3">
        {/* נריץ על כל המערך hotel_area_info */}
        {hotel_area_info?.map((area) => {
          const category = area.category;
          const path = hotelAreaInfo[category]; // מוצאים את ה-path עבור כל קטגוריה
          // console.log(path);

          // אם ה-path קיים, נציג את ה-svg
          return (
            path && (
              <div key={area.id}>
                <div className="p-3 flex gap-2">
                  <svg
                    className="fill-black h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d={path}></path>
                  </svg>
                  <h1 className="font-bold">{category}</h1>
                </div>
                <div>
                  {area.sub.map((place) => (
                    <div
                      key={place._id}
                      className="flex justify-between gap-4 items-center p-2 text-sm"
                    >
                      <div>{place.content}</div>
                      <div className="whitespace-nowrap text-[#595959]">
                        {place.distance} km
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default PropertyNearBy;
