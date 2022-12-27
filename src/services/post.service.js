import { axiosInstance } from './auth-header';

const API_URL = process.env.REACT_APP_API;

export class PostService {
    static createPost(params) {
        return axiosInstance.post(API_URL + 'room/create', params);
    }
}

const delPost = (postId) => {
    return axiosInstance.delete(API_URL + `room/delete/${postId}`);
};

const getPostPagination = (body, page) => {
    return axiosInstance.post(
        API_URL +
            `room/search?page=${page}&page_size=10&sort=created_date,desc`,
        body
    );
};

const getDetailPost = (params) => {
    return axiosInstance.post(API_URL + `room/detail?room_id=${params}`);
};

const postReportRoom = (body) => {
    return axiosInstance.post(API_URL + `report-room/add`, body);
};

const getAllFavRoom = (body) => {
    return axiosInstance.post(API_URL + `favorite-room/all`, body);
};

const deleteFavRoom = (body) => {
    return axiosInstance.post(API_URL + `favorite-room/delete`, body);
};

const addFavRoom = (body) => {
    return axiosInstance.post(API_URL + `favorite-room/add`, body);
};

const getAllPersonlRoom = (body) => {
    return axiosInstance.post(API_URL + `room/personal-room`, body);
};

const postService = {
    getPostPagination,
    getDetailPost,
    postReportRoom,
    getAllFavRoom,
    deleteFavRoom,
    addFavRoom,
    getAllPersonlRoom,
    delPost,
};

export default postService;
