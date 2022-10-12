import style from './profile.module.scss';
import { useLocation } from 'react-router-dom';
import UserInfo from 'components/user-info/user-info';
import {OrdersList} from 'components/orders-list/orders-list';
import AsideNav from 'components/aside-nav/aside-nav';
import { ROUTES } from 'utils/constsRoute';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { getAccessToken } from 'utils/utils';
import { wsClose } from 'services/slices/ingredientsSlice';
import { OrderInfoPage } from 'pages/orfer-info/order-info';
import { ILocationState } from 'utils/types';

export default function ProfilePage() {
    const {orders} = useAppSelector((state) => state.ingredients)
    const dispatch = useAppDispatch()
    const location = useLocation<ILocationState>();
    useEffect(() => {
        dispatch({type:'WS_CONNECTION_START', payload: `wss://norma.nomoreparties.space/orders?token=${getAccessToken()}`})
        return dispatch(wsClose())
    }, [dispatch]);

    if ((location.pathname !== ROUTES.PROFILE) && (location.pathname !== ROUTES.ORDERS) && (location.state?.from !== ROUTES.ORDERS)) {
        return < OrderInfoPage />
    }

    return (
        <main className={style.wrapper}>
            <AsideNav />
            <section className={style.info}>
                {location.pathname === ROUTES.PROFILE ?
                    <UserInfo /> :
                    <div className={style.list}>
                        <OrdersList orders={orders} />
                    </div>}
            </section>
        </main>
    );
}
