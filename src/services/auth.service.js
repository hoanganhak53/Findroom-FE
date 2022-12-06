import { ROLES } from "../constants/roles"
import { axiosInstance } from "./auth-header";

const API_URL = process.env.REACT_APP_API;

const register = (username, email, password) => {
    return axiosInstance.post(API_URL + "sign-up", {
        username,
        email,
        password,
        roles: [ROLES.user]
    });
};

const login = (username, password) => {
    return axiosInstance
        .post(API_URL + "authenticate", {
            username,
            password,
        })
        .then((response) => {
            console.log(response);
            if (response.data.result) {
                localStorage.setItem("token", JSON.stringify(response.data.result.token));
            }
            return response.data;
        });
};

const getUser = () => {
    return axiosInstance
        .get(API_URL + "user/me")
        .then((response) => {
            console.log(response);
            if (response.data.result) {
                localStorage.setItem("user", JSON.stringify(response.data.result));
            }
            return response.data;
        });
};


const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};

const authService = {
    register,
    login,
    getUser,
    logout,
};

export default authService;
