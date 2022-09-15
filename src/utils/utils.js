export const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const isAuth = () => !!localStorage.getItem('accessToken');

export const getStorageToken = () => localStorage.getItem('accessToken');
