import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.css';
import Modal from '../modal/modal';
import { useState, useReducer, useEffect, useMemo } from 'react';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../services/actions/index.js';
import { useDrop } from "react-dnd";
import {
    ADD_INGREDIENT_CONSTRUCTOR,
    DELETE_INGREDIENT_CONSTRUCTOR,
} from '../../services/actions/index.js';
import ConstructorElementWrapper from '../constructor-element/constructor-element-wrapper';

const totalInitialState = { sum: 0 };

function reducer(state, action) {
    switch (action.type) {
        case "set":
            state.sum = 0;
            let bunFlag = false;
            const res = action.ingredients.reduce(function (accumulator, currentValue) {
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

function BurgerConstructor() {
    const dispatch = useDispatch();
    const { constructorIngredients } = useSelector(state => state.constructorIngredients);
    const ingredients = useMemo(() => constructorIngredients.filter(item => item.type !== "bun"), [constructorIngredients]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [totalState, totalDispatcher] = useReducer(reducer, totalInitialState);
    const bun = useMemo(() =>
        constructorIngredients && constructorIngredients.find(item => item.type === "bun"
        ), [constructorIngredients]);

    function handleOrder() {
        setModalVisible(true);
        const ingredients = constructorIngredients.map((item) => (item._id));
        dispatch(getOrder(ingredients));
    }

    const handleClose = () => {
        setModalVisible(false);
    }

    const handleRemove = item => {
        dispatch({
            type: DELETE_INGREDIENT_CONSTRUCTOR,
            item,
        });
    }

    const [{ isHover }, dropTarget] = useDrop({
        accept: "ingredient",
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            if (item.type === "bun" && bun) {
                handleRemove(bun);
            }
            dispatch({
                type: ADD_INGREDIENT_CONSTRUCTOR,
                item,
            });
        },
    });

    const targetClassName = `${style.container} ${isHover ? style.drop : ''}`;

    useEffect(() => {
        totalDispatcher({ type: "set", ingredients: constructorIngredients });
    }, [constructorIngredients]);

    if (constructorIngredients.length === 0) {
        return (
            <section ref={dropTarget} className={targetClassName}>
                <h1>Перетащите ингредиенты сюда</h1>
            </section>
        )
    }

    return (
        <section ref={dropTarget} className={targetClassName}>
            <div className={style.main}>
                {bun &&
                    <div className="ml-8">
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bun.name + " (верх)"}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>}
                <div className={style.ingredients}>
                    {ingredients.map((item) =>
                        <ConstructorElementWrapper key={item.dropId} item={item} />)}
                </div>
                {bun &&
                    <div className="ml-8">
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bun.name + " (низ)"}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>
                }
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
                <Modal
                    title=""
                    close={handleClose}
                >
                    <OrderDetails />
                </Modal>
            }
        </section>
    );
}

export default BurgerConstructor;