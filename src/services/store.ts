import { Action, configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkAction } from 'redux-thunk';
import ingredientsReducer, { TIngredientsActions } from './slices/ingredientsSlice';
import authReducer, { TAuthActions } from './slices/authSlice';
import { applyMiddleware, compose } from 'redux';
import { socketMiddleware } from './socketMiddleware';

export const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware())
});

export type AppDispatch = typeof store.dispatch
//export type RootReducer = typeof ingredientsReducer | typeof authReducer
export type RootState = ReturnType<typeof store.getState>
export type TAppActions = TIngredientsActions | TAuthActions
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TAppActions>
export type Dispatch = <TReturnType>(action: TAppActions | AppThunk) => TReturnType;
