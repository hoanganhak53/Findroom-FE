import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import messageReducer from './slices/message';
import postReducer from './slices/post';

const reducer = {
    auth: authReducer,
    message: messageReducer,
    post: postReducer,
};

const store = configureStore({
    reducer: reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
