import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./style.module.scss";
import { ROUTES } from "../../utils/constsRoute";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "utils/hooks";
import { TOrder } from "utils/types";
import { useMemo } from "react";

interface IProps {
  order: TOrder;
  handleClick: (currentId: string) => void;
}

export default function OrderCard({ order, handleClick }: IProps) {
  const location = useLocation();
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const orderIngredients = useMemo(
    () => ingredients.filter((item) => order.ingredients.includes(item._id)),
    [ingredients, order.ingredients]
  );

  return (
    <div className={style.container} onClick={() => handleClick(order._id)}>
      <Link
        className={style.link}
        to={{
          pathname:
            location.pathname === ROUTES.FEED
              ? `/feed/${order._id}`
              : `/profile/orders/${order._id}`,
          state: { from: location.pathname },
        }}
      >
        <div className={style.title}>
          <span className="text text_type_digits-default">#{order.number}</span>
          <span className="text text_type_main-default text_color_inactive">
            {order.createdAt}
          </span>
        </div>
        <p className="text text_type_main-medium mt-6 mb-2">{order.name}</p>
        {location.pathname.includes(ROUTES.ORDERS) &&
          (order.status === "done" ? (
            <div className="text text_type_main-default mb-6">
              <span className={style.done}>Выполнен</span>
            </div>
          ) : (
            <div className="text text_type_main-default mb-6">
              {order.status === "pending" ? "Готовится" : "Создан"}
            </div>
          ))}
        <div className={style.pics}>
          <div className={style.img}>
            {orderIngredients.map(
              (ingredient, index) =>
                index <= 5 && (
                  <div className={style.img__wrapper} key={index}>
                    <img src={ingredient.image} alt={ingredient.name} />
                    {index === 5 && (
                      <div className={style.count}>
                        <div className="text text_type_digits-default">
                          +{orderIngredients.length - 5}
                        </div>
                      </div>
                    )}
                  </div>
                )
            )}
          </div>
          <span className={style.price}>
            <span className="text text_type_digits-default">{order.total}</span>
            <CurrencyIcon type="primary" />
          </span>
        </div>
      </Link>
    </div>
  );
}
