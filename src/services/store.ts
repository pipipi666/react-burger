import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import ingredientsReducer from './slices/ingredientsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        auth: authReducer
    },
    middleware: [thunk]
});
