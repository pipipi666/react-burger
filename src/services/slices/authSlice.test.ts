import {
  fetchForgotPassword,
  fetchProfile,
  fetchResetPassword,
  initialState,
  updateProfile,
} from "./authSlice";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { getAccessToken, getRefreshToken } from "utils/utils";
import authReducer, {
  fetchLogin,
  fetchLogout,
  fetchRegister,
  forgotPasswordFormSet,
  loginFormSet,
  profileFormSet,
  registerFormSet,
  resetPasswordFormSet,
} from "./authSlice";

const formMock = { name: "email", value: "value" };
const tokenMock = { accessToken: "Bearer access", refreshToken: "refresh" };

describe("Redux auth store", () => {
  test("Should return the initial state", () => {
    expect(authReducer(undefined, {} as any)).toEqual(initialState);
  });

  test("Should check loginFormSet action", () => {
    const expectedAction = {
      type: loginFormSet.type,
      payload: formMock,
    };
    const expectedState = {
      ...initialState,
      formLogin: {
        ...initialState.formLogin,
        email: "value",
      },
    };

    const action = loginFormSet(formMock);

    expect(action).toEqual(expectedAction);
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check registerFormSet action", () => {
    const expectedAction = {
      type: registerFormSet.type,
      payload: formMock,
    };
    const expectedState = {
      ...initialState,
      formRegister: {
        ...initialState.formRegister,
        email: "value",
      },
    };

    const action = registerFormSet(formMock);

    expect(action).toEqual(expectedAction);
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check forgotPasswordFormSet action", () => {
    const expectedAction = {
      type: forgotPasswordFormSet.type,
      payload: formMock,
    };
    const expectedState = {
      ...initialState,
      formForgotPassword: {
        ...initialState.formForgotPassword,
        email: "value",
      },
    };

    const action = forgotPasswordFormSet(formMock);

    expect(action).toEqual(expectedAction);
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check resetPasswordFormSet action", () => {
    const expectedAction = {
      type: resetPasswordFormSet.type,
      payload: formMock,
    };
    const expectedState = {
      ...initialState,
      formResetPassword: {
        ...initialState.formResetPassword,
        email: "value",
      },
    };

    const action = resetPasswordFormSet(formMock);

    expect(action).toEqual(expectedAction);
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check profileFormSet action", () => {
    const expectedAction = {
      type: profileFormSet.type,
      payload: formMock,
    };
    const expectedState = {
      ...initialState,
      formProfile: {
        ...initialState.formProfile,
        email: "value",
      },
    };

    const action = profileFormSet(formMock);

    expect(action).toEqual(expectedAction);
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check fetchLogin pending action", () => {
    const action = {
      type: fetchLogin.pending.type,
    };
    const expectedState = {
      ...initialState,
      loginRequest: true,
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check fetchLogin fulfilled action", () => {
    const action = {
      type: fetchLogin.fulfilled.type,
      payload: tokenMock,
    };
    const mockStore = configureMockStore([thunk]);

    const store = mockStore({ data: null });

    expect(authReducer(undefined, action)).toEqual(initialState);
    return store.dispatch(fetchLogin() as any).then(() => {
      expect(getRefreshToken()).toEqual("refresh");
      expect(getAccessToken()).toEqual("access");
    });
  });

  test("Should check fetchLogin error action", () => {
    const action = {
      type: fetchLogin.rejected.type,
      payload: "email or password are incorrect",
    };
    const expectedState = {
      ...initialState,
      loginFailed: true,
      error: "Неверный логин или пароль",
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check fetchLogout pending action", () => {
    const action = {
      type: fetchLogout.pending.type,
    };
    const expectedState = {
      ...initialState,
      logoutRequest: true,
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check fetchLogout fulfilled action", () => {
    const action = {
      type: fetchLogout.fulfilled.type,
    };
    const startState = {
      ...initialState,
      user: {
        nameUser: "user name",
        emailUser: "user email",
      },
      formProfile: {
        name: "name",
        email: "email",
      },
    };

    expect(authReducer(startState, action)).toEqual(initialState);
  });

  test("Should check fetchLogout error action", () => {
    const action = {
      type: fetchLogout.rejected.type,
    };
    const expectedState = {
      ...initialState,
      logoutFailed: true,
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check fetchRegister pending action", () => {
    const action = {
      type: fetchRegister.pending.type,
    };
    const expectedState = {
      ...initialState,
      registerRequest: true,
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check fetchRegister fulfilled action", () => {
    const action = {
      type: fetchRegister.fulfilled.type,
      payload: tokenMock,
    };
    const mockStore = configureMockStore([thunk]);

    const store = mockStore({ data: null });

    expect(authReducer(undefined, action)).toEqual(initialState);
    return store.dispatch(fetchRegister() as any).then(() => {
      expect(getRefreshToken()).toEqual("refresh");
      expect(getAccessToken()).toEqual("access");
    });
  });

  test("Should check fetchRegister error action", () => {
    const action = {
      type: fetchRegister.rejected.type,
      payload: "User already exists",
    };
    const expectedState = {
      ...initialState,
      registerFailed: true,
      error: "Пользователь уже существует",
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check fetchForgotPassword pending action", () => {
    const action = {
      type: fetchForgotPassword.pending.type,
    };
    const expectedState = {
      ...initialState,
      forgotPasswordRequest: true,
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check fetchForgotPassword fulfilled action", () => {
    const action = {
      type: fetchForgotPassword.fulfilled.type,
    };

    expect(authReducer(undefined, action)).toEqual(initialState);
  });

  test("Should check fetchForgotPassword error action", () => {
    const action = {
      type: fetchForgotPassword.rejected.type,
    };
    const expectedState = {
      ...initialState,
      forgotPasswordFailed: true,
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check fetchResetPassword pending action", () => {
    const action = {
      type: fetchResetPassword.pending.type,
    };
    const expectedState = {
      ...initialState,
      resetPasswordRequest: true,
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check fetchResetPassword fulfilled action", () => {
    const action = {
      type: fetchResetPassword.fulfilled.type,
    };
    const expectedState = {
      ...initialState,
      resetPasswordSuccess: true,
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check fetchResetPassword error action", () => {
    const action = {
      type: fetchResetPassword.rejected.type,
      payload: "Incorrect reset token",
    };
    const expectedState = {
      ...initialState,
      resetPasswordFailed: true,
      error: "Неверный код",
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check fetchProfile pending action", () => {
    const action = {
      type: fetchProfile.pending.type,
    };
    const expectedState = {
      ...initialState,
      getProfileRequest: true,
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check fetchProfile fulfilled action", () => {
    const action = {
      type: fetchProfile.fulfilled.type,
      payload: {
        user: {
          name: "name mock",
          email: "email mock",
        },
      },
    };
    const expectedState = {
      ...initialState,
      user: {
        nameUser: "name mock",
        emailUser: "email mock",
      },
      formProfile: {
        name: "name mock",
        email: "email mock",
      },
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check fetchProfile error action", () => {
    const action = {
      type: fetchProfile.rejected.type,
    };
    const expectedState = {
      ...initialState,
      getProfileFailed: true,
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check updateProfile pending action", () => {
    const action = {
      type: updateProfile.pending.type,
    };
    const expectedState = {
      ...initialState,
      setProfileRequest: true,
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check updateProfile fulfilled action", () => {
    const action = {
      type: updateProfile.fulfilled.type,
      payload: {
        user: {
          name: "name mock",
          email: "email mock",
        },
      },
    };
    const expectedState = {
      ...initialState,
      user: {
        nameUser: "name mock",
        emailUser: "email mock",
      },
      formProfile: {
        name: "name mock",
        email: "email mock",
      },
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check updateProfile error action", () => {
    const action = {
      type: updateProfile.rejected.type,
    };
    const expectedState = {
      ...initialState,
      setProfileFailed: true,
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
});
