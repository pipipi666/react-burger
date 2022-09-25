import { API_URL_TOKEN } from "./constsAPI";

export const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const setForm = (state, action, form) => {
    state[form][action.payload[0]] = action.payload[1];
}

export const getToken = (res) => {
    if (res.accessToken && res.refreshToken) {
        const token = res.accessToken.split('Bearer ')[1];
        if (token) {
            localStorage.setItem('accessToken', token);
            localStorage.setItem('refreshToken', res.refreshToken);
        }
    }
};

export const fetchForm = (URL, form, rejectWithValue) =>
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

export const fetchWithRefresh = async (URL, options, dispatch, rejectWithValue) => {
    try {
        const res = await fetch(URL, options);
        return await checkReponse(res);
    } catch (err) {
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
