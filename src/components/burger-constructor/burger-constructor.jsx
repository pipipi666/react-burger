import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.css';
import { useState, useEffect, useMemo } from 'react';
import { useDrop } from "react-dnd";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isAuth } from 'utils/utils';
import Modal from 'components/modal/modal';
import ConstructorElementWrapper from 'components/constructor-element/constructor-element-wrapper';
import OrderDetails from 'components/order-details/order-details';
import { ROUTES } from 'utils/constsRoute';
import { addIngredient, deleteIngredient, fetchOrder, setIngredients, total } from 'services/slices/ingredientsSlice';

export default function BurgerConstructor() {

    const dispatch = useDispatch();
    const { constructorIngredients } = useSelector(state => state.ingredients);
    const { sum } = useSelector(state => state.ingredients);
    const auth = isAuth();
    const history = useHistory();
    const [isModalVisible, setModalVisible] = useState(false);

    const ingredients = useMemo(() =>
        constructorIngredients &&
        constructorIngredients.filter(item => item.type !== "bun"
        ), [constructorIngredients]);

    const bun = useMemo(() =>
        constructorIngredients &&
        constructorIngredients.find(
            item => item.type === "bun"
        ), [constructorIngredients]);

    useEffect(() => {
        dispatch(total(constructorIngredients));
    }, [constructorIngredients, dispatch]);

    const [{ isHover }, dropTarget] = useDrop({
        accept: "ingredient",
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            if (item.type === "bun" && bun) {
                handleRemove(bun);
            }
            dispatch(addIngredient(item));
        },
    });

    function handleOrder() {
        if (auth) {
            setModalVisible(true);
            const ingredients = constructorIngredients.map((item) => (item._id));
            dispatch(fetchOrder(ingredients))
        }
        else history.push(ROUTES.LOGIN)
    }

    const handleClose = () => {
        setModalVisible(false);
        dispatch(setIngredients([]));
    }

    const handleRemove = item => dispatch(deleteIngredient(item));

    const targetClassName = `${style.container} ${isHover ? style.drop : ''}`;

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
