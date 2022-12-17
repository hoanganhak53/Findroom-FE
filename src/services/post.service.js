import { axiosInstance } from "./auth-header";

const API_URL = process.env.REACT_APP_API;

export class PostService{
    static createPost(params){
        return axiosInstance.post(API_URL + "room/create", params);
    }
}