import style from './style.module.scss';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function HeaderLink({ title, route, children }) {
    return (
        <NavLink exact to={route} className={style.link} activeClassName={style.active} >
            {children}
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