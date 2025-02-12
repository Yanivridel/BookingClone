import axios from "axios";

export async function getCoordinatesByLocation(location: string) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK') {
            const lat = parseFloat(data.results[0].geometry.location.lat);
            const lng = parseFloat(data.results[0].geometry.location.lng);
            return [lng, lat];
        } else {
            console.error('Geocoding failed:', data.status);
            return null;
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
}