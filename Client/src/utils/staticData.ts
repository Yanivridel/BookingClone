import { IconPlusMinus } from "@/components/ui/Icons";
export const searchCalendarButtonsData = [
  {
    icon: IconPlusMinus,
    text: "search.caledarPlusMibusButtons.4",
  },
  {
    icon: IconPlusMinus,
    text: "search.caledarPlusMibusButtons.3",
  },

  {
    icon: IconPlusMinus,
    text: "search.caledarPlusMibusButtons.2",
  },
  {
    icon: IconPlusMinus,
    text: "search.caledarPlusMibusButtons.1",
  },
  {
    text: "search.caledarPlusMibusButtons.0",
  },
];
export const monthsAndYears = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date();
  const month = date.getMonth();
  let year = date.getFullYear();
  const monthsFromCurrentMonth = [];

  for (let i = 0; i < 12; i++) {
    const currentMonth = months[(month + i) % 12];

    if (month + i === 12) {
      year++;
    }

    monthsFromCurrentMonth.push({ month: currentMonth, year });
  }

  return monthsFromCurrentMonth;
};
