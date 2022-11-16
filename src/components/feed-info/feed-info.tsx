import { useEffect, useMemo } from "react";
import { WS_CONNECTION_START } from "services/actions/wsActions";
import { wsClose } from "services/slices/ingredientsSlice";
import { WS_ORDERS_ALL } from "utils/constsAPI";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import { TOrder } from "utils/types";
import style from "./style.module.scss";

export default function FeedInfo() {
  const { orders, ordersTotal, ordersTotalToday } = useAppSelector(
    (state) => state.ingredients
  );
  const dispatch = useAppDispatch();
  const done = useMemo(
    () => orders?.filter((order) => order.status === "done"),
    [orders]
  );
  const atWork = useMemo(
    () => orders?.filter((order) => order.status === "pending"),
    [orders]
  );

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: WS_ORDERS_ALL });
    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);

  return (
    <section className={style.container}>
      <div className={style.lists}>
        <div className={style.list}>
          <p className="text text_type_main-medium">Готовы:</p>
          <ul className={style.ul}>
            {done?.map((order: TOrder) => (
              <li
                className={`text text_type_digits-default ${style.li} ${style.done}`}
                key={order._id}
              >
                {order.number}
              </li>
            ))}
          </ul>
        </div>
        <div className={style.list}>
          <p className="text text_type_main-medium">В работе:</p>
          <ul className={style.ul}>
            {atWork?.map((order: TOrder) => (
              <li
                className={`text text_type_digits-default ${style.li}`}
                key={order._id}
              >
                {order.number}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={`text text_type_digits-large ${style.number}`}>
          {ordersTotal}
        </p>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`text text_type_digits-large ${style.number}`}>
          {ordersTotalToday}
        </p>
      </div>
    </section>
  );
}
