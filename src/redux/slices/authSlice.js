import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('jwt') || null,
        loading: false,
        error: null,
    },
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.token = action.payload;
            localStorage.setItem('jwt', action.payload); // Store token in localStorage
        },
        loginFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const authProcess = (dispatch, result, navigate) => {
    if (result.status==='pending') {
        dispatch(loginStart());
    } else if (result.status==='fulfilled') {
        dispatch(loginSuccess(result.data.jwt));
        navigate("/");
    } else {
        dispatch(loginFailure(result.error));
    }
}

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;