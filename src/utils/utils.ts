import { ILogin, IForm, IOptions } from './types';
import { API_URL_TOKEN } from "./constsAPI";
import { TAuthState } from 'services/slices/authSlice';

export const checkReponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err: Error) => Promise.reject(err));
};

export const setForm = (state: any, action: any, form: string) => {
    state[form][action.payload[0]] = action.payload[1];
};

export const getToken = (res: ILogin) => {
    if (res.accessToken && res.refreshToken) {
        const token = res.accessToken.split('Bearer ')[1];
        if (token) {
            localStorage.setItem('accessToken', token);
            localStorage.setItem('refreshToken', res.refreshToken);
        }
    }
};

export const fetchForm = (URL: string, form: IForm, rejectWithValue: any) =>
    fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form })
    })
        .then(res => checkReponse(res))
        .catch(err => rejectWithValue(err.message))

const fetchRefresh = () =>
    fetch(API_URL_TOKEN, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: getRefreshToken() })
    })
        .then(res => checkReponse(res))

export const fetchWithRefresh = async (URL: string, options: IOptions, rejectWithValue: any) => {
    try {
        const res = await fetch(URL, options);
        return await checkReponse(res);
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refresh = await fetchRefresh();
            getToken(refresh);
            options.headers.Authorization = 'Bearer ' + getAccessToken();
            const res = await fetch(URL, options);
            return await checkReponse(res);
        }
        else rejectWithValue(err.message)
    }
}

export const getAccessToken = () => localStorage.getItem('accessToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');
export const isAuth = () => !!getAccessToken();
