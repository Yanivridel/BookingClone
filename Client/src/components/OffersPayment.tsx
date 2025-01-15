import { useTranslation } from "react-i18next";
import { Badge } from "./ui/badge";
import { GeniusLogo, Information } from "./ui/Icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip.tsx";

interface OffersPaymentProps {
  discount: {
    type: string;
    percentage: number;
    expires: Date;
  };
  price_per_night: number;
  nightsNum: number;
  is_genius: boolean;
}

function OffersPayment({
  discount,
  price_per_night,
  nightsNum,
  is_genius,
}: OffersPaymentProps) {
  const { t } = useTranslation();
  const currentDate = new Date();
  return (
    <>
      {/* discount */}

      {discount.percentage && new Date(discount.expires) > currentDate && (
        <del className="text-red-500 text-xs">
          {(Number(price_per_night) * nightsNum).toFixed(2)}
          <span> ₪</span>{" "}
        </del>
      )}
      {/* tooltip */}
      <h2 className="text-md font-bold flex">
        {" "}
        <span> ₪</span>
        {(
          Number(price_per_night) * nightsNum -
          (Number(price_per_night) * nightsNum) / Number(discount.percentage)
        ).toFixed()}
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <span className="ps-[6px] mt-1">
                <Information className="h-3 w-3" />
              </span>
            </TooltipTrigger>
            <TooltipContent
              align="end"
              side="bottom"
              className="bg-white text-black shadow-searchPopupsShadow p-4 flex flex-col gap-2 text-md"
            >
              {/* {original price} */}
              <div className="flex justify-between gap-6 text-sm">
                <div>
                  <span>₪</span>
                  <span className="ps-1">{price_per_night} </span>
                  <span>x</span>{" "}
                  <span>
                    {nightsNum} {t("OffersDiscount.nights")}
                  </span>
                  <span></span>
                </div>
                <div>
                  <span>{"₪ "}</span>
                  {(Number(price_per_night) * nightsNum).toFixed(2)}
                </div>
              </div>
              {/* discount amount */}
              <div className="flex justify-between gap-6 text-sm">
                <span> Booking.com {t("OffersDiscount.pay")} </span>
                <div>
                  <span>- </span> <span>{"  ₪ "}</span>
                  {(
                    (Number(price_per_night) / Number(discount.percentage)) *
                    Number(nightsNum)
                  ).toFixed(2)}
                </div>
              </div>

              <div className="flex justify-between gap-6 text-xs text-searchGrayText">
                {t("OffersDiscount.BookingDiscountExplenation")}
              </div>
              <hr className="my-2" />
              {/* after discount */}
              <div className="flex justify-between gap-6 text-sm font-bold ">
                <span> {t("OffersDiscount.total")} </span>
                <div>
                  <span>- </span> <span>{"  ₪ "}</span>
                  {(
                    Number(price_per_night) * nightsNum -
                    (Number(price_per_night) * nightsNum) /
                      Number(discount.percentage)
                  ).toFixed(2)}
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h2>
      {discount.percentage && new Date(discount.expires) > currentDate && (
        <div>
          <Badge variant="deals" className="">
            <div className="flex gap-1">
              <span>{discount.percentage + "%"}</span>

              <span className="text-xs font-light">
                {t("OffersDiscount.off")}
              </span>
            </div>
          </Badge>
        </div>
      )}

      {is_genius && (
        <div>
          <Badge variant={"gunies"}>
            <GeniusLogo className="h-5 w-10 fill-white " />
          </Badge>
        </div>
      )}
      {/* </div> */}
    </>
  );
}

export default OffersPayment;
