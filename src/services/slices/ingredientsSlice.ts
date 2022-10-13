import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkReponse, fetchWithRefresh, getAccessToken } from "utils/utils";
import { API_URL_INGREDIENTS, API_URL_ORDERS } from "utils/constsAPI";
import { TIngredientsState, TIngredientsThunk, TOrder, TOrderThunk } from "utils/types";

export type TIngredientsActions = ReturnType<typeof fetchIngredients> |
    ReturnType<typeof fetchOrder> |
    ReturnType<typeof addIngredient> |
    ReturnType<typeof deleteIngredient> |
    ReturnType<typeof getCurrentIngredient> |
    ReturnType<typeof deleteCurrentIngredient> |
    ReturnType<typeof setIngredients> |
    ReturnType<typeof total> |
    ReturnType<typeof setOrders> |
    ReturnType<typeof setOrdersTotal> |
    ReturnType<typeof setOrdersTotalToday> |
    ReturnType<typeof wsSuccess> |
    ReturnType<typeof wsError> |
    ReturnType<typeof wsClose> |
    ReturnType<typeof getCurrentOrder> |
    ReturnType<typeof deleteCurrentOrder>

export const fetchIngredients = createAsyncThunk<TIngredientsThunk,void>(
    'ingredients/fetchIngredients',
    () => fetch(API_URL_INGREDIENTS)
        .then(res => checkReponse(res))
)

export const fetchOrder = createAsyncThunk<TOrderThunk,string[]>(
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
    })
    .catch(err => rejectWithValue(err.message))
)

const initialState: TIngredientsState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: [],
    constructorIngredients: [],
    lastIndexConstructor: 0,
    orderRequest: false,
    orderFailed: false,
    sum: 0,
    orders:[],
    isSocket: false,
    isSocketError: false,
    ordersTotal: 0,
    ordersTotalToday:0,
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
            if(state.currentIngredient) state.currentIngredient = undefined
        },
        getCurrentOrder: (state, action) => {
            state.currentOrder = action.payload
        },
        deleteCurrentOrder: (state) => {
            if(state.currentOrder) state.currentOrder = undefined
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
        },
        setOrders: (state, action) => {
            const orders = action.payload
            orders && orders.map((x: TOrder) => {
                const date = new Date(x.createdAt)
                const now = new Date(Date.now())
                const difference = Math.ceil((now.valueOf() - date.valueOf())/(24*60*60*1000)) ;
                let days = (difference > 4 ? `${difference} дней назад` : difference > 1 ? `${difference} дня назад` : difference ? 'Вчера' : 'Сегодня' )
                x.createdAt = `${days}, ${date.toLocaleString('ru',{hour: '2-digit', minute:'2-digit',timeZoneName:"shortOffset"})}`
                let sum = 0;
                const orderIngredients = state.ingredients.filter(item => x.ingredients.includes(item._id))
                const res = orderIngredients.reduce(function (accumulator, currentValue) {
                    return accumulator + currentValue.price;
                }, sum);
                x.total = res
                return x
            })
            state.orders = orders
        },
        setOrdersTotal: (state, action) => {
            state.ordersTotal = action.payload
        },
        setOrdersTotalToday: (state, action) => {
            state.ordersTotalToday = action.payload
        },
        wsSuccess: (state) => {
            state.isSocket = true
            state.isSocketError = false
        },
        wsError: (state) => {
            state.isSocketError = true
            state.isSocket = false
        },
        wsClose: (state) => {
            state.isSocket = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.ingredientsRequest = true
                state.ingredientsFailed = false
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
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
    total,
    setOrders,
    setOrdersTotal,
    setOrdersTotalToday,
    wsSuccess,
    wsError,
    wsClose,
    getCurrentOrder,
    deleteCurrentOrder
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
