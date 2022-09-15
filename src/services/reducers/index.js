import { combineReducers } from 'redux';
import {
    GET_INGREDIENTS_CONSTRUCTOR,
    ADD_INGREDIENT_CONSTRUCTOR,
    DELETE_INGREDIENT_CONSTRUCTOR,
    GET_CURRENT_INGREDIENT,
    DELETE_CURRENT_INGREDIENT,
    GET_TOTAL,

    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,

    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
} from 'services/actions/index.js';
import {
    userReducer,
    registerReducer,
    updateTokenReducer,
    profileReducer,
    resetPasswordReducer,
    setPasswordReducer
} from './auth.js';

const ingredientsInitialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: []
};

const constructorInitialState = {
    constructorIngredients: [],
    lastIndex: 0
};

const currentIngredientInitialState = {
    currentIngredient: {}
};

const orderInitialState = {
    orderRequest: false,
    orderFailed: false,
    order: {}
};

const totalInitialState = {
    sum: 0
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredients: action.ingredients
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false
            };
        }
        default: {
            return state
        }
    }
};

export const constructorReducer = (state = constructorInitialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_CONSTRUCTOR: {
            return {
                ...state,
                constructorIngredients: action.constructorIngredients
            };
        }
        case ADD_INGREDIENT_CONSTRUCTOR:
            const newItem = { ...action.item, dropId: state.lastIndex + 1 }
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients, newItem],
                lastIndex: state.lastIndex + 1
            }
        case DELETE_INGREDIENT_CONSTRUCTOR:
            const ingredients = state.constructorIngredients.filter(item => item.dropId !== action.item.dropId);
            return {
                ...state,
                constructorIngredients: ingredients
            }
        default: {
            return state;
        }
    }
};

export const currentIngredientReducer = (state = currentIngredientInitialState, action) => {
    switch (action.type) {
        case GET_CURRENT_INGREDIENT: {
            return {
                ...state,
                currentIngredient: action.id
            };
        }
        case DELETE_CURRENT_INGREDIENT: {
            return {
                ...state,
                currentIngredient: {}
            };
        }
        default: {
            return state
        }
    }
};

export const orderReducer = (state = orderInitialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                order: action.order,
                orderRequest: false
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            };
        }
        default: {
            return state
        }
    }
};

export const totalReducer = (state = totalInitialState, action) => {
    switch (action.type) {
        case GET_TOTAL: {
            return {
                ...state,
                sum: action.sum
            };
        }
        default: {
            return state
        }
    }
};

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorIngredients: constructorReducer,
    currentIngredient: currentIngredientReducer,
    order: orderReducer,
    total: totalReducer,
    resetPassword: resetPasswordReducer,
    setPassword: setPasswordReducer,
    user: userReducer,
    register: registerReducer,
    token: updateTokenReducer,
    profile: profileReducer,
});
