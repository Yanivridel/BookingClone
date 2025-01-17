import { MonthNameYear } from "@/components/search";
import { ISearchPropertiesReq } from "@/types/propertyTypes";

const corsProxyUrl = "https://api.allorigins.win/get?url="; // Replace with another CORS proxy URL
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Capitalize each first letter in the str
export const cw = (str: string) =>
  str.replace(/\b\w/g, (char) => char.toUpperCase());
// Capitalize first letter only
export const cf = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export function getDescByRating(rating: number) {
  if (rating >= 9) {
    return "Exceptional";
  } else if (rating >= 8) {
    return "Fabulous";
  } else if (rating >= 7) {
    return "Excellent";
  } else if (rating >= 6) {
    return "Very Good";
  } else if (rating >= 5) {
    return "Good";
  } else if (rating >= 4) {
    return "Average";
  } else if (rating >= 3) {
    return "Fair";
  } else if (rating >= 2) {
    return "Poor";
  } else {
    return "Bad";
  }
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

export const toFormattedDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export async function getCityImage(city: string) {
  // Replace with your actual API key (ensure it's set in your environment)

  // Construct the Google Places API URL
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${city}&inputtype=textquery&fields=photos&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (data.status === "OK" && data.candidates.length > 0) {
      const photoReference = data.candidates[0].photos[0].photo_reference;
      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
      console.log(photoUrl);
      return photoUrl;
    } else {
      console.error("No results found or API error:", data.status);
      return "";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return "";
  }
}

export const convertMonthsToQueryString = (months: MonthNameYear[]) => {
  return months
    .map(({ month, year }) => `${month}_${year}`) // כל חודש ושנה
    .join(","); // מחבר את כל הערכים בפסיקים
};

export const parseMonthsFromQueryString = (queryString: string): MonthNameYear[] => {
  return queryString
    .split(",")
    .map(item => {
      const [month, year] = item.split("_");
      return { month: parseInt(month), year: parseInt(year) };
    });
};

export const makeUrlForSearch =(finalData: ISearchPropertiesReq) => {
  let url = "/searchresults?";

  //  locations
  if (finalData.primary.location.country) {
    url += `country=${finalData.primary.location.country}&`;
  }
  if (finalData.primary.location.region) {
    url += `region=${finalData.primary.location.region}&`;
  }
  if (finalData.primary.location.city) {
    url += `city=${finalData.primary.location.city}&`;
  }
  if (finalData.primary.location.addressLine) {
    url += `addressLine=${finalData.primary.location.addressLine}&`;
  }

  // dates
  if (finalData.primary.date.startDate) {
    url += `startDate=${finalData.primary.date.startDate}&`;
  }
  if (finalData.primary.date.endDate) {
    url += `endDate=${finalData.primary.date.endDate}&`;
  }
  if (finalData.primary.date.isWeekend) {
    url += `isWeekend=${finalData.primary.date.isWeekend}&`;
  }
  if (finalData.primary.date.length) {
    url += `length=${finalData.primary.date.length}&`;
  }
  if (finalData.primary.date.fromDay) {
    url += `fromDay=${finalData.primary.date.fromDay}&`;
  }

  // options
  if (finalData.primary.options.adults) {
    url += `adults=${finalData.primary.options.adults}&`;
  }
  if (finalData.primary.options.rooms) {
    url += `rooms=${finalData.primary.options.rooms}&`;
  }

  if (finalData.primary.options.childrenAges?.length) {
    url += `childrenAges=${finalData.primary.options.childrenAges.join(
      ", "
    )}&`;
  }
  if (finalData.primary.options.isAnimalAllowed) {
    url += `isAnimalAllowed=${finalData.primary.options.isAnimalAllowed}&`;
  }

  if (finalData.primary.date.yearMonths?.length) {
    const monthsQueryString = convertMonthsToQueryString(finalData.primary.date.yearMonths);
    url += `yearMonths=${monthsQueryString}&`;
  }
  return url;
}


