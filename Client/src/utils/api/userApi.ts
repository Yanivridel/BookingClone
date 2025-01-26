import axios from 'axios';
import { IUser, TPartialUser } from '@/types/userTypes';
import { getCookie } from './../cookies';

const isProduction = import.meta.env.VITE_NODE_ENV === "production";
const API_URL = isProduction ? import.meta.env.VITE_API_URL_CLOUD: import.meta.env.VITE_API_URL_LOCAL;

// * Done
export const getSelf = async () => {
    try {
        const token = getCookie("token");
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
export const signinUser = async (email: string, code: string) => {
    try {
        const { data } = await axios.post(`${API_URL}/api/users/signin`, {
            email,
            code
        }, { withCredentials: true });
        return data.data;
    } 
    catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};
// * Done
export const editProfile = async (userProperties : TPartialUser ) => {
    try {
        const { data } = await axios.patch(`${API_URL}/api/users/edit-profile`, 
            userProperties, 
            {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`
                }
            });
        return data.data;
    } 
    catch (error) {
        console.error('Add recipe error:', error);
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
                    Authorization: `Bearer ${getCookie("token")}`
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
        const token = getCookie("token");
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
        const token = getCookie("token");
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
        const token = getCookie("token");
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
        const token = getCookie("token");
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