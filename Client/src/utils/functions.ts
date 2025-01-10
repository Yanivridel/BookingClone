
const corsProxyUrl = 'https://api.allorigins.win/get?url='; // Replace with another CORS proxy URL
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


// Capitalize each first letter in the str
export const cw = (str: string) => str.replace(/\b\w/g, char => char.toUpperCase());
// Capitalize first letter only
export const cf = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

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
        console.log(photoUrl)
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