import { TPartialProperty } from '@/types/propertyTypes';
import axios from 'axios';

const LOCAL_HOST = 'http://localhost:3000';
const API_URL = LOCAL_HOST;

// * Done
export const getPropertyById = async (id : string) => {
    try {
        const { data } = await axios.get(`${API_URL}/api/property/${id}`);
        return data.data;
    } catch (error) {
        console.error('Auth check error:', error);
        throw error;
    }
};
//! Work only for primary search -> does'nt support secondary search YET
export const searchProperties = async (propertyParams : TPartialProperty ) => {
    try {
        const { data } = await axios.post(`${API_URL}/api/property/`, 
            propertyParams );
        return data.data;
    } 
    catch (error) {
        console.error('Add recipe error:', error);
        throw error;
    }
}
