import { API_URL_INGREDIENTS, API_URL_ORDERS } from "./consts";

const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredients(setLoading, setIngredientsData, setError) {
    return fetch(API_URL_INGREDIENTS)
        .then(checkReponse)
        .then(res => {
            setIngredientsData(res.data);
            setError(null);
        })
        .catch(e => {
            setError(e);
        })
        .finally(setLoading(false));
    ;
}

export function getOrder(setLoading, setError, setOrder, ingredientsData) {
    return fetch(API_URL_ORDERS, {
        method: "POST", body: JSON.stringify({ ingredients: ingredientsData }), headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
        .then(checkReponse)
        .then(res => {
            setOrder(res.order.number);
            setError(null);
        })
        .catch(e => {
            setError(e);
        })
        .finally(setLoading(false));
}