import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.css';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import { useState, useContext, useReducer, useEffect } from 'react';
import OrderDetails from '../order-details/order-details';
import { dataTypes } from '../../utils/types';
import { IngredientsContext } from '../../services/ingredientsContext';
import { getOrder } from '../../utils/burger-api';

const totalInitialState = { sum: 0 };

function reducer(state, action) {
    switch (action.type) {
        case "set":
            state.sum = 0;
            let bunFlag = false;
            let res = action.ingredients.reduce(function (accumulator, currentValue) {
                if (currentValue.type === "bun") {
                    if (bunFlag) return accumulator;
                    bunFlag = true;
                    return accumulator + currentValue.price * 2;
                }
                return accumulator + currentValue.price;
            }, state.sum);
            return { sum: res };
        case "reset":
            return totalInitialState;
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}

function Constructor() {

    const [isModalVisible, setModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    const [order, setOrder] = useState(true);
    const { ingredientsData } = useContext(IngredientsContext);
    let bun = ingredientsData && ingredientsData.find(item => item.type === "bun");
    const [totalState, totalDispatcher] = useReducer(reducer, totalInitialState);

    function handleOrder() {
        setModalVisible(true);
        let ingredients = ingredientsData.map((item) => (item._id));
        getOrder(setLoading, setError, setOrder, ingredients);
    }

    const modalClose = () => {
        setModalVisible(false);
    }

    useEffect(() => {
        totalDispatcher({ type: "set", ingredients: ingredientsData });
    }, [ingredientsData]);

    return (
        <section className={style.container}>
            <div className={style.main}>
                <div className="ml-8">
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + " (верх)"}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
                <div className={style.ingredients}>
                    {ingredientsData.map((item) => (
                        (item.type !== "bun") &&
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
                        text={bun.name + " (низ)"}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
            </div>
            <div className={style.total}>
                <span className="text text_type_digits-medium">
                    {totalState.sum} <CurrencyIcon />
                </span>
                <Button
                    type="primary"
                    size="large"
                    onClick={handleOrder}
                >
                    Оформить заказ
                </Button>
            </div>
            {isModalVisible &&
                <>
                    <Modal
                        title="Детали ингредиента"
                        close={modalClose}
                        isLoading={isLoading}
                        error={error}
                    >
                        {order && <OrderDetails order={order} />}
                    </Modal>
                </>
            }
        </section>
    );
}

Constructor.propTypes = {
    ingredientsData: PropTypes.arrayOf(dataTypes),
};

export default Constructor;