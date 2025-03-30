import { useTranslation } from "react-i18next";
import { ViIcon } from "../ui/Icons";

interface bookingStepProps {
  step: number;
}

function BookingSteps({ step }: bookingStepProps) {
  const { t } = useTranslation();
  return (
    <div className="border-y-[1px] border-softGrayBorder mt-4 pt-2 signInLayoutTop:border-none mb-4">
      <div className="flex flex-grow gap-2 text-xs font-bold   ">
        <div className="flex flex-grow gap-2 items-center">
          <div className="rounded-full bg-buttonBlue w-[22px] h-[22px] relative">
            <ViIcon className="h-4 w-4 stroke-white stroke-[3px] fill-white absolute -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2  " />
          </div>
          <div className="hidden signInLayoutTop:block">
            {t("booking.bookingSteps.selection")}
          </div>
          <div className="flex-grow relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border after:border-[#868686]"></div>
        </div>

        <div className="flex flex-grow gap-2 items-center">
          { step <= 2 ? 
          <div className="rounded-full bg-buttonBlue  flex items-center justify-center  w-[22px] h-[22px] ">
            <div className="text-white text-[13px] font-bold">2</div>
          </div>
          :
          <div className="rounded-full bg-buttonBlue w-[22px] h-[22px] relative">
            <ViIcon className="h-4 w-4 stroke-white stroke-[3px] fill-white absolute -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2  " />
          </div>
          }
          <div className="hidden signInLayoutTop:block">
            {t("booking.bookingSteps.details")}
          </div>
          <div className="flex-grow relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border after:border-[#868686]"></div>
        </div>

        <div className="flex gap-2 items-center">
          <div className={`rounded-full border-[2px] border-[#868686]  flex items-center justify-center  w-[22px] h-[22px] 
              ${step === 3 ? 'bg-buttonBlue' : ''}`}>
            <div className={`text-[13px] font-bold ${step === 3 ? 'text-white' : 'text-[#595959]'}`}>3</div>
          </div>
          <div className="hidden signInLayoutTop:block">
            {t("booking.bookingSteps.finish")}
          </div>
        </div>
      </div>
      <div className="signInLayoutTop:hidden flex justify-between  my-2 text-sm">
        <div className=" text-[13px] font-bold gap-4">
          {t("booking.bookingSteps.details")}
        </div>
        <div className="text-[13px] font-normal">
          {t("booking.bookingSteps.steps")}
        </div>
      </div>
    </div>
  );
}

export default BookingSteps;
