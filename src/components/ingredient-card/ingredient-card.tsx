import style from "./style.module.scss";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDrag } from "react-dnd";
import { FC, useMemo } from "react";
import { IData } from "utils/types";
import { ROUTES } from "../../utils/constsRoute";
import { useAppSelector } from "utils/hooks";

interface IProps {
  item: IData;
  handleClick: (currentId: string) => void;
}

export const IngredientCard: FC<IProps> = ({ item, handleClick }) => {
  const { constructorIngredients } = useAppSelector(
    (state) => state.ingredients
  );

  const counter = useMemo(
    () =>
      constructorIngredients &&
      constructorIngredients.filter((ingredient) => ingredient._id === item._id)
        .length,
    [constructorIngredients, item]
  );

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: item,
  });

  return (
    <div
      className={style.list__item}
      onClick={() => handleClick(item._id)}
      ref={dragRef}
    >
      <Link
        className={style.link}
        to={{
          pathname: `/ingredients/${item._id}`,
          state: { from: ROUTES.HOME },
        }}
      >
        <div className={style.cntr}>
          {counter > 0 && <Counter count={counter} size="default" />}
        </div>
        <img src={item.image} className={style.img} alt={item.name} />
        <p className={`text ${style.price}`}>
          <span className="text text_type_digits-default">{item.price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className={"text text_type_main-default"}>{item.name}</p>
      </Link>
    </div>
  );
};
