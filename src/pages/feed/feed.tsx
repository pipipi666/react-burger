import OrdersList from 'components/orders-list/orders-list';
import FeedInfo from 'components/feed-info/feed-info';
import style from './feed.module.scss';

export default function FeedPage() {
    return (
        <div className={style.wrapper}>
            <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
            <main className={style.main}>
                <div className={style.list}>
                    <OrdersList />
                </div>
                <div className={style.stats}>
                    <FeedInfo />
                </div>
            </main>
        </div>
    )
}
