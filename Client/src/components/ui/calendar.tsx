import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { he } from "date-fns/locale";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const hebrewDayNames = [
  "יום א'",
  "יום ב'",
  "יום ג'",
  "יום ד'",
  "יום ה'",
  "יום ו'",
  "יום ש'",
];

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  fromDate,
  locale,
  dir = "ltr", // Default to LTR
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState<Date | undefined>(
    props.month || fromDate || new Date()
  );

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      dir={dir}
      locale={locale}
      month={currentMonth}
      onMonthChange={setCurrentMonth}
      fromDate={fromDate}
      formatters={{
        formatWeekdayName: (weekday) => {
          const dayIndex = weekday.getDay(); // Extract the day index (0-6)
          return locale === he
            ? hebrewDayNames[dayIndex]
            : weekday
                .toLocaleDateString("en", { weekday: "short" })
                .slice(0, 2);
        },
      }}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-md font-bold",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-10 w-10 text-xl px-4 py-3 border-none shadow-none bg-transparent font-black  hover:opacity-100"
        ),
        nav_button_previous: cn(
          "absolute [&_svg]:h-6 [&_svg]:w-6",
          dir === "rtl" ? "right-1" : "left-1",
          currentMonth &&
            fromDate &&
            currentMonth.getMonth() === fromDate.getMonth() &&
            currentMonth.getFullYear() === fromDate.getFullYear()
            ? "hidden" // Hides the button when at the start date
            : ""
        ),
        nav_button_next: cn(
          "absolute [&_svg]:h-6 [&_svg]:w-6",
          dir === "rtl" ? "left-1" : "right-1"
        ),
        table: "w-full border-collapse space-y-1",
        head_row: "flex text-[#595959]",
        head_cell: "w-full rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-1",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-[1.4rem] font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start rounded-e-none",
        day_range_end: "day-range-end rounded-s-none",
        day_selected:
          "bg-primary rounded-s-md text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "text-[#006ce4] font-extrabold hover:text-[#006ce4]",

        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-[#f2f2f2] rounded-none aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-10 w-10 ", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-10 w-10", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
