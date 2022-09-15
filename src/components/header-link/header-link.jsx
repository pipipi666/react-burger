import style from './style.module.css';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function HeaderLink({ title, route }) {
    return (
        <NavLink exact to={route} className={style.link} activeClassName={style.active} >
            <BurgerIcon type="secondary" />
            <span className={"text text_type_main-default text_color_inactive"}>
                {title}
            </span>
        </NavLink>
    );
}

HeaderLink.propTypes = {
    title: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired
};