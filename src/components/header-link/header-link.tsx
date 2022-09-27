import style from './style.module.scss';
import { NavLink } from 'react-router-dom';
import {FC, ReactNode} from 'react';

interface IProps {
    title: string;
    route: string;
    children: ReactNode;
}

export const HeaderLink: FC<IProps> = ({ title, route, children }) => {
    return (
        <NavLink exact to={route} className={style.link} activeClassName={style.active} >
            {children}
            <span className={"text text_type_main-default text_color_inactive"}>
                {title}
            </span>
        </NavLink>
    );
}
