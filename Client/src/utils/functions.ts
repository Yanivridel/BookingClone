import { MonthYear } from "@/components/search";

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

export const convertMonthsToQueryString = (months: MonthYear[]) => {
  return months
    .map(({ month, year }) => `${month}_${year}`) // כל חודש ושנה
    .join(","); // מחבר את כל הערכים בפסיקים
};
