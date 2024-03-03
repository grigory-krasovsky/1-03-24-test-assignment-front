import { configureStore } from '@reduxjs/toolkit';
import reducer from './slices/authSlice';
import api from "../api/base-api";
import root from "../redux/slices/authSlice"

export const store = configureStore({
    reducer: {
        [api.reducerPath] : api.reducer,
        data: root
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});