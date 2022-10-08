import { OrderIngredient } from 'components/order-ingredient/order-ingredient';
import style from './order-info.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderInfoPage = () => {

    return (
        <div className={style.container}>
            <p className={`text text_type_digits-default ${style.title}`}>#034533</p>
            <p className="text text_type_main-medium mt-10 mb-3">Black Hole Singularity острый бургер</p>
            <p className="text text_type_main-default">Выполнен</p>
            <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
            <OrderIngredient />
            <div className={style.total}>
                <span className="text text_type_main-default text_color_inactive">Вчера, 13:50 i-GMT+3</span>
                <div className={`text text_type_digits-default ${style.price}`}>510<CurrencyIcon type='primary'/></div>
            </div>
        </div >
    );
}
