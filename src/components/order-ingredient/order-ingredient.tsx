import style from './style.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderIngredient = () => {

    return (
        <div className={style.container}>
            <div className={style.img}></div>
            <span className={`text text_type_main-default ${style.name}`}>Соус традиционный галактический</span>
            <div className={style.price}>
                <span className={`text text_type_digits-default`}>1 x 300</span>
                <CurrencyIcon type='primary' />
            </div>
        </div >
    );
}
