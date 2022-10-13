import style from "./style.module.scss";
import { OrderCard } from "components/order-card/order-card";
import { FC, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import {
  deleteCurrentOrder,
  fetchIngredients,
  getCurrentOrder,
} from "services/slices/ingredientsSlice";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { ROUTES } from "utils/constsRoute";
import { Modal } from "components/modal/modal";
import { OrderInfoDetails } from "components/order-info-details/order-info-details";
import { TOrder } from "utils/types";

interface IProps {
  orders: Array<TOrder>;
}

export const OrdersList: FC<IProps> = ({ orders }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const history = useHistory();
  const [isModalVisible, setModalVisible] = useState(
    location.pathname !== ROUTES.FEED && location.pathname !== ROUTES.ORDERS
  );
  const { id } = useParams<{ id: string }>();
  const { currentOrder, ingredients } = useAppSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    if (!ingredients || (ingredients && ingredients.length === 0))
      dispatch(fetchIngredients());
  }, [dispatch, ingredients]);

  useEffect(() => {
    if (!currentOrder && orders.length > 0) {
      const tmp = orders.find((item) => item._id === id);
      dispatch(getCurrentOrder(tmp));
    }
  }, [dispatch, currentOrder, orders, id]);

  const handleClick = useCallback(
    (currentId: string) => {
      const id = orders.find((item) => item._id === currentId);
      dispatch(getCurrentOrder(id));
      setModalVisible(true);
    },
    [orders, dispatch]
  );

  const handleClose = () => {
    setModalVisible(false);
    dispatch(deleteCurrentOrder());
    history.replace({
      pathname: location.pathname.includes(ROUTES.FEED)
        ? ROUTES.FEED
        : ROUTES.ORDERS,
    });
  };

  return (
    <section className={style.wrapper}>
      {orders.map((order: TOrder) => (
        <OrderCard order={order} key={order._id} handleClick={handleClick} />
      ))}
      {isModalVisible && currentOrder && (
        <Modal title={currentOrder.number} close={handleClose}>
          <OrderInfoDetails />
        </Modal>
      )}
    </section>
  );
};
