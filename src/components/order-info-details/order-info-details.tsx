import { OrderIngredient } from 'components/order-ingredient/order-ingredient';
import style from './order-info-details.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { fetchIngredients, getCurrentOrder, wsClose } from 'services/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';
import { IData, TOrder } from 'utils/types';

export const OrderInfoDetails:FC = () => {
    const order = useAppSelector((state) => state.ingredients.currentOrder)
    const dispatch = useAppDispatch()
    const ingredients = useAppSelector(state => JSON.parse(JSON.stringify(state.ingredients.ingredients)))
    const orderIngredients = useMemo(() => order && ingredients.filter((item: IData) => order.ingredients.includes(item._id)), [ingredients, order]);
    order && orderIngredients.map((item: IData) => item.count = order.ingredients.filter((x) => x === item._id).length)
    const { id } = useParams<{ id: string }>();
    const { currentOrder } = useAppSelector(state => state.ingredients);
    const { orders } = useAppSelector(state => state.ingredients);

    // useEffect(() => {
    //     dispatch(fetchIngredients());
    // }, [dispatch]);

    // useEffect(() => {
    //     if (!currentOrder && orders.length > 0) {
    //         const tmp = orders.find((item: TOrder) => item._id === id)
    //         dispatch(getCurrentOrder(tmp))
    //     }
    // }, [dispatch, currentOrder, orders, id]);

    // useEffect(() => {
    //     dispatch({type:'WS_CONNECTION_START', payload: "wss://norma.nomoreparties.space/orders/all"})
    //     return dispatch(wsClose())
    // }, []);

    // useEffect(() => {
    //     ingredients.length === 0 && dispatch(fetchIngredients());
    // }, []);
    // console.log('order', order);

    if(order) return (
        <div className={style.container}>
            <p className="text text_type_main-medium mt-10 mb-3">{order.name}</p>
            <div className="text text_type_main-default">
                <div className="text text_type_main-default mb-6">
                    {order.status === 'done' ? <span className={style.done}>Выполнен</span> : order.status === 'pending' ? 'Готовится' : 'Создан'}
                </div>
            </div>
            <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
            <div className={style.images}>
                {orderIngredients.map((item: IData) => <OrderIngredient ingredient = {item} key={item._id} />)}
            </div>
            <div className={style.total}>
                <span className="text text_type_main-default text_color_inactive">{order.createdAt}</span>
                <div className={`text text_type_digits-default ${style.price}`}>{order.total}<CurrencyIcon type='primary'/></div>
            </div>
        </div >
    );
    else return (<p>Загрузка...</p>)
}
