import { useTranslation } from "react-i18next";

// shadCN
import { Button } from "./ui/button";

interface TableBookingDetailsProps {
  bookingDetailsData: {
    roomsNumber?: number;
    totalPrice?: number;
    totalPriceWithDiscount?: number;
  };
  handleBooking: () => void;
}

function TableBookingDetails({
  handleBooking,
  bookingDetailsData,
}: TableBookingDetailsProps) {
  const { t } = useTranslation();

  return (
    <div className="font-normal">
      {bookingDetailsData?.roomsNumber && bookingDetailsData.roomsNumber > 0 ? (
        <div>
          <div>
            {bookingDetailsData.roomsNumber === 1 ? (
              // one room
              <span>{t("propertyTable.booking.room")}</span>
            ) : (
              // many rooms
              <span>
                {bookingDetailsData.roomsNumber +
                  " " +
                  t("propertyTable.booking.rooms")}
              </span>
            )}
            <span className="ms-1"></span>for
          </div>
          {/* if discount exist and greater then 0 show the price and discount else only the price */}
          {bookingDetailsData?.totalPriceWithDiscount &&
          bookingDetailsData?.totalPriceWithDiscount > 0 ? (
            <div className="text-lg">
              <span className="me-2">
                {bookingDetailsData.totalPriceWithDiscount} ₪
              </span>
              <span className="line-through text-red-700 text-sm">
                {bookingDetailsData.totalPrice} ₪
              </span>
            </div>
          ) : (
            <span className="me-2">{bookingDetailsData.totalPrice} ₪</span>
          )}

          <div className="mb-2 text-xs text-searchGrayText">
            {t("order.afterSelectRooms.taxes")}
          </div>
          <Button id="bookingButton" onClick={handleBooking}>
            {t("order.beforeSelectRooms.button")}
          </Button>
          <div className="pt-2">
            {t("order.afterSelectRooms.AdditionalText")}
          </div>
          <div className="py-2 text-sm flex flex-col gap-2">
            <div className="flex gap-3">
              <span>•</span>
              <span className="">{t("order.beforeSelectRooms.firstText")}</span>
            </div>
            <div className="flex gap-3">
              <span>•</span>
              <span>{t("order.beforeSelectRooms.secondText")}</span>
            </div>
          </div>
        </div>
      ) : (
        // if not selected rooms
        <div>
          <Button id="bookingButton" onClick={handleBooking}>
            {t("order.beforeSelectRooms.button")}
          </Button>
          <div className="py-2 text-sm flex flex-col gap-2">
            <div className="flex gap-3">
              <span>•</span>
              <span className="">{t("order.beforeSelectRooms.firstText")}</span>
            </div>
            <div className="flex gap-3">
              <span>•</span>
              <span>{t("order.beforeSelectRooms.secondText")}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TableBookingDetails;
