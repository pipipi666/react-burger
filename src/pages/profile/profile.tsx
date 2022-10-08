import style from './profile.module.scss';
import { useLocation } from 'react-router-dom';
import UserInfo from 'components/user-info/user-info';
import OrdersList from 'components/orders-list/orders-list';
import AsideNav from 'components/aside-nav/aside-nav';
import { ROUTES } from 'utils/constsRoute';

export default function ProfilePage() {

    const location = useLocation();

    return (
        <main className={style.wrapper}>
            <AsideNav />
            <section className={style.info}>
                {location.pathname === ROUTES.ORDERS ?
                    <div className={style.list}>
                        <OrdersList />
                    </div>
                    : <UserInfo />}
            </section>
        </main>
    );
}
