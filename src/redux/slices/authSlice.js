import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
            state.error = null
        },
        loginFailure: (state, action) => {
            state.user = null
            state.isAuthenticated = false
            state.error = action.payload
        },
    }
})

export const { loginSuccess, loginFailure } = authSlice.actions

export default authSlice.reducer