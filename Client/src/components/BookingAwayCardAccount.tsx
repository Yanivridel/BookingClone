import { Button } from "./ui/button";
import Stick from "../assets/images/GeniusAllBookingsStamp.png";
import { useTranslation } from "react-i18next";

function BookingAwayCardAccount() {
  const {t} = useTranslation()

  return (
    <div className="flex bg-white rounded-lg">
      <div className=" p-5 flex flex-col gap-8 rounded-lg">
        <div className=" flex gap-2">
          <div>
            <img src={Stick} alt="" className="w-10 h-10" />
          </div>
          <div>
            <h1 className="font-bold text-sm mt-2">
              {t("MyAccount.You'reBookings")}
            </h1>
          </div>
        </div>
        <div className="">
          <Button
            variant="ghost"
            className="text-blue-600 hover:bg-accent hover:text-blue-600"
          >
            {t("MyAccount.CheckProgress")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookingAwayCardAccount;
