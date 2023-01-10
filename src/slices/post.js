import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService, { PostService } from '../services/post.service';
import { setMessage } from './message';

export const createPostSlice = createAsyncThunk(
    'room/create',
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

export const deletePost = createAsyncThunk(
    'room/postPagination',
    async (postId, thunkAPI) => {
        try {
            return await postService.delPost(postId);
        } catch {
            return thunkAPI.rejectWithValue();
        }
    }
);

export const searchPostSlice = createAsyncThunk(
    'room/search',
    async (value) => {
        try {
            if (!value) return await postService.getPostPagination({}, 1);
            return await postService.getPostPagination(
                value?.body,
                value?.page
            );
        } catch {}
    }
);

export const detailPostSilce = createAsyncThunk(
    'room/detail',
    async (params, thunkAPI) => {
        try {
            return await postService.getDetailPost(params);
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

export const getAllFavSilce = createAsyncThunk(
    'room_fav/all',
    async (body, thunkAPI) => {
        try {
            return await postService.getAllFavRoom(body);
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

export const deleteFavSilce = createAsyncThunk(
    'room_fav/del',
    async (body, thunkAPI) => {
        try {
            return await postService.deleteFavRoom(body);
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

export const addFavSilce = createAsyncThunk(
    'room_fav/add',
    async (body, thunkAPI) => {
        try {
            return await postService.addFavRoom(body);
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

export const allPersonalPost = createAsyncThunk(
    'room/personal',
    async (value, thunkAPI) => {
        try {
            return await postService.getAllPersonlRoom(
                value?.body,
                value?.page
            );
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

export const reportRoomSlice = createAsyncThunk(
    'room/report',
    async (body, thunkAPI) => {
        try {
            return await postService.postReportRoom(body);
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

const initialState = {
    isLoading: false,
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    extraReducers: {
        [searchPostSlice.pending]: (state) => {
            state.isLoading = true;
        },
        [searchPostSlice.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [searchPostSlice.rejected]: (state) => {
            state.isLoading = false;
        },
        [detailPostSilce.pending]: (state) => {
            state.isLoading = true;
        },
        [detailPostSilce.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [detailPostSilce.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

const { reducer } = postSlice;
export default reducer;
