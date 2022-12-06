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

const userService = {
    getPublicContent,
    getUserBoard,
    getAdminBoard,
};

export default userService