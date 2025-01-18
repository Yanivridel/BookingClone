import { t } from "i18next";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import Counter from "./Counter";

interface SearchPeopleProps {
  adultsCount: number;
  childrenCount: number;
  roomsCount: number;
  setAdultsCount: React.Dispatch<React.SetStateAction<number>>;
  setChildrenCount: React.Dispatch<React.SetStateAction<number>>;
  setChildrenAges: React.Dispatch<
    React.SetStateAction<(number | typeof NaN | undefined | null | "")[]>
  >;
  childrenAges: (number | "" | null | undefined)[];
  setRoomsCount: React.Dispatch<React.SetStateAction<number>>;
  setIsPets: React.Dispatch<React.SetStateAction<boolean>>;
  isPets: boolean;
  setopenPepolePophover: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchPeople({
  adultsCount,
  childrenCount,
  roomsCount,
  isPets,
  setIsPets,
  setAdultsCount,
  setChildrenCount,
  childrenAges,
  setChildrenAges,
  setRoomsCount,
  setopenPepolePophover,
}: SearchPeopleProps) {
  const handleChildrenAgeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    setChildrenAges((prev) => {
      const updatedAges = [...prev];
      Number(e.target.value) !== -1
        ? (updatedAges[index] = Number(e.target.value))
        : (updatedAges[index] = NaN);
      return updatedAges;
    });
  };
  const optionCount = 19;

  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex justify-between items-center">
        <span>{t("SearchPeople.Adults")}</span>
        <Counter
          min={1}
          max={30}
          count={adultsCount}
          setCount={setAdultsCount}
          className={"w-[124px]"}
        ></Counter>
      </div>
      <div className="flex justify-between items-center">
        <span>{t("SearchPeople.Children")}</span>
        <Counter
          className={"w-[124px]"}
          min={0}
          max={10}
          count={childrenCount}
          setCount={setChildrenCount}
        ></Counter>
      </div>
      {childrenCount > 0 && (
        <div>
          <div className="grid grid-cols-2 gap-2">
            {[...Array(childrenCount)].map((_, index) => (
              <select
                key={index + "select"}
                value={childrenAges[index] as number}
                onChange={(e) => handleChildrenAgeChange(e, index)}
                className="focus:outline-none pe-3 py-2 rounded-md border-[1.5px] cursor-pointer text-searchGrayText border-[#868686] "
              >
                {[...Array(optionCount)].map((_, i) => (
                  <option key={i + "option" + index} value={i - 1}>
                    {t(`SearchPeople.ChildrenAges.${i}`)}
                  </option>
                ))}
              </select>
            ))}
          </div>

          <div className="py-2">{t("SearchPeople.ChildrenMessage")}</div>
        </div>
      )}
      <div className="flex justify-between items-center border-b-[1px] pb-4">
        <span>{t("SearchPeople.rooms")}</span>
        <Counter
          className={"w-[124px]"}
          min={1}
          max={30}
          count={roomsCount}
          setCount={setRoomsCount}
        ></Counter>
      </div>
      <div className="flex justify-between items-center">
        <span>{t("SearchPeople.petsSwich")}</span>
        <Switch
          className="cursor-pointer"
          dir="ltr"
          onClick={() => setIsPets((prev) => !prev)}
          checked={isPets}
        />

      </div>
      <div className="text-xs">
        {t("SearchPeople.petsInfo")} <br />
        <Dialog>
          <DialogTrigger asChild>
            <div className="hover:underline text-primary cursor-pointer">
              {t("SearchPeople.petsLink")}
            </div>
          </DialogTrigger>
          <DialogContent className="w-[576px] max-w-[576px] p-10 flex flex-col items-center">
            <div className="p-50 w-[275px]  ">
              <img
                className="h-full w-full"
                src="https://t-cf.bstatic.com/design-assets/assets/v3.138.1/illustrations-traveller/AssistanceAnimals.png"
                srcSet="https://t-cf.bstatic.com/design-assets/assets/v3.138.1/illustrations-traveller/AssistanceAnimals@2x.png 2x"
                role="presentation"
                loading="lazy"
              />
            </div>
            <DialogHeader className="me-auto">
              <DialogTitle className="text-2xl font-bold ">
                {t("SearchPeople.petsDialogHeader")}
              </DialogTitle>
            </DialogHeader>
            <div>
              <p className="pb-2">
                <span className="hover:underline text-primary cursor-pointer">
                  <a
                    target="_blank"
                    href="https://secure.booking.com/help/faq/31/RkFRX1BldHNfVHJhdmVsbGluZ19XaXRoX0Fzc2lzdGFuY2VfQW5pbWFscw?category=policies&amp;render_html=1"
                  >
                    {" "}
                    {t("SearchPeople.petsDialogContent.0")}
                  </a>
                </span>
                {t("SearchPeople.petsDialogContent.1")}
              </p>
              <p>{t("SearchPeople.petsDialogContent.2")}</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Button
        onClick={() => setopenPepolePophover(false)}
        className="bg-white border-[1.5px] border-buttonBlue text-buttonBlue hover:bg-softBlue py-[18px] rounded-lg"
      >
        {t("SearchPeople.Done")}
      </Button>
    </div>
  );
}

export default SearchPeople;
