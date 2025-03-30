// types
import { type BookingInfo } from "@/types/bookingTypes";

type BookingPriceSummaryProps = {
  bookingInfo: BookingInfo;
};

function BookingPriceSummary({ bookingInfo }: BookingPriceSummaryProps) {
  if (!bookingInfo.bookingDetailsData.totalPrice) return;

  return (
    <section className="border-[1px] border-softGrayBorder  mt-4  rounded-[8px] py-4 grid gap-2 ">
      <h3 className="px-4 font-bold">Your price summary</h3>

      <div>original price</div>

      <div className="bg-[#ebf3ff] ">
        <div className=" mx-4 flex justify-between border-b-[1px] py-4">
          <b className="text-2xl tracking-wide mt-6">Total</b>
          <div className="flex flex-col items-end relative ">
            <del className="text-[#CC0000] ">
              {bookingInfo.bookingDetailsData.totalPriceWithDiscount}
              <span> ₪</span>
            </del>
            <b className="text-2xl ">
              ₪ {bookingInfo.bookingDetailsData.totalPrice}
            </b>
            <p className="text-sm text-[#595959]">Includes taxes and fees</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingPriceSummary;
