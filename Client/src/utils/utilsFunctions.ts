import { IProperty } from "@/types/propertyTypes";

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const propertyRatingAvg = (
  propertyData: IProperty
): number | undefined => {
  if (!propertyData) {
    console.log("propertyData missing");
    return;
  }

  if (!propertyData.rating) {
    console.log("property rating missing");
    return;
  }

  const ratingAvg = Array.from(Object.values(propertyData.rating)).reduce(
    (acc, value, i, array) => {
      if (i === array.length - 1) {
        return (acc + value) / array.length;
      }
      return acc + value;
    },
    0
  );
  return ratingAvg;
};

// reset the hours
export const resetDateHours = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};
