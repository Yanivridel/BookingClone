import axios from 'axios';
import { TPartialUser } from '@/types/userTypes';
import Cookies from "js-cookie";

const isProduction = import.meta.env.VITE_NODE_ENV === "production";
const API_URL = isProduction ? import.meta.env.VITE_API_URL_CLOUD: import.meta.env.VITE_API_URL_LOCAL;

// * Done
export const getSelf = async () => {
    try {
        const token = Cookies.get("token");
        console.log("COOKIES", token);
        if(!token) return null;

        const { data } = await axios.get(`${API_URL}/api/users/get-self`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data.data;
    } catch (error) {
        console.error('Auth check error:', error);
        throw error;
    }
};
// * Done
export const sendEmailCode = async (email: string, isLogin: boolean) => {
    try {
        const { data } = await axios.post(`${API_URL}/api/users/send-code`, {
            email,
            isLogin
        });
        return data;
    } catch (error) {
        console.error('Auth check error:', error);
        throw error;
    }
};
// * Done
// export const signinUser = async (email: string, code: string) => {
//     try {
//         const { data } = await axios.post(`${API_URL}/api/users/signin`, {
//             email,
//             code
//         }, { withCredentials: true });
//         return data.data;
//     } 
//     catch (error) {
//         console.error('Signup error:', error);
//         throw error;
//     }
// };
export const signinUser = async (email: string, code: string) => {
    try {
        const { data } = await axios.post(
            `${API_URL}/api/users/signin`, 
            { email, code },
            { 
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        return data.data;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};
// * Done
export const editProfile = async (fieldsToUpdate : TPartialUser ) => {
    try {
        const { data } = await axios.patch(`${API_URL}/api/users/edit-profile`, 
            fieldsToUpdate, 
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            });
        return data.data;
    } 
    catch (error) {
        console.error('Edit profile error:', error);
        throw error;
    }
}
// * Done
export const modifyUserArrays = async (action: string, userArrays : any ) => {
    try {
        const { data } = await axios.patch(`${API_URL}/api/users/modify-arrays`,
            {
                action,
                ...userArrays
            }
            ,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            });
        return data.data;
    } 
    catch (error) {
        console.error('Add SavedList error:', error);
        throw error;
    }
}
// * Done
export const getSearch = async () => {
    try {
        const token = Cookies.get("token");
        const { data } = await axios.get(`${API_URL}/api/users/search`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data.data;
    } catch (error) {
        console.error('Auth check error:', error);
        throw error;
    }
};
// * Done
export const getInterested = async () => {
    try {
        const token = Cookies.get("token");
        const { data } = await axios.get(`${API_URL}/api/users/interested`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data.data;
    } catch (error) {
        console.error('Auth check error:', error);
        throw error;
    }
};
// * Done
export const getSavedLists = async () => {
    try {
        const token = Cookies.get("token");
        const { data } = await axios.get(`${API_URL}/api/users/saved-lists`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data.data;
    } catch (error) {
        console.error('Auth check error:', error);
        throw error;
    }
};
//! NOT YET FINISHED - COME BACK LATER
export const deleteUser = async () => {
    try {
        const token = Cookies.get("token");
        const { data } = await axios.delete(`${API_URL}/api/users/delete-account`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data.data;
    } catch (error) {
        console.error('Auth check error:', error);
        throw error;
    }
};