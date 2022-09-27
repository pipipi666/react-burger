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

export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    (_, { getState, rejectWithValue }) => fetchForm(
        API_URL_LOGIN,
        getState().auth.formLogin,
        rejectWithValue)
);

export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    (_, { getState, rejectWithValue }) => fetchForm(
        API_URL_REGISTER,
        getState().auth.formRegister,
        rejectWithValue)
);

export const fetchForgotPassword = createAsyncThunk(
    'auth/fetchForgotPassword',
    (_, { getState, rejectWithValue }) => fetchForm(
        API_URL_PASSWORD_FORGOT,
        getState().auth.formForgotPassword,
        rejectWithValue)
);

export const fetchResetPassword = createAsyncThunk(
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

export const updateProfile = createAsyncThunk(
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

const initialState = {
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
    extraReducers: {
        [fetchLogin.pending]: (state) => {
            state.loginRequest = true
            state.loginFailed = false
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.loginRequest = false
            state.loginFailed = false
            state.error = ''
            getToken(action.payload)
        },
        [fetchLogin.rejected]: (state, action) => {
            state.loginRequest = false;
            state.loginFailed = true;
            (action.payload === 'email or password are incorrect')
                ? state.error = 'Неверный логин или пароль'
                : state.error = 'Ошибка выполнения запроса'
        },

        [fetchLogout.pending]: (state) => {
            state.logoutRequest = true
            state.logoutFailed = false
        },
        [fetchLogout.fulfilled]: (state) => {
            state.logoutRequest = false
            state.logoutFailed = false
            state.error = ''
            state.user.nameUser = ''
            state.user.emailUser = ''
            state.formProfile.email = ''
            state.formProfile.name = ''
        },
        [fetchLogout.rejected]: (state) => {
            state.logoutRequest = false
            state.logoutFailed = true
        },

        [fetchRegister.pending]: (state) => {
            state.registerRequest = true
            state.registerFailed = false
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.registerRequest = false
            state.registerFailed = false
            state.error = ''
            getToken(action.payload)
        },
        [fetchRegister.rejected]: (state, action) => {
            state.registerRequest = false;
            state.registerFailed = true;
            (action.payload === 'User already exists')
                ? state.error = 'Пользователь уже существует'
                : state.error = 'Ошибка выполнения запроса'
        },

        [fetchForgotPassword.pending]: (state) => {
            state.forgotPasswordRequest = true
            state.forgotPasswordFailed = false
        },
        [fetchForgotPassword.fulfilled]: (state, action) => {
            state.forgotPasswordRequest = false
            state.forgotPasswordFailed = false
            state.error = ''
        },
        [fetchForgotPassword.rejected]: (state) => {
            state.forgotPasswordRequest = false
            state.forgotPasswordFailed = true
        },

        [fetchResetPassword.pending]: (state) => {
            state.resetPasswordRequest = true
            state.resetPasswordFailed = false
            state.resetPasswordSuccess = false
        },
        [fetchResetPassword.fulfilled]: (state, action) => {
            state.resetPasswordRequest = false
            state.resetPasswordFailed = false
            state.resetPasswordSuccess = true
            state.error = ''
        },
        [fetchResetPassword.rejected]: (state, action) => {
            state.resetPasswordRequest = false
            state.resetPasswordFailed = true
            state.resetPasswordSuccess = false;
            (action.payload === 'Incorrect reset token') ?
                state.error = 'Неверный код' :
                state.error = 'Ошибка выполнения запроса'
        },

        [fetchProfile.pending]: (state) => {
            state.getProfileRequest = true
            state.getProfileFailed = false
        },
        [fetchProfile.fulfilled]: (state, action) => {
            state.getProfileRequest = false
            state.getProfileFailed = false
            state.user.nameUser = action.payload.user.name
            state.user.emailUser = action.payload.user.email
            state.formProfile.email = action.payload.user.email
            state.formProfile.name = action.payload.user.name
            state.error = ''
        },
        [fetchProfile.rejected]: (state, action) => {
            state.getProfileRequest = false
            state.getProfileFailed = true
        },

        [updateProfile.pending]: (state) => {
            state.setProfileRequest = true
            state.setProfileFailed = false
        },
        [updateProfile.fulfilled]: (state, action) => {
            state.setProfileRequest = false
            state.setProfileFailed = false
            state.formProfile = action.payload.user
            state.user = action.payload.user
            state.error = ''
        },
        [updateProfile.rejected]: (state) => {
            state.setProfileRequest = false
            state.setProfileFailed = true
        },
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
