import {
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./style.module.scss";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useDrop } from "react-dnd";
import { useHistory } from "react-router-dom";
import { isAuth } from "utils/utils";
import Modal from "components/modal/modal";
import ConstructorElementWrapper from "components/constructor-element/constructor-element-wrapper";
import OrderDetails from "components/order-details/order-details";
import { ROUTES } from "utils/constsRoute";
import {
  addIngredient,
  deleteIngredient,
  fetchOrder,
  setIngredients,
  total,
} from "services/slices/ingredientsSlice";
import { IData } from "utils/types";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import { Button } from "utils/libComponentsWithTypes";

export default function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const auth = isAuth();
  const history = useHistory();
  const [isModalVisible, setModalVisible] = useState(false);
  const { constructorIngredients, sum } = useAppSelector(
    (state) => state.ingredients
  );
  const ingredients = useMemo(
    () =>
      constructorIngredients &&
      constructorIngredients.filter((item) => item.type !== "bun"),
    [constructorIngredients]
  );
  const bun = useMemo(
    () =>
      constructorIngredients &&
      constructorIngredients.find((item) => item.type === "bun"),
    [constructorIngredients]
  );

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: IData) {
      if (item.type === "bun" && bun) {
        dispatch(deleteIngredient(bun));
      }
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  const targetClassName = `${style.container} ${
    isHover && !constructorIngredients.length && style.drop
  }`;

  const handleOrder = useCallback(() => {
    if (auth) {
      setModalVisible(true);
      const ingredients = constructorIngredients.map((item) => item._id);
      dispatch(fetchOrder(ingredients));
    } else history.push(ROUTES.LOGIN);
  }, [auth, history, constructorIngredients, dispatch]);

  const handleClose = () => {
    setModalVisible(false);
    dispatch(setIngredients([]));
  };

  useEffect(() => {
    dispatch(total());
  }, [constructorIngredients, dispatch]);

  if (!constructorIngredients.length) {
    return (
      <section
        data-cy="constructor"
        ref={dropTarget}
        className={targetClassName}
      >
        <h1>Перетащите ингредиенты сюда</h1>
      </section>
    );
  }

  return (
    <section data-cy="constructor" ref={dropTarget} className={targetClassName}>
      <div className={style.main}>
        {bun && (
          <div className={style.bun}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + " (верх)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
        <div className={style.ingredients}>
          {ingredients.map((item: IData) => (
            <ConstructorElementWrapper key={item.dropId} item={item} />
          ))}
        </div>
        {bun && (
          <div className={style.bun}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + " (низ)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
      </div>
      <div className={style.total}>
        <span className="text text_type_digits-medium">
          {sum} <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large" onClick={handleOrder}>
          Оформить заказ
        </Button>
      </div>
      {isModalVisible && (
        <Modal title="" close={handleClose}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}
