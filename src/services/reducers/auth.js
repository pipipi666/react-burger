import {
    LOGIN_FORM_SET_VALUE,
    LOGIN_FORM_SUBMIT,
    LOGIN_FORM_SUBMIT_SUCCESS,
    LOGIN_FORM_SUBMIT_FAILED,

    REGISTER_FORM_SET_VALUE,
    REGISTER_FORM_SUBMIT,
    REGISTER_FORM_SUBMIT_SUCCESS,
    REGISTER_FORM_SUBMIT_FAILED,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,

    RESET_PASSWORD_FORM_SET_VALUE,
    RESET_PASSWORD_FORM_SUBMIT,
    RESET_PASSWORD_FORM_SUBMIT_SUCCESS,
    RESET_PASSWORD_FORM_SUBMIT_FAILED,

    SET_PASSWORD_FORM_SET_VALUE,
    SET_PASSWORD_FORM_SUBMIT,
    SET_PASSWORD_FORM_SUBMIT_SUCCESS,
    SET_PASSWORD_FORM_SUBMIT_FAILED,

    TOKEN_REQUEST,
    TOKEN_SUCCESS,
    TOKEN_FAILED,

    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILED,
    PROFILE_FORM_SET_VALUE,
    PROFILE_FORM_SUBMIT,
    PROFILE_FORM_SUBMIT_SUCCESS,
    PROFILE_FORM_SUBMIT_FAILED,
} from 'services/actions/auth.js';

const userInitialState = {
    form: {
        email: '',
        password: ''
    },
    loginRequest: false,
    loginFailed: false,
    logoutRequest: false,
    logoutFailed: false,
    logoutSuccess: false,
    error: ''
};

const registerInitialState = {
    form: {
        name: '',
        email: '',
        password: ''
    },
    registerRequest: false,
    registerFailed: false,
    error: '',
    registerSuccess: false
};

const resetPasswordInitialState = {
    form: {
        email: '',
    },
    resetPasswordRequest: false,
    resetPasswordFailed: false,
};

const setPasswordInitialState = {
    form: {
        password: '',
        token: ''
    },
    setPasswordRequest: false,
    setPasswordFailed: false,
};

const profileInitialState = {
    user: {
        name: '',
        email: '',
    },
    form: {
        name: '',
        email: '',
    },
    getProfileRequest: false,
    getProfileFailed: false,
    setProfileRequest: false,
    setProfileFailed: false,
};

const tokenInitialState = {
    tokenRequest: false,
    tokenFailed: false,
    accessToken: "",
    regreshToken: ""
};

export const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case LOGIN_FORM_SET_VALUE: {
            return {
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        }
        case LOGIN_FORM_SUBMIT: {
            return {
                ...state,
                loginRequest: true,
                loginFailed: false,
            };
        }
        case LOGIN_FORM_SUBMIT_SUCCESS: {
            return {
                ...state,
                form: {
                    ...userInitialState.form
                },
                loginRequest: false,
                error: ''
            };
        }
        case LOGIN_FORM_SUBMIT_FAILED: {
            return {
                ...state,
                loginFailed: true,
                loginRequest: false,
                error: action.error

            };
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
                logoutFailed: false,
            };
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                logoutRequest: false,
                logoutSuccess: true,
                error: ''
            };
        }
        case LOGOUT_FAILED: {
            return {
                ...state,
                logoutFailed: true,
                logoutRequest: false,
            };
        }
        default: {
            return state
        }
    }
};

export const registerReducer = (state = registerInitialState, action) => {
    switch (action.type) {
        case REGISTER_FORM_SET_VALUE: {
            return {
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        }
        case REGISTER_FORM_SUBMIT: {
            return {
                ...state,
                registerRequest: true,
                registerFailed: false,
            };
        }
        case REGISTER_FORM_SUBMIT_SUCCESS: {
            return {
                ...state,
                form: {
                    ...registerInitialState.form
                },
                registerRequest: false,
                error: '',
                registerSuccess: true
            };
        }
        case REGISTER_FORM_SUBMIT_FAILED: {
            return {
                ...state,
                registerFailed: true,
                registerRequest: false,
                error: action.error
            };
        }
        default: {
            return state
        }
    }
};

export const resetPasswordReducer = (state = resetPasswordInitialState, action) => {
    switch (action.type) {
        case RESET_PASSWORD_FORM_SET_VALUE: {
            return {
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        }
        case RESET_PASSWORD_FORM_SUBMIT: {
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordFailed: false,
            };
        }
        case RESET_PASSWORD_FORM_SUBMIT_SUCCESS: {
            return {
                ...state,
                form: {
                    ...resetPasswordInitialState.form
                },
                resetPasswordRequest: false,
            };
        }
        case RESET_PASSWORD_FORM_SUBMIT_FAILED: {
            return {
                ...state,
                resetPasswordFailed: true,
                resetPasswordRequest: false
            };
        }
        default: {
            return state
        }
    }
};

export const setPasswordReducer = (state = setPasswordInitialState, action) => {
    switch (action.type) {
        case SET_PASSWORD_FORM_SET_VALUE: {
            return {
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        }
        case SET_PASSWORD_FORM_SUBMIT: {
            return {
                ...state,
                setPasswordRequest: true,
                setPasswordFailed: false,
            };
        }
        case SET_PASSWORD_FORM_SUBMIT_SUCCESS: {
            return {
                ...state,
                form: {
                    ...setPasswordInitialState.form
                },
                setPasswordRequest: false,
            };
        }
        case SET_PASSWORD_FORM_SUBMIT_FAILED: {
            return {
                ...state,
                setPasswordFailed: true,
                setPasswordRequest: false
            };
        }
        default: {
            return state
        }
    }
};

export const profileReducer = (state = profileInitialState, action) => {
    switch (action.type) {
        case GET_PROFILE_REQUEST: {
            return {
                ...state,
                getProfileRequest: true,
                getProfileFailed: false,
            };
        }
        case GET_PROFILE_SUCCESS: {
            return {
                ...state,
                form: action.form,
                getProfileRequest: false,
            };
        }
        case GET_PROFILE_FAILED: {
            return {
                ...state,
                getProfileFailed: true,
                getProfileRequest: false
            };
        }
        case PROFILE_FORM_SET_VALUE: {
            return {
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        }
        case PROFILE_FORM_SUBMIT: {
            return {
                ...state,
                setProfileRequest: true,
                setProfileFailed: false,
            };
        }
        case PROFILE_FORM_SUBMIT_SUCCESS: {
            return {
                ...state,
                form: {
                    ...profileInitialState.form
                },
                setProfileRequest: false,
            };
        }
        case PROFILE_FORM_SUBMIT_FAILED: {
            return {
                ...state,
                setProfileFailed: true,
                setProfileRequest: false
            };
        }
        default: {
            return state
        }
    }
};

export const updateTokenReducer = (state = tokenInitialState, action) => {
    switch (action.type) {
        case TOKEN_REQUEST: {
            return {
                ...state,
                tokenRequest: true,
                tokenFailed: false,
            };
        }
        case TOKEN_SUCCESS: {
            return {
                ...state,
                accessToken: action.accessToken,
                tokenRequest: false
            };
        }
        case TOKEN_FAILED: {
            return {
                ...state,
                tokenFailed: true,
                tokenRequest: false
            };
        }
        default: {
            return state
        }
    }
};
