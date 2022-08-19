import React from 'react';
import style from './style.module.css';
import PropTypes from 'prop-types';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderDetails({ order }) {

    return (
        <div className={style.content}>
            <p className="text text_type_digits-large mt-4 mb-8">
                {order}
            </p>
            <p className="text text_type_main-medium">
                идентификатор заказа
            </p>
            <div className={style.done__img}>
                <CheckMarkIcon />
            </div>
            <p className="text text_type_main-default">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive mt-2 mb-20">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
}

OrderDetails.propTypes = {
    order: PropTypes.number.isRequired,
};

export default OrderDetails;