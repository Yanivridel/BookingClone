import { type BookingInfo } from "@/types/bookingTypes";

import { he, enUS } from "date-fns/locale";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { resetDateHours } from "@/utils/utilsFunctions";
type BookingDatesProps = {
  bookingInfo: BookingInfo;
};

function BookingDates({ bookingInfo }: BookingDatesProps) {
  if (!bookingInfo) return;

  //  for format function (date-fns )
  const { i18n } = useTranslation();
  const formattedEnglish = "EEE, MMM dd, yyyy";
  const currentLocale = i18n.language === "he" ? he : enUS;
  const startDate = bookingInfo.bookingDetailsData?.startDate || undefined;
  const endDate = bookingInfo.bookingDetailsData?.endDate || undefined;

  //    hours
  const checkIn = bookingInfo.propertyData.houseRules.checkin;
  const checkOut = bookingInfo.propertyData.houseRules.checkout;

  const formattedCheckInHours =
    checkIn.start && checkIn.end
      ? `${checkIn.start} - ${checkIn.end}`
      : checkIn.start
      ? checkIn.start
      : undefined;

  const formattedCheckOutHours =
    checkOut.start && checkOut.end
      ? `${checkOut.start} - ${checkOut.end}`
      : checkOut.start
      ? `${checkOut.start} `
      : undefined;

  const resetStartDate = resetDateHours(startDate);
  const resetEndDate = resetDateHours(endDate);

  const differenceInTime = resetEndDate.getTime() - resetStartDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
  console.log(differenceInDays);

  const nightsNum = differenceInDays;

  return (
    <section className="border-[1px] mt-4 border-softGrayBorder px-4 rounded-[8px] py-4 grid gap-2 ">
      <div className="tab:grid tab:grid-cols-2">
        {startDate && (
          <div className="border-b-[1px] pb-2 tab:border-b-0 tab:pb-0 tab:border-e-[1px] tab:pe-3">
            <div className="text-sm font-medium">Check-in</div>
            <div>
              {/* end date */}
              <p className="font-bold">
                {format(startDate, formattedEnglish, { locale: currentLocale })}
              </p>
              {/* hours for check in */}
              {formattedCheckInHours && (
                <p className="text-sm text-searchGrayText">
                  {formattedCheckInHours}
                </p>
              )}
            </div>
          </div>
        )}
        {endDate && (
          <div className="pt-2 tab:pt-0  tab:ps-3">
            <div className="text-sm font-medium">Check-out</div>
            <div>
              {/* end date */}
              <p className="font-bold">
                {format(endDate, formattedEnglish, { locale: currentLocale })}
              </p>
              {/* hours for check out */}
              {formattedCheckOutHours && (
                <p className="text-sm text-searchGrayText">
                  {formattedCheckOutHours}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="text-sm">
        <h5 className="mb-1">Total length of stay:</h5>
        <p className="font-bold">{nightsNum} nights</p>
      </div>
    </section>
  );
}

export default BookingDates;
