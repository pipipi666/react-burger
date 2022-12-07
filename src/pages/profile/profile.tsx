import style from "./profile.module.scss";
import { Redirect, useLocation } from "react-router-dom";
import UserInfo from "components/user-info/user-info";
import OrdersList from "components/orders-list/orders-list";
import AsideNav from "components/aside-nav/aside-nav";
import { ROUTES } from "utils/constsRoute";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import { getAccessToken, isAuth } from "utils/utils";
import { fetchIngredients, wsClose } from "services/slices/ingredientsSlice";
import { OrderInfoPage } from "pages/orfer-info/order-info";
import { ILocationState } from "utils/types";
import { WS_ORDERS_USER } from "utils/constsAPI";
import { WS_CONNECTION_START } from "services/actions/wsActions";
import { fetchProfile } from "services/slices/authSlice";

export default function ProfilePage() {
  const { orders, ingredients } = useAppSelector((state) => state.ingredients);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation<ILocationState>();
  const auth = isAuth();

  useEffect(() => {
    !user?.nameUser && !user?.emailUser && dispatch(fetchProfile());
  }, [user, dispatch]);

  useEffect(() => {
    if (!ingredients || (ingredients && !ingredients.length)) {
      dispatch(fetchIngredients());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user.nameUser) {
      dispatch({
        type: WS_CONNECTION_START,
        payload: WS_ORDERS_USER + getAccessToken(),
      });
    }
    return () => {
      dispatch(wsClose());
    };
  }, [dispatch, user]);

  if (
    location.pathname !== ROUTES.PROFILE &&
    location.pathname !== ROUTES.ORDERS &&
    location.state?.from !== ROUTES.ORDERS
  ) {
    return <OrderInfoPage />;
  }

  if (!auth) {
    return <Redirect to={ROUTES.LOGIN} />;
  }

  return (
    <div className={style.page}>
      <main className={style.wrapper}>
        <AsideNav />
        <section className={style.info}>
          {location.pathname === ROUTES.PROFILE ? (
            <>
              <p className={`text text_type_main-medium mt-4 ${style.title}`}>
                Профиль
              </p>
              <UserInfo />
            </>
          ) : (
            <div className={style.list}>
              <p className={`text text_type_main-medium mb-4 ${style.title}`}>
                История заказов
              </p>
              <OrdersList orders={orders} />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
