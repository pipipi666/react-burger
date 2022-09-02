import {
    API_URL_LOGIN,
    API_URL_REGISTER,
    API_URL_LOGOUT,
    API_URL_TOKEN,
    API_URL_USER,
    API_URL_PASSWORD_FORGOT,
    API_URL_PASSWORD_RESET,
} from "utils/constsAPI";
import { checkReponse, getStorageToken } from "utils/utils";

export const LOGIN_FORM_SET_VALUE = 'LOGIN_FORM_SET_VALUE';
export const LOGIN_FORM_SUBMIT = 'LOGIN_FORM_SUBMIT';
export const LOGIN_FORM_SUBMIT_SUCCESS = 'LOGIN_FORM_SUBMIT_SUCCESS';
export const LOGIN_FORM_SUBMIT_FAILED = 'LOGIN_FORM_SUBMIT_FAILED';

export const REGISTER_FORM_SET_VALUE = 'REGISTER_FORM_SET_VALUE';
export const REGISTER_FORM_SUBMIT = 'REGISTER_FORM_SUBMIT';
export const REGISTER_FORM_SUBMIT_SUCCESS = 'REGISTER_FORM_SUBMIT_SUCCESS';
export const REGISTER_FORM_SUBMIT_FAILED = 'REGISTER_FORM_SUBMIT_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAILED = 'TOKEN_FAILED';

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILED = 'GET_PROFILE_FAILED';

export const PROFILE_FORM_SET_VALUE = 'PROFILE_FORM_SET_VALUE';
export const PROFILE_FORM_SUBMIT = 'PROFILE_FORM_SUBMIT';
export const PROFILE_FORM_SUBMIT_SUCCESS = 'PROFILE_FORM_SUBMIT_SUCCESS';
export const PROFILE_FORM_SUBMIT_FAILED = 'PROFILE_FORM_SUBMIT_FAILED';

export const RESET_PASSWORD_FORM_SET_VALUE = 'RESET_PASSWORD_FORM_SET_VALUE';
export const RESET_PASSWORD_FORM_SUBMIT = 'RESET_PASSWORD_FORM_SUBMIT';
export const RESET_PASSWORD_FORM_SUBMIT_SUCCESS = 'RESET_PASSWORD_FORM_SUBMIT_SUCCESS';
export const RESET_PASSWORD_FORM_SUBMIT_FAILED = 'RESET_PASSWORD_FORM_SUBMIT_FAILED';

export const SET_PASSWORD_FORM_SET_VALUE = 'SET_PASSWORD_FORM_SET_VALUE';
export const SET_PASSWORD_FORM_SUBMIT = 'SET_PASSWORD_FORM_SUBMIT';
export const SET_PASSWORD_FORM_SUBMIT_SUCCESS = 'SET_PASSWORD_FORM_SUBMIT_SUCCESS';
export const SET_PASSWORD_FORM_SUBMIT_FAILED = 'SET_PASSWORD_FORM_SUBMIT_FAILED';

const getToken = (res) => {
    if (res.accessToken && res.refreshToken) {
        const token = res.accessToken.split('Bearer ')[1];
        const now = Date.now();
        const end = now + 1.2e6;
        if (token) {
            localStorage.setItem('accessToken', token);
            localStorage.setItem('refreshToken', res.refreshToken);
            localStorage.setItem('exp', end);
        }
    }
};

export const setLoginFormValue = (field, value) => ({
    type: LOGIN_FORM_SET_VALUE,
    field,
    value
});

export const login = () => (dispatch, getState) => {
    dispatch({
        type: LOGIN_FORM_SUBMIT
    });
    fetch(API_URL_LOGIN, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ ...getState().user.form })
    }).then(checkReponse)
        .then(res => {
            getToken(res);
            dispatch({
                type: LOGIN_FORM_SUBMIT_SUCCESS,
            });
        }).catch((err) => {
            let errText = "Ой, произошла ошибка!";
            switch (err.message) {
                case 'email or password are incorrect': {
                    errText = 'Неверные логин или пароль';
                    break;
                }
                default: {
                    return
                }
            }
            dispatch({
                type: LOGIN_FORM_SUBMIT_FAILED,
                error: errText
            });
        })
};

export const setRegFormValue = (field, value) => ({
    type: REGISTER_FORM_SET_VALUE,
    field,
    value
});

export const register = () => (dispatch, getState) => {
    dispatch({
        type: REGISTER_FORM_SUBMIT
    });
    fetch(API_URL_REGISTER, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ ...getState().register.form })
    }).then(checkReponse)
        .then(res => {
            getToken(res);
            dispatch({
                type: REGISTER_FORM_SUBMIT_SUCCESS,
            });
        }).catch(err => {
            let errText = "Ой, произошла ошибка!";
            switch (err.message) {
                case 'Email, password and name are required fields': {
                    errText = 'Заполните все поля';
                    break;
                }
                case 'User already exists': {
                    errText = 'Пользователь уже существует';
                    break;
                }
                default: {
                    return
                }
            }
            dispatch({
                type: REGISTER_FORM_SUBMIT_FAILED,
                error: errText
            });
        })
};

export function logout() {
    return function (dispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        });
        const refreshToken = localStorage.getItem('refreshToken');
        localStorage.clear();
        fetch(API_URL_LOGOUT, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ token: refreshToken }),
        }).then(() => {
            checkReponse();
        })
            .then(res => {
                dispatch({
                    type: LOGOUT_SUCCESS,
                })
            }).catch(err => {
                dispatch({
                    type: LOGOUT_FAILED
                })
            })
    }
};

export const setResetPasswordFormValue = (field, value) => ({
    type: RESET_PASSWORD_FORM_SET_VALUE,
    field,
    value
});

export const resetPassword = () => (dispatch, getState) => {
    dispatch({
        type: RESET_PASSWORD_FORM_SUBMIT
    });
    fetch(API_URL_PASSWORD_FORGOT, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ ...getState().resetPassword.form })
    }).then(checkReponse)
        .then(res => {
            dispatch({
                type: RESET_PASSWORD_FORM_SUBMIT_SUCCESS,
            });
        }).catch(err => {
            dispatch({
                type: RESET_PASSWORD_FORM_SUBMIT_FAILED,
            });
        })
};

export const setSetPasswordFormValue = (field, value) => ({
    type: SET_PASSWORD_FORM_SET_VALUE,
    field,
    value
});

export const setPassword = () => (dispatch, getState) => {
    dispatch({
        type: SET_PASSWORD_FORM_SUBMIT
    });
    fetch(API_URL_PASSWORD_RESET, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ ...getState().setPassword.form })
    }).then(checkReponse)
        .then(res => {
            dispatch({
                type: SET_PASSWORD_FORM_SUBMIT_SUCCESS,
            });
        }).catch(err => {
            dispatch({
                type: SET_PASSWORD_FORM_SUBMIT_FAILED,
            });
        })
};

export const setProfileFormValue = (field, value) => ({
    type: PROFILE_FORM_SET_VALUE,
    field,
    value
});

export function getProfile() {
    return function (dispatch) {
        const token = getStorageToken();
        const now = Date.now();
        const exp = localStorage.getItem('exp');
        if (now > exp) {
            dispatch(updateToken())
        }
        dispatch({
            type: GET_PROFILE_REQUEST
        })
        fetch(API_URL_USER, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })
            .then(checkReponse)
            .then(res => {
                dispatch({
                    type: GET_PROFILE_SUCCESS,
                    form: res.user
                })
            }).catch(err => {
                localStorage.clear();
                dispatch({
                    type: GET_PROFILE_FAILED
                })
            })
    }
};

export const updateProfile = () => (dispatch, getState) => {
    const token = getStorageToken();
    dispatch({
        type: PROFILE_FORM_SUBMIT
    });
    fetch(API_URL_USER, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ ...getState().profile.form })
    }).then(checkReponse)
        .then(res => {
            dispatch({
                type: PROFILE_FORM_SUBMIT_SUCCESS,
            });
        }).then(res => {
            dispatch(getProfile());
        }).catch(err => {
            dispatch({
                type: PROFILE_FORM_SUBMIT_FAILED,
            });
        })
};

export function updateToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    return function (dispatch) {
        dispatch({
            type: TOKEN_REQUEST
        })
        fetch(API_URL_TOKEN, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ token: refreshToken }),
        }).then(checkReponse)
            .then(res => {
                getToken(res);
                dispatch({
                    type: TOKEN_SUCCESS,
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken
                })
            }).catch(err => {
                logout();
                dispatch({
                    type: TOKEN_FAILED
                });
            })
    }
};
