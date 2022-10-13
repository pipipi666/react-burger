import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer, { TIngredientsActions } from './slices/ingredientsSlice';
import authReducer, { TAuthActions } from './slices/authSlice';
import { socketMiddleware } from './socketMiddleware';

export const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware())
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type TAppActions = TIngredientsActions | TAuthActions