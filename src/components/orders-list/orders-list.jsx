import style from './style.module.css';
import OrderCard from 'components/order-card/order-card';

export default function OrdersList() {

    const orders = [
        {
            id: '#034535',
            time: ' Сегодня, 16:20 i-GMT+3',
            name: 'Death Star Starship Main бургер',
            status: 'Создан',
            price: 480
        },
        {
            id: '#0335',
            time: ' Сегодня, 16:20 i-GMT+3',
            name: 'Death Star Starship Main бургер',
            status: 'Создан',
            price: 11111
        },
        {
            id: '#034444535',
            time: ' Сегодня, 16:20 i-GMT+3',
            name: 'Death Star Starship Main бургер',
            status: 'Создан',
            price: 4123
        },
        {
            id: '#0341535',
            time: ' Сегодня, 16:20 i-GMT+3',
            name: 'Death Star Starship Main бургер',
            status: 'Создан',
            price: 4451
        },
        {
            id: '#03453123123125',
            time: ' Сегодня, 16:20 i-GMT+3',
            name: 'Death Star Starship Main бургер',
            status: 'Создан',
            price: 486
        }
    ]

    return (
        <section className={style.wrapper}>
            {orders.map((order) => <OrderCard order={order} key={order.id} />)}
        </section >
    );
}
