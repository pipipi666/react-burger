import {
    API_URL_INGREDIENTS,
    API_URL_ORDERS,
} from "../../utils/constsAPI";
import { checkReponse, getStorageToken } from "../../utils/utils";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const GET_INGREDIENTS_CONSTRUCTOR = 'GET_INGREDIENTS_CONSTRUCTOR';
export const ADD_INGREDIENT_CONSTRUCTOR = 'ADD_INGREDIENT_CONSTRUCTOR';
export const DELETE_INGREDIENT_CONSTRUCTOR = 'DELETE_INGREDIENT_CONSTRUCTOR';
export const UPDATE_CONSTRUCTOR_LIST = 'SORT_INGREDIENT_CONSTRUCTOR';

export const GET_CURRENT_INGREDIENT = 'GET_CURRENT_INGREDIENT';
export const DELETE_CURRENT_INGREDIENT = 'DELETE_CURRENT_INGREDIENT';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const GET_TOTAL = 'GET_TOTAL';

export function getIngredients() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        })
        fetch(API_URL_INGREDIENTS)
            .then(checkReponse)
            .then(res => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: res.data
                })
            }).catch(err => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            })
    }
};

export function getOrder(ingredients) {
    return function (dispatch) {
        const token = getStorageToken();
        dispatch({
            type: GET_ORDER_REQUEST
        })
        fetch(API_URL_ORDERS, {
            method: "POST",
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: 'Bearer ' + token
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ ingredients }),
        }).then(checkReponse)
            .then(res => {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    order: res.order
                })
            }).catch(err => {
                dispatch({
                    type: GET_ORDER_FAILED
                })
            })
    }
};

export function getTotal(constructorIngredients) {
    let sum = 0;
    let bunFlag = false;
    const res = constructorIngredients.reduce(function (accumulator, currentValue) {
        if (currentValue.type === "bun") {
            if (bunFlag) return accumulator;
            bunFlag = true;
            return accumulator + currentValue.price * 2;
        }
        return accumulator + currentValue.price;
    }, sum);

    return {
        type: GET_TOTAL,
        sum: res
    }
};

export function addIngredientConstructor(item) {
    return {
        type: ADD_INGREDIENT_CONSTRUCTOR,
        item,
    }
};

export function getIngredientsConstructor(ingredients) {
    return {
        type: GET_INGREDIENTS_CONSTRUCTOR,
        constructorIngredients: ingredients
    }
};

export function deleteIngredientConstructor(item) {
    return {
        type: DELETE_INGREDIENT_CONSTRUCTOR,
        item,
    }
};

export function getCurrentIngredient(id) {
    return {
        type: GET_CURRENT_INGREDIENT,
        id
    }
};

export function deleteCurrentIngredient() {
    return {
        type: DELETE_CURRENT_INGREDIENT
    }
};
