import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkReponse, fetchWithRefresh, getAccessToken } from "utils/utils";
import { API_URL_INGREDIENTS, API_URL_ORDERS } from "utils/constsAPI";

export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    () => fetch(API_URL_INGREDIENTS)
        .then(res => checkReponse(res))
)

export const fetchOrder = createAsyncThunk(
    'ingredients/fetchOrder',
    (ingredients, { dispatch, rejectWithValue }) => fetchWithRefresh(
        API_URL_ORDERS, {
        method: "POST",
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getAccessToken()
        },
        body: JSON.stringify({ ingredients })
    }, dispatch, rejectWithValue)
)

const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: [],
    constructorIngredients: [],
    lastIndexConstructor: 0,
    currentIngredient: {},
    orderRequest: false,
    orderFailed: false,
    order: {},
    sum: 0
}

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        addIngredient: (state, action) => {
            const newItem = { ...action.payload, dropId: state.lastIndexConstructor + 1 }
            state.constructorIngredients.push(newItem)
            state.lastIndexConstructor++
        },
        deleteIngredient: (state, action) => {
            const ingredients = state.constructorIngredients.filter(item => item.dropId !== action.payload.dropId);
            state.constructorIngredients = ingredients
        },
        getCurrentIngredient: (state, action) => {
            state.currentIngredient = action.payload
        },
        deleteCurrentIngredient: (state) => {
            state.currentIngredient = {}
        },
        setIngredients: (state, action) => {
            state.constructorIngredients = action.payload
        },
        total: (state) => {
            let sum = 0;
            let bunFlag = false;
            const res = state.constructorIngredients.reduce(function (accumulator, currentValue) {
                if (currentValue.type === "bun") {
                    if (bunFlag) return accumulator;
                    bunFlag = true;
                    return accumulator + currentValue.price * 2;
                }
                return accumulator + currentValue.price;
            }, sum);
            state.sum = res
        }
    },
    extraReducers: {
        [fetchIngredients.pending]: (state) => {
            state.ingredientsRequest = true
            state.ingredientsFailed = false
        },
        [fetchIngredients.fulfilled]: (state, action) => {
            state.ingredientsRequest = false
            state.ingredientsFailed = false
            state.ingredients = action.payload.data
        },
        [fetchIngredients.rejected]: (state) => {
            state.ingredientsRequest = false
            state.ingredientsFailed = true
        },
        [fetchOrder.pending]: (state) => {
            state.orderRequest = true
            state.orderFailed = false
        },
        [fetchOrder.fulfilled]: (state, action) => {
            state.orderRequest = false
            state.orderFailed = false
            state.order = action.payload.order
        },
        [fetchOrder.rejected]: (state) => {
            state.orderRequest = false
            state.orderFailed = true
        },
    }
})

export const {
    addIngredient,
    deleteIngredient,
    getCurrentIngredient,
    deleteCurrentIngredient,
    setIngredients,
    total
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
