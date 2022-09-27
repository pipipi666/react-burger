import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.scss';
import PropTypes from 'prop-types';
import { FC } from 'react';

interface IProps {
    order: {
        id: string;
        time: string;
        name: string;
        status: string;
        price: number;
    };
    key: string;
}

export const OrderCard: FC<IProps> = ({ order }) => {

    return (
        <div className={style.container}>
            <div className={style.title}>
                <span className="text text_type_digits-default">{order.id}</span>
                <span className="text text_type_main-default text_color_inactive">
                    {order.time}
                </span>
            </div>
            <p className="text text_type_main-medium mt-6 mb-2">
                {order.name}
            </p>
            <div className="text text_type_main-default mb-6">
                {order.status}
            </div>
            <div className={style.pics}>
                <span>Картинки</span>
                <span className={style.price}>
                    <span className="text text_type_digits-default">
                        {order.price}
                    </span>
                    <CurrencyIcon type='primary'/>
                </span>
            </div>
        </div>
    );
}

OrderCard.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired
};