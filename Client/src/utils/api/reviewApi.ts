import axios from 'axios';

const isProduction = import.meta.env.VITE_NODE_ENV === "production";
const API_URL = isProduction ? import.meta.env.VITE_API_URL_CLOUD: import.meta.env.VITE_API_URL_LOCAL;

// * Done
export const getReviewsByPropertyId = async (id: string) => {
    try {
        const { data } = await axios.get(`${API_URL}/api/review/${id}`);
        return data.data;
    } catch (error) {
        console.error('Client Error:', error);
        throw error;
    }
};