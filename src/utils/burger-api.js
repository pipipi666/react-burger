import { API_URL_INGREDIENTS } from "./consts";

const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredients(setLoading, setIngredientsData, setError) {
    return fetch(API_URL_INGREDIENTS)
        .then(checkReponse)
        .then(res => {
            setIngredientsData(res.data);
            setLoading(false);
            setError(null);
        })
        .catch(e => {
            setError(e);
            setLoading(false);
        });
}