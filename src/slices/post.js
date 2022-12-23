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
