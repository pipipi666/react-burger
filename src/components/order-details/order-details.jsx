import style from './style.module.scss';
import { useSelector } from 'react-redux';
import background from "image/graphics.svg";

export default function OrderDetails() {

    const { order, orderRequest, orderFailed } = useSelector(state => state.ingredients);

    const loading = (
        <div className={style.loader}>Loading...</div>
    );

    const fail = (
        <p className="text text_type_main-medium">
            Ошибка выполнения запроса
        </p>
    );

    const content = (
        <>
            <p className="text text_type_digits-large mt-4 mb-8">
                {order.number}
            </p>
            <p className="text text_type_main-medium">
                идентификатор заказа
            </p>
            <img alt="done" src={background} className={style.done__img} />
            <p className="text text_type_main-default">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive mt-2 mb-20">
                Дождитесь готовности на орбитальной станции
            </p>
        </>
    );

    return (
        <div className={style.content}>
            {
                orderRequest ? loading
                    : orderFailed ? fail
                        : content
            }
        </div>
    );
}
