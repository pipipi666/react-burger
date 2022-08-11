import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.css';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import { useState } from 'react';
import OrderDetails from '../order-details/order-details';
import ModalOverlay from '../modal/modal-overlay';
import { dataTypes } from '../../utils/types';

function Constructor({ data }) {

    const [isModalVisible, setModalVisible] = useState(false);

    function handleOrder() {
        setModalVisible(true);
    }

    const modalClose = () => {
        setModalVisible(false);
    }

    function total() {
        let sum = 0;
        return data.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.price;
        }, sum);
    }

    return (
        <section className={style.container}>
            <div className={style.main}>
                <div className="ml-8">
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={data[0].name + " (верх)"}
                        price={data[0].price}
                        thumbnail={data[0].image}
                    />
                </div>
                <div className={style.ingredients}>
                    {data.map((item, index) => (
                        (index !== 0 && index !== 1) &&
                        <div className={style.list__item} key={item._id}>
                            <DragIcon />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </div>
                    ))}
                </div>
                <div className="ml-8">
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={data[1].name + " (низ)"}
                        price={data[1].price}
                        thumbnail={data[1].image}
                    />
                </div>
            </div>
            <div className={style.total}>
                <span className="text text_type_digits-medium">{total()} <CurrencyIcon /></span>
                <Button type="primary" size="large" onClick={handleOrder}>
                    Оформить заказ
                </Button>
            </div>
            {isModalVisible &&
                <>
                    <ModalOverlay close={modalClose}>
                    </ModalOverlay>
                    <Modal title="Детали ингредиента" close={modalClose}>
                        <OrderDetails />
                    </Modal>
                </>
            }
        </section>
    );
}

Constructor.propTypes = {
    data: PropTypes.arrayOf(dataTypes),
};

export default Constructor;