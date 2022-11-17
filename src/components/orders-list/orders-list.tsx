import style from "./style.module.scss";
import OrderCard from "components/order-card/order-card";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import {
  deleteCurrentOrder,
  fetchIngredients,
  getCurrentOrder,
} from "services/slices/ingredientsSlice";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { ROUTES } from "utils/constsRoute";
import Modal from "components/modal/modal";
import OrderInfoDetails from "components/order-info-details/order-info-details";
import { TOrder } from "utils/types";
import Loader from "components/loader/loader";

interface IProps {
  orders?: Array<TOrder>;
}

export default function OrdersList({ orders }: IProps) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const history = useHistory();
  const [isModalVisible, setModalVisible] = useState(
    location.pathname !== ROUTES.FEED && location.pathname !== ROUTES.ORDERS
  );
  const { id } = useParams<{ id: string }>();
  const { currentOrder, ingredients, isSocketError } = useAppSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    if (!ingredients?.length) {
      dispatch(fetchIngredients());
    }
  }, []);

  useEffect(() => {
    if (ingredients?.length && !currentOrder && orders && orders.length > 0) {
      const tmp = orders && orders.find((item) => item._id === id);
      dispatch(getCurrentOrder(tmp));
    }
  }, [dispatch, currentOrder, orders, id, ingredients]);

  const handleClick = useCallback(
    (currentId: string) => {
      const id = orders?.find((item) => item._id === currentId);
      dispatch(getCurrentOrder(id));
      setModalVisible(true);
    },
    [orders]
  );

  const handleClose = () => {
    setModalVisible(false);
    dispatch(deleteCurrentOrder());
    history.replace(
      location.pathname.includes(ROUTES.FEED) ? ROUTES.FEED : ROUTES.ORDERS
    );
  };

  return (
    <section className={style.wrapper}>
      {isSocketError ? (
        <h1>Ошибка выполнения запроса</h1>
      ) : orders && orders.length ? (
        orders.map((order: TOrder) => (
          <OrderCard order={order} key={order._id} handleClick={handleClick} />
        ))
      ) : orders ? (
        <div className={style.empty}>
          <h2>Список заказов пуст</h2>
        </div>
      ) : (
        <Loader />
      )}
      {isModalVisible && currentOrder && (
        <Modal title={currentOrder.number} close={handleClose}>
          <OrderInfoDetails />
        </Modal>
      )}
    </section>
  );
}
