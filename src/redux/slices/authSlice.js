import { createSlice } from "@reduxjs/toolkit";

const sortedUser = localStorage.getItem('user');

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: sortedUser ? JSON.parse(sortedUser) : null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
            state.error = null
            localStorage.setItem('user', JSON.stringify(action.payload))

        },
        loginFailure: (state, action) => {
            state.user = null
            state.isAuthenticated = false
            state.error = action.payload
        },
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
            state.loading = false
            state.error = null
        }
    }
})

export const { loginSuccess, loginFailure, logout } = authSlice.actions

export default authSlice.reducer