import { API_URL_INGREDIENTS, API_URL_ORDERS } from "../../utils/consts";

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


const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

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
}

export function getOrder(ingredientsData) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        })
        fetch(API_URL_ORDERS, {
            method: "POST",
            body: JSON.stringify({ ingredients: ingredientsData }),
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
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
}