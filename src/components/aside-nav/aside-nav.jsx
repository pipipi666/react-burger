import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from 'utils/constsRoute';
import { logout } from 'services/actions/auth';
import { useDispatch } from 'react-redux';
import style from './style.module.css';

export default function AsideNav() {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const classLink = `text text_type_main-medium text_color_inactive ${style.link}`;
    const classLinkActive = `text text_type_main-medium ${style.active}`;

    const handleLogOutClick = e => {
        dispatch(logout());
        history.replace(ROUTES.LOGIN);
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
                    <button className={classLink} onClick={handleLogOutClick}>
                        Выход
                    </button>
                </li>
            </ul>
            <p className="text text_type_main-default text_color_inactive mt-20">
                {location.pathname === ROUTES.ORDERS ?
                    'В этом разделе вы можете просмотреть свою историю заказов'
                    : 'В этом разделе вы можете изменить свои персональные данные'
                }
            </p>
        </div>
    );
}
