// types
import { BookingInfo } from "@/types/bookingTypes";

// icons
import { IconRatingCircle } from "../ui/Icons";

// functions
import { propertyRatingAvg } from "@/utils/utilsFunctions";
import { Badge } from "../ui/badge";
import PopularFacilities from "../PopularFacilities";

type BookingPropertyDetailsProps = {
  bookingInfo: BookingInfo;
};
function BookingPropertyDetails({ bookingInfo }: BookingPropertyDetailsProps) {
  if (!bookingInfo || !bookingInfo?.propertyData) return;

  const propertyData = bookingInfo.propertyData;

  const ratingAvg = propertyRatingAvg(propertyData);

  return (
    <section className="border-[1px] border-softGrayBorder px-4 rounded-[8px] py-4 grid gap-2 ">
      {/* rating circles */}
      <div className="flex items-center ">
        <span className="text-xs me-2">{propertyData.type}</span>
        {ratingAvg &&
          Array.from({ length: Math.round(ratingAvg / 2) }).map((_, i) => (
            <span key={i} className="me-[2px]">
              <IconRatingCircle className="w-3 h-3 fill-[#febb02]" />
            </span>
          ))}
      </div>
      {/* title */}
      <h3 className="font-bold text-md">{propertyData.title},</h3>
      {/* address */}
      <div className="text-sm">
        {propertyData.location.addressLine && (
          <span className="me-1">{propertyData.location.addressLine},</span>
        )}
        {propertyData.location.region && (
          <span className="me-1">{propertyData.location.region},</span>
        )}
        {propertyData.location.country && (
          <span>{propertyData.location.country}</span>
        )}
      </div>
      {/* location rating */}
      {ratingAvg && (
        <div className="text-IconsGreen text-xs">
          <span>
            {ratingAvg > 6 && ratingAvg < 8
              ? "Good Location — "
              : ratingAvg >= 8
              ? "Great Location — "
              : "Location — "}
          </span>
          <span>{ratingAvg.toFixed(1)}</span>
        </div>
      )}
      {/* rating budge */}
      {ratingAvg && (
        <div className="flex gap-2 items-center">
          <Badge variant="rating">{ratingAvg.toFixed(1)}</Badge>
          <p className="text-xs">
            {ratingAvg > 6 && ratingAvg < 8
              ? "Great · "
              : ratingAvg >= 8
              ? "Excellent · "
              : "Good · "}
            {propertyData.reviews_num} reviews
          </p>
        </div>
      )}
      {propertyData.popularFacilities && (
        <PopularFacilities
          popularFacilities={propertyData.popularFacilities}
          iconsClassName="fill-black h-4 w-4"
          facilitiesLimitNumber={4}
          facilityTitleClassName="text-xs"
          facilityWrapperClassName="gap-1"
        />
      )}
    </section>
  );
}

export default BookingPropertyDetails;
