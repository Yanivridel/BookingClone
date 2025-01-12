import { cn } from "@/lib/utils";
import { useState } from "react";
import { IconCounterMinus, IconCounterPlus } from "./ui/Icons";

interface CounterProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  min: number;
  max: number;
  className: string;
}

function Counter({ count, setCount, min, max, className }: CounterProps) {
  const [signDisabled, _setSignDisabled] = useState(
    "cursor-not-allowed fill-softGray"
  );
  function plusClick() {
    count < max && setCount(count + 1);
  }

  function minusClick() {
    count > min && setCount(count - 1);
  }

  return (
    <div
      className={cn(
        "border-[#868686] border-[1.5px]  rounded-lg p-2 flex justify-around items-center w-[50%]",
        className
      )}
    >
      <button
        onClick={minusClick}
        className={cn("text-2xl fill-blue-600", count === min && signDisabled)}
      >
        <IconCounterMinus />
      </button>
      <p>{count}</p>
      <button
        onClick={plusClick}
        className={cn("text-lg fill-blue-600", count === max && signDisabled)}
      >
        <IconCounterPlus />
      </button>
    </div>
  );
}

export default Counter;
