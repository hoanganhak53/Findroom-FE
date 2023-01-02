import { axiosInstance } from './auth-header';

const API_URL = process.env.REACT_APP_API;

const getAdminBoard = () => {
    return axiosInstance.get(API_URL + 'admin');
};

const postUserProfile = (body) => {
    return axiosInstance.post(API_URL + 'user/update', body);
};

const postPassword = (body) => {
    return axiosInstance.post(API_URL + 'user/change-password', body);
};

const getUserByEmail = (body) => {
    return axiosInstance.post(API_URL + 'user/get-by-email', body);
};

const userService = {
    getAdminBoard,
    postUserProfile,
    postPassword,
    getUserByEmail,
};

export default userService;
