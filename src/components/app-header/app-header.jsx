import style from './style.module.scss';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import HeaderLink from 'components/header-link/header-link';
import { ROUTES } from 'utils/constsRoute';

export default function Header() {
    return (
        <header className={style.header}>
            <div className={style.main}>
                <div className={style.left} >
                    <HeaderLink title="Конструктор" route={ROUTES.HOME}>
                        <BurgerIcon type="secondary" />
                    </HeaderLink>
                    <HeaderLink title="Лента заказов" route={ROUTES.FEED}>
                        <ListIcon type="secondary" />
                    </HeaderLink>
                </div>
                <Link to={ROUTES.HOME} className={style.center}>
                    <Logo className={style.logo} />
                </Link>
                <div className={style.right}>
                    <HeaderLink title="Личный кабинет" route={ROUTES.PROFILE}>
                        <ProfileIcon type="secondary" />
                    </HeaderLink>
                </div>
            </div>
        </header>
    );
}
