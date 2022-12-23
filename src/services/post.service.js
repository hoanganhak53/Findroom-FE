import { axiosInstance } from './auth-header';

const API_URL = process.env.REACT_APP_API;

export class PostService {
    static createPost(params) {
        return axiosInstance.post(API_URL + 'room/create', params);
    }
}

const getPostPagination = (body) => {
    return axiosInstance.post(API_URL + 'room/search', body);
};

const getDetailPost = (params) => {
    return axiosInstance.post(API_URL + `room/detail?room_id=${params}`);
};

const postService = {
    getPostPagination,
    getDetailPost,
};

export default postService;
