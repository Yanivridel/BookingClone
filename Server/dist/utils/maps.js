"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinatesByLocation = getCoordinatesByLocation;
const axios_1 = __importDefault(require("axios"));
async function getCoordinatesByLocation(location) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;
    try {
        const response = await axios_1.default.get(url);
        const data = response.data;
        if (data.status === 'OK') {
            const lat = parseFloat(data.results[0].geometry.location.lat);
            const lng = parseFloat(data.results[0].geometry.location.lng);
            return [lng, lat];
        }
        else {
            console.error('Geocoding failed:', data.status);
            return null;
        }
    }
    catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
}
//# sourceMappingURL=maps.js.map