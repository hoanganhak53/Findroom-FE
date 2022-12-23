import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';

import AuthService from '../services/auth.service';
import userService from '../services/user.service';

const user = JSON.parse(localStorage.getItem('user'));

export const register = createAsyncThunk(
    'auth/register',
    async ({ username, email, password }, thunkAPI) => {
        try {
            const response = await AuthService.register(
                username,
                email,
                password
            );
            return response.data;
        } catch {
            thunkAPI.dispatch(
                setMessage('Tên đăng nhập hoặc email đã tồn tại')
            );
            return thunkAPI.rejectWithValue();
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }, thunkAPI) => {
        try {
            const token = await AuthService.login(username, password);
            const user = await AuthService.getUser();
            return { token, user };
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

export const fetchUser = createAsyncThunk('user/featch', async (thunkAPI) => {
    try {
        return await AuthService.getUser();
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
});

export const changePassword = createAsyncThunk(
    'user/change-password',
    async (body, thunkAPI) => {
        try {
            return await userService.postPassword(body);
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

export const editUserProfile = createAsyncThunk(
    'user/edit',
    async (body, thunkAPI) => {
        try {
            await userService.postUserProfile(body);
            await thunkAPI.dispatch(fetchUser());
            return;
        } catch {
            return thunkAPI.rejectWithValue();
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    await AuthService.logout();
});

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
        },
        [register.rejected]: (state, action) => {
            state.isLoggedIn = false;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.user = action.payload.result;
        },
    },
});

const { reducer } = authSlice;
export default reducer;
