import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkAction } from 'redux-thunk';
import ingredientsReducer, { TIngredientsActions } from './slices/ingredientsSlice';
import authReducer, { TAuthActions } from './slices/authSlice';

export const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        auth: authReducer
    },
    middleware: [thunk]
});

export type AppDispatch = typeof store.dispatch
export type RootReducer = typeof ingredientsReducer | typeof authReducer
export type RootState = ReturnType<typeof store.getState>
type TAppActions = TIngredientsActions | TAuthActions
export type AppThunk = ThunkAction<void, RootState, unknown, TAppActions>
export type Dispatch = <TReturnType = void>(action: TAppActions | AppThunk) => TReturnType;
