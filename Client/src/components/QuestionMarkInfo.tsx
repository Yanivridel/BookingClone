import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { QuestionMarkInfoIcon } from "./ui/Icons";

interface QuestionMarkInfoProps {
  cancellation?: string;
  prepayment?: string;
  meals?: [
    {
      type: "morning" | "noon" | "afternoon" | "evening";
      rating: number; // min: 0 , max: 10
      review_num: number; // min: 0
    }
  ];
}

function QuestionMarkInfo({
  meals,
  prepayment,
  cancellation,
}: QuestionMarkInfoProps) {
  const { t } = useTranslation();
  return (
    <div>
      <Dialog>
        <DialogTrigger className="cursor-pointer " asChild>
          <div>
            <QuestionMarkInfoIcon />
          </div>
        </DialogTrigger>
        <DialogContent className="w-4/5 rounded-2xl sm:rounded-2xl flex flex-col ">
          <h2 className="font-bold"> {t("questionMarkInfo.mealsHeader")}</h2>
          {meals &&
            meals.map((meal) => {
              const mealType =
                meal.type === "morning"
                  ? "Breakfast"
                  : meal.type === "noon"
                  ? "Lunch"
                  : meal.type === "afternoon"
                  ? "Snack"
                  : "Dinner";

              return (
                <div className=" flex flex-col gap-2 text-sm">
                  <div>
                    <span>
                      {mealType + " " + t("questionMarkInfo.included")}
                    </span>
                  </div>
                  <div className="flex">
                    <div>{mealType + " " + t("questionMarkInfo.rated")}</div>
                    <span className="px-1"> {meal.rating}</span>
                    <span>{"-"}</span>
                    <div className="px-1">
                      {`${t("questionMarkInfo.based")} 
                        ${meal.review_num}
                        ${t("questionMarkInfo.reviews")}`}
                    </div>{" "}
                  </div>
                </div>
              );
            })}
          {cancellation && (
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-base">
                {t("questionMarkInfo.cancellationHeader")}
              </h2>
              <div className=" flex gap-3 text-sm font-normal">
                <span>•</span>
                <span className="font-bold">{cancellation}</span>
              </div>
            </div>
          )}
          {prepayment && (
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-base">
                {t("questionMarkInfo.prepaymentHeader")}
              </h2>
              <div className=" flex gap-3 text-sm font-normal">
                <span>•</span>
                <span className="font-bold">
                  {" "}
                  {t("questionMarkInfo.prepaymentSubHeader")}
                </span>
              </div>
              <span className="text-sm">{prepayment}</span>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default QuestionMarkInfo;
