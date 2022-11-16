import { OrdersList } from "components/orders-list/orders-list";
import FeedInfo from "components/feed-info/feed-info";
import style from "./feed.module.scss";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import { useEffect, useState } from "react";
import { ROUTES } from "utils/constsRoute";
import { useLocation } from "react-router-dom";
import { wsClose } from "services/slices/ingredientsSlice";
import { OrderInfoPage } from "pages/orfer-info/order-info";
import { ILocationState } from "utils/types";
import { WS_ORDERS_ALL } from "utils/constsAPI";
import { WS_CONNECTION_START } from "services/actions/wsActions";
import { Tab } from "utils/libComponentsWithTypes";

export default function FeedPage() {
  const { orders, isSocketError } = useAppSelector(
    (state) => state.ingredients
  );
  const dispatch = useAppDispatch();
  const location = useLocation<ILocationState>();
  const [isStats, setStats] = useState(false);

  const handleTabClick = () => {
    setStats(!isStats);
  };

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: WS_ORDERS_ALL });
    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);

  if (
    location.pathname !== ROUTES.FEED &&
    location.state?.from !== ROUTES.FEED
  ) {
    return <OrderInfoPage />;
  }
  return (
    <div className={style.wrapper}>
      {isSocketError ? (
        <h1 className="text text_type_main-medium mt-10">
          Ошибка выполнения запроса
        </h1>
      ) : (
        <>
          <h1 className="text text_type_main-large mt-10 mb-5">
            Лента заказов
          </h1>
          <ul className={style.nav}>
            <li className={style.li}>
              <Tab value="orders" active={!isStats} onClick={handleTabClick}>
                Заказы
              </Tab>
            </li>
            <li className={style.li}>
              <Tab value="stats" active={isStats} onClick={handleTabClick}>
                Статистика
              </Tab>
            </li>
          </ul>
          <main className={style.main}>
            <div className={`${style.list} ${!isStats && style.active}`}>
              <OrdersList orders={orders} />
            </div>
            <div className={`${style.stats} ${isStats && style.active}`}>
              <FeedInfo />
            </div>
          </main>
        </>
      )}
    </div>
  );
}
