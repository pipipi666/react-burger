import style from "./style.module.scss";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { HeaderLink } from "components/header-link/header-link";
import { ROUTES } from "utils/constsRoute";
import logo from "../../image/logo.png";
import { useState } from "react";

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const toggleMenu = () => {
    setMenuActive(!menuActive);
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
            handleClick={toggleMenu}
          >
            <BurgerIcon type="secondary" />
          </HeaderLink>
          <HeaderLink
            title="Лента заказов"
            route={ROUTES.FEED}
            handleClick={toggleMenu}
          >
            <ListIcon type="secondary" />
          </HeaderLink>
        </div>
        <Link to={ROUTES.HOME} className={style.center}>
          <Logo />
        </Link>
        <div className={style.right}>
          <HeaderLink
            title="Личный кабинет"
            route={ROUTES.PROFILE}
            handleClick={toggleMenu}
          >
            <ProfileIcon type="secondary" />
          </HeaderLink>
        </div>
      </div>
    </header>
  );
}
