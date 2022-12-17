import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PostService } from "../services/post.service";
import { setMessage } from "./message";

const user = JSON.parse(localStorage.getItem("user"));

export const createPostSlice = createAsyncThunk(
    "room/create",
    async (body, thunkAPI) => {
        try {
            return await PostService.createPost(body);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

const postSlice = createSlice({
    name: "post",
    initialState,
    extraReducers: {
    },
});

const { reducer } = postSlice;
export default reducer;
