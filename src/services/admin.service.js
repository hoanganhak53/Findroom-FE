import { generateAddressPositionAPI } from '../utilities/utils';
import { axiosInstance } from './auth-header';

const API_URL = process.env.REACT_APP_API;

const getUsersAdmin = (page, limit, keyword) => {
    return axiosInstance.post(API_URL + 'admin/user/pageable',{}, {
        params: {
            page: page + 1,
            page_size: limit,
            keyword
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
    return axiosInstance.post(API_URL + 'admin/room/censor/' + id);
};

const getReportAdmin = (page, limit, offset) => {
    return axiosInstance.post(API_URL + 'admin/report-room/pageable', {
        params: {
            page,
            page_size: limit,
            offset
        }
    });
};

const getAllRoomAdmin = async (page, limit, keyword) => {
    let body = {}
    if(keyword){
        const rs = await generateAddressPositionAPI(keyword)
        body.search = {
            location: {
                lat: rs.latitude,
                lng: rs.longitude,
                max_distance: 3000,
            },
        }
    }
    return axiosInstance.post(API_URL +
        `room/search?sort=created_date,desc`, body, {
        params: {
            page: page + 1,
            page_size: limit,
            keyword
        }
    });
};

const getOrderAdmin = (page, limit, offset) => {
    return axiosInstance.post(API_URL + 'admin/order/', {
        params: {
            page,
            page_size: limit,
            offset
        }
    });
};

const adminService = {
    getUsersAdmin,
    UnlockUser,
    LockUser,
    DeleteUser,
    getReportRoom,
    getPendingRoom,
    SensorRoom,
    getReportAdmin,
    getAllRoomAdmin,
    getOrderAdmin
};

export default adminService;
