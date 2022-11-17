import style from "./style.module.scss";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import HeaderLink from "components/header-link/header-link";
import { ROUTES } from "utils/constsRoute";
import logo from "assets/image/logo.svg";
import { useState } from "react";
import { useAppDispatch } from "utils/hooks";
import { fetchLogout } from "services/slices/authSlice";
import { isAuth } from "utils/utils";

export default function Header() {
  const dispatch = useAppDispatch();
  const [menuActive, setMenuActive] = useState(false);
  const [subMenuActive, setSubMenuActive] = useState(false);
  const auth = isAuth();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const closeMenu = () => {
    setMenuActive(false);
  };

  const toggleSubMenu = () => {
    setSubMenuActive(!subMenuActive);
  };

  const handleLogOutClick = () => {
    dispatch(fetchLogout());
    closeMenu();
  };

  return (
    <header data-testid="header" className={style.header}>
      <Link to={ROUTES.HOME} className={style.logo}>
        <img className={style.logo__img} src={logo} alt="logo" />
      </Link>
      <div
        className={`${style.burger} ${
          menuActive && style.burger__active__icon
        }`}
        onClick={toggleMenu}
      >
        <span></span>
      </div>
      <div className={`${style.main} ${menuActive && style.burger__active}`}>
        <h1 className="text text_type_main-medium mt-4 mb-4">Меню</h1>
        <div className={style.left}>
          <HeaderLink
            title="Конструктор"
            route={ROUTES.HOME}
            handleClick={closeMenu}
          >
            <BurgerIcon type="secondary" />
          </HeaderLink>
          <HeaderLink
            title="Лента заказов"
            route={ROUTES.FEED}
            handleClick={closeMenu}
          >
            <ListIcon type="secondary" />
          </HeaderLink>
        </div>
        <Link to={ROUTES.HOME} className={style.center}>
          <Logo />
        </Link>
        <div className={style.right}>
          <div className={style.profile} onClick={toggleSubMenu}>
            <HeaderLink
              title="Личный кабинет"
              route={ROUTES.PROFILE}
              handleClick={closeMenu}
            >
              <ProfileIcon type="secondary" />
            </HeaderLink>
            {auth && (
              <div
                className={`${style.submenu} ${
                  subMenuActive ? style.submenu__opened : style.submenu__closed
                }`}
              ></div>
            )}
          </div>
          {subMenuActive && auth && (
            <ul className={style.profile__menu}>
              <li className={style.li}>
                <HeaderLink
                  title="Профиль"
                  route={ROUTES.PROFILE}
                  handleClick={closeMenu}
                />
              </li>
              <li className={style.li}>
                <HeaderLink
                  title="История заказов"
                  route={ROUTES.ORDERS}
                  handleClick={closeMenu}
                />
              </li>
              <li className={style.li}>
                <HeaderLink
                  title="Выход"
                  route={ROUTES.LOGIN}
                  handleClick={handleLogOutClick}
                />
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
