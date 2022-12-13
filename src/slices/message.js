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
        clearMessage: (state, action) => {
            return {
                message: "",
                isShow: false,
                severity:state.severity
            };
        },
        hiddenMessage: (state, action) => {
            state.isShow = false;
        },
        setSeverity: (state, action) => {
            state.severity = action.payload;
        }
    },
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage, hiddenMessage, setSeverity } = actions
export default reducer;