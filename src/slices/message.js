import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: '',
    isShow: false,
    severity: "error"
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            return {
                message: action.payload,
                isShow: true,
                severity: state.severity
            };
        },
        clearMessage: () => {
            return {
                message: "",
                isShow: false,
                severity: "error"
            };
        },
        hiddenMessage: (state, action) => {
            state.isShow = false;
        },
        setSeverity: (state, action) => {
            state.severity = action.payload;
        },
        showMessage: (state, action) => {
            state.isShow = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        }
    },
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage, hiddenMessage, setSeverity, showMessage } = actions
export default reducer;