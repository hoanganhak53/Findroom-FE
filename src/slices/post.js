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

export const postPaginationSilce = createAsyncThunk(
    'room/postPagination',
    async (thunkAPI) => {
        try {
            return await postService.getPostPagination({
                pageable: {
                    page: 1,
                    page_size: 10,
                    offset: 0,
                    total: 0,
                    sort: [
                        {
                            property: 'string',
                            direction: 'string',
                        },
                    ],
                    load_more_able: true,
                },
            });
        } catch {
            return thunkAPI.rejectWithValue();
        }
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
    async (body, thunkAPI) => {
        try {
            return await postService.getAllPersonlRoom(body);
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
        [postPaginationSilce.pending]: (state) => {
            state.isLoading = true;
        },
        [postPaginationSilce.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [postPaginationSilce.rejected]: (state) => {
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
