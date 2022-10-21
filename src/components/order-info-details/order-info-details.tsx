import { OrderIngredient } from "components/order-ingredient/order-ingredient";
import style from "./order-info-details.module.scss";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useMemo } from "react";
import { useAppSelector } from "utils/hooks";
import { IData } from "utils/types";

export const OrderInfoDetails: FC = () => {
  const order = useAppSelector((state) => state.ingredients.currentOrder);
  const ingredients = useAppSelector((state) =>
    JSON.parse(JSON.stringify(state.ingredients.ingredients))
  );
  const orderIngredients = useMemo(
    () =>
      order &&
      ingredients.filter((item: IData) => order.ingredients.includes(item._id)),
    [ingredients, order]
  );
  order &&
    orderIngredients.map(
      (item: IData) =>
        (item.count = order.ingredients.filter((x) => x === item._id).length)
    );

  if (order)
    return (
      <div className={style.container}>
        <p className="text text_type_main-medium mt-10 mb-3">{order.name}</p>
        <div className="text text_type_main-default">
          <div className="text text_type_main-default mb-6">
            {order.status === "done" ? (
              <span className={style.done}>Выполнен</span>
            ) : order.status === "pending" ? (
              "Готовится"
            ) : (
              "Создан"
            )}
          </div>
        </div>
        <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
        <div className={style.images}>
          {orderIngredients.map((item: IData) => (
            <OrderIngredient ingredient={item} key={item._id} />
          ))}
        </div>
        <div className={style.total}>
          <span className="text text_type_main-default text_color_inactive">
            {order.createdAt}
          </span>
          <div className={`text text_type_digits-default ${style.price}`}>
            {order.total}
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    );
  else return <p>Загрузка...</p>;
};
