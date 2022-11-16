import { ILogin, IForm, IOptions, TError } from "./types";
import { API_URL_TOKEN, API_URL_LOGOUT } from "./constsAPI";

export const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err: Error) => Promise.reject(err));
};

export const requestWithCheck = (url: string, options?: IOptions) =>
  fetch(url, options).then(checkResponse);

export const getToken = (res: ILogin) => {
  if (res.accessToken && res.refreshToken) {
    const token = res.accessToken.split("Bearer ")[1];
    if (token) {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", res.refreshToken);
    }
  }
};

export const fetchForm = (URL: string, form: IForm) =>
  requestWithCheck(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...form }),
  });

const fetchRefresh = () =>
  requestWithCheck(API_URL_TOKEN, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: getRefreshToken() }),
  });

export const logout = () => {
  try {
    const token = getRefreshToken();
    localStorage.clear();
    return requestWithCheck(API_URL_LOGOUT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    });
  } catch (err: unknown) {
    throw Error;
  }
};

export const fetchWithRefresh = async (URL: string, options: IOptions) => {
  try {
    const res = await fetch(URL, options);
    return await checkResponse(res);
  } catch (err: unknown) {
    const customError = err as TError;
    if (customError.message === "jwt expired") {
      const refresh = await fetchRefresh();
      getToken(refresh);
      options.headers.Authorization = "Bearer " + getAccessToken();
      const res = await fetch(URL, options);
      return await checkResponse(res);
    } else throw Error;
  }
};

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");
export const isAuth = () => !!getAccessToken();
