import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { checkReponse, fetchWithRefresh, getAccessToken } from "utils/utils";
import { API_URL_INGREDIENTS, API_URL_ORDERS } from "utils/constsAPI";
import { IData } from "utils/types";
import { AppDispatch, RootState } from "services/store";

export type TIngredientsActions = ReturnType<typeof fetchIngredients> |
    ReturnType<typeof fetchOrder> |
    ReturnType<typeof addIngredient> |
    ReturnType<typeof deleteIngredient> |
    ReturnType<typeof getCurrentIngredient> |
    ReturnType<typeof deleteCurrentIngredient> |
    ReturnType<typeof setIngredients> |
    ReturnType<typeof total>

export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    () => fetch(API_URL_INGREDIENTS)
        .then(res => checkReponse(res))
)

export const fetchOrder = createAsyncThunk(
    'ingredients/fetchOrder',
    (ingredients, { rejectWithValue }) => fetchWithRefresh(
        API_URL_ORDERS, {
        method: "POST",
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getAccessToken()
        },
        body: JSON.stringify({ ingredients })
    }, rejectWithValue)
)

type TOrder = {
    number: string
}

type TIngredientsState = {
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,
    ingredients: Array<IData>,
    constructorIngredients: Array<IData>,
    lastIndexConstructor: number,
    currentIngredient: IData | {},
    orderRequest: boolean,
    orderFailed: boolean,
    order: TOrder | {},
    sum: number,
}

const initialState: TIngredientsState = {
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.ingredientsRequest = true
                state.ingredientsFailed = false
            })
            .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<any>) => {
                state.ingredientsRequest = false
                state.ingredientsFailed = false
                state.ingredients = action.payload.data
            })
            .addCase(fetchIngredients.rejected, (state) => {
                state.ingredientsRequest = false
                state.ingredientsFailed = true
            })
            .addCase(fetchOrder.pending, (state) => {
                state.orderRequest = true
                state.orderFailed = false
            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.orderRequest = false
                state.orderFailed = false
                state.order = action.payload.order
            })
            .addCase(fetchOrder.rejected, (state) => {
                state.orderRequest = false
                state.orderFailed = true
            })
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
