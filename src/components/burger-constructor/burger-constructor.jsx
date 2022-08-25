import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.css';
import Modal from '../modal/modal';
import { useState, useEffect, useMemo } from 'react';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import {
    getOrder,
    getTotal,
    addIngredientConstructor,
    getIngredientsConstructor,
    deleteIngredientConstructor
} from '../../services/actions/index.js';
import { useDrop } from "react-dnd";
import ConstructorElementWrapper from '../constructor-element/constructor-element-wrapper';

function BurgerConstructor() {
    const dispatch = useDispatch();
    const { constructorIngredients } = useSelector(state => state.constructorIngredients);
    const { sum } = useSelector(state => state.total);
    const ingredients = useMemo(() => constructorIngredients.filter(item => item.type !== "bun"), [constructorIngredients]);
    const [isModalVisible, setModalVisible] = useState(false);
    const bun = useMemo(() =>
        constructorIngredients && constructorIngredients.find(item => item.type === "bun"
        ), [constructorIngredients]);

    function handleOrder() {
        setModalVisible(true);
        const ingredients = constructorIngredients.map((item) => (item._id));
        dispatch(getOrder(ingredients))
    }

    const handleClose = () => {
        setModalVisible(false);
        dispatch(getIngredientsConstructor([]))
    }

    const handleRemove = item => dispatch(deleteIngredientConstructor(item));

    const [{ isHover }, dropTarget] = useDrop({
        accept: "ingredient",
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            if (item.type === "bun" && bun) {
                handleRemove(bun);
            }
            dispatch(addIngredientConstructor(item));
        },
    });

    const targetClassName = `${style.container} ${isHover ? style.drop : ''}`;

    useEffect(() => {
        dispatch(getTotal(constructorIngredients));
    }, [dispatch, constructorIngredients]);

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
                    {sum} <CurrencyIcon />
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