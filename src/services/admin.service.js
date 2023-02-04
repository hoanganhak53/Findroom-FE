import { axiosInstance } from './auth-header';

const API_URL = process.env.REACT_APP_API;

const getUsersAdmin = (page, limit, offset) => {
    return axiosInstance.post(API_URL + 'admin/user/pageable', {
        params: {
            page,
            page_size: limit,
            offset
        }
    });
};

const UnlockUser = (userId) => {
    return axiosInstance.post(API_URL + 'admin/user/unban/' +  userId);
};

const LockUser = (userId) => {
    return axiosInstance.post(API_URL + 'admin/user/ban/' +  userId);
};

const DeleteUser = (userId) => {
    return axiosInstance.delete(API_URL + 'admin/user/delete/' +  userId);
};

const getReportRoom = (page, limit, offset) => {
    return axiosInstance.post(API_URL + 'admin/room/report', {
        params: {
            page,
            page_size: limit,
            offset
        }
    });
};

const getPendingRoom = (page, limit, offset) => {
    return axiosInstance.post(API_URL + 'admin/room/pending-room', {
        params: {
            page,
            page_size: limit,
            offset
        }
    });
};

const SensorRoom = (id) => {
    return axiosInstance.post(API_URL + 'admin/room/sensor/' + id);
};

const adminService = {
    getUsersAdmin,
    UnlockUser,
    LockUser,
    DeleteUser,
    getReportRoom,
    getPendingRoom,
    SensorRoom
};

export default adminService;
