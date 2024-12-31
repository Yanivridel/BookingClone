import axios from 'axios';
import { IFormDataLogIn, IFormDataSingUp, IUser } from '@/types/userTypes';
import { getCookie } from './cookies';

const LOCAL_HOST = 'http://localhost:3000';
const API_URL = LOCAL_HOST;


export const getSelf = async (token: string) => {
    try {
        const { data } = await axios.get(`${API_URL}/api/users/get-self`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        console.error('Auth check error:', error);
        throw error;
    }
};

/*
export const createUser = async ({fName, lName, phone, email, password, role}: IFormDataSingUp) => {
    try {
        const { data } = await axios.post(`${API_URL}/api/users/signup`, {fName, lName, phone, email, password, role });
        return data;
        
    } 
    catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};

export const checkLogin = async ({email, password}: IFormDataLogIn) => {
    try {
        const { data } = await axios.post(`${API_URL}/api/users/login`, { email, password }, { withCredentials: true });
        return data;
    } 
    catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};



export const getUserById = async (userId : string) => {
    try {
        const { data } = await axios.get(`${API_URL}/api/users/${userId}`);
        return data;
    } 
    catch (error) {
        console.error('Failed fetching user by id error:', error);
        throw error;
    }
};

export const editProfile = async (user : User ) => {
    try {
        const { data } = await axios.patch(`${API_URL}/api/users/edit-profile`, user, 
            {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`
                }
            });
        return data;
    } 
    catch (error) {
        console.error('Add recipe error:', error);
        throw error;
    }
}

*/
