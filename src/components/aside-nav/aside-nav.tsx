import { NavLink, useLocation } from "react-router-dom";
import { ROUTES } from "utils/constsRoute";
import style from "./style.module.scss";
import { fetchLogout } from "services/slices/authSlice";
import { useAppDispatch } from "utils/hooks";

export default function AsideNav() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const classLink = `text text_type_main-medium text_color_inactive ${style.link}`;
  const classLinkActive = `text text_type_main-medium ${style.active}`;

  const handleLogOutClick = () => {
    dispatch(fetchLogout());
  };

  return (
    <div className={style.left}>
      <ul className={style.list}>
        <li className={style.list__item}>
          <NavLink
            exact
            className={classLink}
            activeClassName={classLinkActive}
            to={ROUTES.PROFILE}
          >
            Профиль
          </NavLink>
        </li>
        <li className={style.list__item}>
          <NavLink
            exact
            to={ROUTES.ORDERS}
            className={classLink}
            activeClassName={classLinkActive}
          >
            История заказов
          </NavLink>
        </li>
        <li className={style.list__item}>
          <NavLink
            exact
            to={ROUTES.LOGIN}
            className={classLink}
            activeClassName={classLinkActive}
            onClick={handleLogOutClick}
          >
            Выход
          </NavLink>
        </li>
      </ul>
      <p className="text text_type_main-default text_color_inactive">
        {location.pathname.includes(ROUTES.ORDERS)
          ? "В этом разделе вы можете просмотреть свою историю заказов"
          : "В этом разделе вы можете изменить свои персональные данные"}
      </p>
    </div>
  );
}
