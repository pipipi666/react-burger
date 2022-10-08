import { IProfile } from './../../utils/types';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkReponse, getAccessToken, getRefreshToken, getToken, fetchForm, setForm, fetchWithRefresh } from "utils/utils";
import {
    API_URL_LOGIN,
    API_URL_LOGOUT,
    API_URL_PASSWORD_FORGOT,
    API_URL_PASSWORD_RESET,
    API_URL_REGISTER,
    API_URL_USER
} from "utils/constsAPI";
import { RootState } from "services/store";
import { ILogin } from "utils/types";

export type TAuthActions = ReturnType<typeof fetchLogin> |
    ReturnType<typeof fetchRegister> |
    ReturnType<typeof fetchForgotPassword> |
    ReturnType<typeof fetchResetPassword> |
    ReturnType<typeof fetchLogout> |
    ReturnType<typeof fetchProfile> |
    ReturnType<typeof updateProfile> |
    ReturnType<typeof loginFormSet> |
    ReturnType<typeof registerFormSet> |
    ReturnType<typeof forgotPasswordFormSet> |
    ReturnType<typeof resetPasswordFormSet> |
    ReturnType<typeof profileFormSet>

export const fetchLogin = createAsyncThunk<ILogin, undefined, {state: RootState}>(
    'auth/fetchLogin',
    (_, { getState, rejectWithValue }) => fetchForm(
        API_URL_LOGIN,
        getState().auth.formLogin,
        rejectWithValue)
);

export const fetchRegister = createAsyncThunk<ILogin, undefined, {state: RootState}>(
    'auth/fetchRegister',
    (_, { getState, rejectWithValue }) => fetchForm(
        API_URL_REGISTER,
        getState().auth.formRegister,
        rejectWithValue)
);

export const fetchForgotPassword = createAsyncThunk<ILogin, undefined, {state: RootState}>(
    'auth/fetchForgotPassword',
    (_, { getState, rejectWithValue }) => fetchForm(
        API_URL_PASSWORD_FORGOT,
        getState().auth.formForgotPassword,
        rejectWithValue)
);

export const fetchResetPassword = createAsyncThunk<ILogin, undefined, {state: RootState}>(
    'auth/fetchResetPassword',
    (_, { getState, rejectWithValue }) => fetchForm(
        API_URL_PASSWORD_RESET,
        getState().auth.formResetPassword,
        rejectWithValue)
);

export const fetchLogout = createAsyncThunk(
    'auth/fetchLogout',
    () => {
        const token = getRefreshToken();
        localStorage.clear();
        return fetch(API_URL_LOGOUT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token })
        })
            .then(res => checkReponse(res))
    }
);

export const fetchProfile = createAsyncThunk(
    'auth/fetchProfile',
    (_, { rejectWithValue }) => fetchWithRefresh(
        API_URL_USER,
        {
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getAccessToken()
            }
        },
        rejectWithValue)
);

export const updateProfile = createAsyncThunk<ILogin, undefined, {state: RootState}>(
    'auth/updateProfile',
    (_, { getState, rejectWithValue }) => fetchWithRefresh(
        API_URL_USER,
        {
            method: 'PATCH',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getAccessToken()
            },
            body: JSON.stringify({ ...getState().auth.formProfile })
        }, rejectWithValue)
);

type TAuthState = {
    formLogin: {
        email: string,
        password: string
    },
    formRegister: {
        name: string,
        email: string,
        password: string
    },
    formForgotPassword: {
        email: string,
    },
    formResetPassword: {
        password: string,
        token: string
    },
    user: {
        nameUser: string,
        emailUser: string,
    },
    formProfile: {
        name: string,
        email: string,
    },
    loginRequest: boolean,
    loginFailed: boolean,
    registerRequest: boolean,
    registerFailed: boolean,
    forgotPasswordRequest: boolean,
    forgotPasswordFailed: boolean,
    resetPasswordRequest: boolean,
    resetPasswordFailed: boolean,
    resetPasswordSuccess: boolean,
    getProfileRequest: boolean,
    getProfileFailed: boolean,
    setProfileRequest: boolean,
    setProfileFailed: boolean,
    tokenRequest: boolean,
    tokenFailed: boolean,
    logoutRequest: boolean,
    logoutFailed: boolean,
    logoutSuccess: boolean,
    error: string
};


const initialState: TAuthState = {
    formLogin: {
        email: '',
        password: ''
    },
    formRegister: {
        name: '',
        email: '',
        password: ''
    },
    formForgotPassword: {
        email: '',
    },
    formResetPassword: {
        password: '',
        token: ''
    },
    user: {
        nameUser: '',
        emailUser: '',
    },
    formProfile: {
        name: '',
        email: '',
    },
    loginRequest: false,
    loginFailed: false,
    registerRequest: false,
    registerFailed: false,
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false,
    resetPasswordSuccess: false,
    getProfileRequest: false,
    getProfileFailed: false,
    setProfileRequest: false,
    setProfileFailed: false,
    tokenRequest: false,
    tokenFailed: false,
    logoutRequest: false,
    logoutFailed: false,
    logoutSuccess: false,
    error: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginFormSet: (state, action) => {
            setForm(state, action, 'formLogin');
        },
        registerFormSet: (state, action) => {
            setForm(state, action, 'formRegister');
        },
        forgotPasswordFormSet: (state, action) => {
            setForm(state, action, 'formForgotPassword');
        },
        resetPasswordFormSet: (state, action) => {
            setForm(state, action, 'formResetPassword');
        },
        profileFormSet: (state, action) => {
            setForm(state, action, 'formProfile');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.loginRequest = true
                state.loginFailed = false
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.loginRequest = false
                state.loginFailed = false
                state.error = ''
                getToken(action.payload)
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.loginRequest = false;
                state.loginFailed = true;
                (action.payload === 'email or password are incorrect')
                    ? state.error = 'Неверный логин или пароль'
                    : state.error = 'Ошибка выполнения запроса'
            })
            .addCase(fetchLogout.pending, (state) => {
                state.logoutRequest = true
                state.logoutFailed = false
            })
            .addCase(fetchLogout.fulfilled, (state) => {
                state.logoutRequest = false
                state.logoutFailed = false
                state.error = ''
                state.user.nameUser = ''
                state.user.emailUser = ''
                state.formProfile.email = ''
                state.formProfile.name = ''
            })
            .addCase(fetchLogout.rejected, (state) => {
                state.logoutRequest = false
                state.logoutFailed = true
            })
            .addCase(fetchRegister.pending, (state) => {
                state.registerRequest = true
                state.registerFailed = false
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.registerRequest = false
                state.registerFailed = false
                state.error = ''
                getToken(action.payload)
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.registerRequest = false;
                state.registerFailed = true;
                (action.payload === 'User already exists')
                    ? state.error = 'Пользователь уже существует'
                    : state.error = 'Ошибка выполнения запроса'
            })
            .addCase(fetchForgotPassword.pending, (state) => {
                state.forgotPasswordRequest = true
                state.forgotPasswordFailed = false
            })
            .addCase(fetchForgotPassword.fulfilled, (state) => {
                state.forgotPasswordRequest = false
                state.forgotPasswordFailed = false
                state.error = ''
            })
            .addCase(fetchForgotPassword.rejected, (state) => {
                state.forgotPasswordRequest = false
                state.forgotPasswordFailed = true
            })
            .addCase(fetchResetPassword.pending, (state) => {
                state.resetPasswordRequest = true
                state.resetPasswordFailed = false
                state.resetPasswordSuccess = false
            })
            .addCase(fetchResetPassword.fulfilled, (state) => {
                state.resetPasswordRequest = false
                state.resetPasswordFailed = false
                state.resetPasswordSuccess = true
                state.error = ''
            })
            .addCase(fetchResetPassword.rejected, (state, action) => {
                state.resetPasswordRequest = false
                state.resetPasswordFailed = true
                state.resetPasswordSuccess = false;
                (action.payload === 'Incorrect reset token') ?
                    state.error = 'Неверный код' :
                    state.error = 'Ошибка выполнения запроса'
            })
            .addCase(fetchProfile.pending, (state) => {
                state.getProfileRequest = true
                state.getProfileFailed = false
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.getProfileRequest = false
                state.getProfileFailed = false
                state.user.nameUser = action.payload.user.name
                state.user.emailUser = action.payload.user.email
                state.formProfile.email = action.payload.user.email
                state.formProfile.name = action.payload.user.name
                state.error = ''
            })
            .addCase(fetchProfile.rejected, (state) => {
                state.getProfileRequest = false
                state.getProfileFailed = true
            })
            .addCase(updateProfile.pending, (state) => {
                state.setProfileRequest = true
                state.setProfileFailed = false
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.setProfileRequest = false
                state.setProfileFailed = false
                state.formProfile = action.payload.user
                state.user.nameUser = action.payload.user.name
                state.user.emailUser = action.payload.user.email
                state.error = ''
            })
            .addCase(updateProfile.rejected, (state) => {
                state.setProfileRequest = false
                state.setProfileFailed = true
            })
    }
})

export const {
    loginFormSet,
    registerFormSet,
    forgotPasswordFormSet,
    resetPasswordFormSet,
    profileFormSet
} = authSlice.actions;

export default authSlice.reducer;
