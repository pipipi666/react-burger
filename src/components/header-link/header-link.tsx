import style from "./style.module.scss";
import { NavLink } from "react-router-dom";
import { ReactNode } from "react";

interface IProps {
  title: string;
  route: string;
  children?: ReactNode;
  handleClick: () => void;
}

export default function HeaderLink({
  title,
  route,
  handleClick,
  children,
}: IProps) {
  return (
    <NavLink
      exact
      to={route}
      className={style.link}
      activeClassName={style.active}
      onClick={handleClick}
    >
      {children}
      <span className={"text text_type_main-default text_color_inactive"}>
        {title}
      </span>
    </NavLink>
  );
}
