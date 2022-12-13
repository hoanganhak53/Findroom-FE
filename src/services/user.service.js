import { axiosInstance } from "./auth-header";

const API_URL = process.env.REACT_APP_API;

const getPublicContent = () => {
    return axiosInstance.get(API_URL + "all");
};

const getUserBoard = () => {
    return axiosInstance.get(API_URL + "user");
};

const getAdminBoard = () => {
    return axiosInstance.get(API_URL + "admin");
};

const postUserProfile = (body) => {
    return axiosInstance.post(API_URL + "user/update", body);
};

const postPassword = (body) => {
    return axiosInstance.post(API_URL + "user/change-password", body);
};

const userService = {
    getPublicContent,
    getUserBoard,
    getAdminBoard,
    postUserProfile,
    postPassword
};

export default userService