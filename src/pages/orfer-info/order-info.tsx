import style from "./order-info.module.scss";
import { OrderInfoDetails } from "components/order-info-details/order-info-details";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  fetchIngredients,
  getCurrentOrder,
  wsClose,
} from "services/slices/ingredientsSlice";
import { TOrder } from "utils/types";
import { WS_ORDERS_ALL } from "utils/constsAPI";
import { WS_CONNECTION_START } from "services/actions/wsActions";

export const OrderInfoPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { currentOrder } = useAppSelector((state) => state.ingredients);
  const { orders } = useAppSelector((state) => state.ingredients);
  const { ingredients } = useAppSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch, ingredients]);

  useEffect(() => {
    if (!currentOrder && orders && orders.length > 0) {
      const tmp = orders.find((item: TOrder) => item._id === id);
      dispatch(getCurrentOrder(tmp));
    }
  }, [dispatch, currentOrder, orders, id]);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: WS_ORDERS_ALL });
    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);

  return (
    <div className={style.wrapper}>
      {currentOrder ? (
        <div className={style.details}>
          <span className="text text_type_digits-default">
            #{currentOrder.number}
          </span>
          <OrderInfoDetails />
        </div>
      ) : (
        <span className="text text_type_main-large">Загрузка...</span>
      )}
    </div>
  );
};
