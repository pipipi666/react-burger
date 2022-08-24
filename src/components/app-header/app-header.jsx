import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.css';

function Header() {
    return (
        <header className={style.nav}>
            <div className={style.main}>
                <div className={style.left} >
                    <a href='#' className={style.nav__item}>
                        <BurgerIcon type="secondary" />
                        <span className={`text text_type_main-default text_color_inactive`}>
                            Конструктор
                        </span>
                    </a>
                    <a href='#' className={style.nav__item}>
                        <ListIcon type="secondary" />
                        <span className="text text_type_main-default text_color_inactive">
                            Лента заказов
                        </span>
                    </a>
                </div>
                <a href='#' className={style.center}>
                    <Logo className={style.logo} />
                </a>
                <div className={style.right}>
                    <a href='#' className={style.nav__item}>
                        <ProfileIcon type="secondary" />
                        <span className="text text_type_main-default text_color_inactive">
                            Личный кабинет
                        </span>
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;