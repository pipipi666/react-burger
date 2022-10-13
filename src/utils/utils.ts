import { ILogin, IForm, IOptions } from './types';
import { API_URL_TOKEN } from "./constsAPI";

type TForm = {
    payload: string[];
}

export const checkReponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err: Error) => Promise.reject(err));
};

export const setForm = (state: any, action: TForm, form: string) => {
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

export const fetchForm = (URL: string, form: IForm) =>
    fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form })
    })
        .then(res => checkReponse(res))

const fetchRefresh = () =>
    fetch(API_URL_TOKEN, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: getRefreshToken() })
    })
        .then(res => checkReponse(res))

export const fetchWithRefresh = async (URL: string, options: IOptions) => {
    try {
        const res = await fetch(URL, options);
        return await checkReponse(res);
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === "jwt expired") {
                const refresh = await fetchRefresh();
                getToken(refresh);
                options.headers.Authorization = 'Bearer ' + getAccessToken();
                const res = await fetch(URL, options);
                return await checkReponse(res);
            }
        }
    }
}

export const getAccessToken = () => localStorage.getItem('accessToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');
export const isAuth = () => !!getAccessToken();
