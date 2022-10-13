import { useEffect, useMemo } from 'react';
import { wsClose } from 'services/slices/ingredientsSlice';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { TOrder } from 'utils/types';
import style from './style.module.scss';

export default function FeedInfo() {
    const {orders, ordersTotal, ordersTotalToday} = useAppSelector((state) => state.ingredients);
    const dispatch = useAppDispatch();
    const done =  useMemo(() => orders.filter((x: TOrder) => x.status === 'done'),[orders]);
    const atWork =  useMemo(() => orders.filter((x: TOrder) => x.status === 'pending'),[orders]);

    useEffect(() => {
        dispatch({type:'WS_CONNECTION_START', payload: "wss://norma.nomoreparties.space/orders/all"});
        return () => {
            dispatch(wsClose());
        }
    }, [dispatch]);

    return (
        <section className={style.container}>
            <div className={style.lists}>
                <div className={style.list}>
                    <p className="text text_type_main-medium">Готовы:</p>
                    <ul className={style.ul}>
                        {done.map((order: TOrder) => <li className={`text text_type_digits-default ${style.li} ${style.done}`} key={order._id}>{order.number}</li>)}
                    </ul>
                </div>
                <div className={style.list}>
                    <p className="text text_type_main-medium">В работе:</p>
                    <ul className={style.ul}>
                        {atWork.map((order: TOrder) => <li className={`text text_type_digits-default ${style.li}`} key={order._id}>{order.number}</li>)}
                    </ul>
                </div>
            </div>
            <div>
                <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
                <p className="text text_type_digits-large">{ordersTotal}</p>
            </div>
            <div>
                <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
                <p className="text text_type_digits-large">{ordersTotalToday}</p>
            </div>
        </section>
    );
}
