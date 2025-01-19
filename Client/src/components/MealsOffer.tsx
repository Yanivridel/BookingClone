import { CofeeCup } from "./ui/Icons";
import { useTranslation } from "react-i18next";

interface MealsOfferProps {
  meals: [
    {
      type: "morning" | "noon" | "afternoon" | "evening";
      rating: number; // min: 0 , max: 10
      review_num: number; // min: 0
    }
  ];
}

function MealsOffer({ meals }: MealsOfferProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
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
            <div key={meal.type} className="text-deals  fill-deals flex gap-2">
              <CofeeCup className="h-4 w-4  shrink-0" />
              <div>
                <span className="font-bold">good {mealType}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default MealsOffer;
