import style from "./style.module.scss";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDrag } from "react-dnd";
import { useMemo } from "react";
import { IData } from "utils/types";
import { ROUTES } from "../../utils/constsRoute";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import { Button } from "utils/libComponentsWithTypes";
import {
  addIngredient,
  deleteIngredient,
} from "services/slices/ingredientsSlice";

interface IProps {
  item: IData;
  handleClick: (currentId: string) => void;
}

export default function IngredientCard({ item, handleClick }: IProps) {
  const dispatch = useAppDispatch();
  const { constructorIngredients } = useAppSelector(
    (state) => state.ingredients
  );
  const bun = useMemo(
    () =>
      constructorIngredients &&
      constructorIngredients.find((item) => item.type === "bun"),
    [constructorIngredients]
  );
  const counter = useMemo(
    () =>
      constructorIngredients &&
      constructorIngredients.filter((ingredient) => ingredient._id === item._id)
        .length,
    [constructorIngredients, item]
  );

  const addItem = (item: IData) => {
    if (item.type === "bun" && bun) {
      dispatch(deleteIngredient(bun));
    }
    dispatch(addIngredient(item));
  };

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: item,
  });

  return (
    <div className={style.list__item} ref={dragRef}>
      <Link
        className={style.link}
        to={{
          pathname: `/ingredients/${item._id}`,
          state: { from: ROUTES.HOME },
        }}
        onClick={() => handleClick(item._id)}
      >
        <div className={style.cntr}>
          {counter > 0 && <Counter count={counter} size="default" />}
        </div>
        <img src={item.image} className={style.img} alt={item.name} />
        <p className={`text ${style.price}`}>
          <span className="text text_type_digits-default">{item.price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className={`text text_type_main-default ${style.name}`}>
          {item.name}
        </p>
      </Link>
      <div className={style.add}>
        <Button type="secondary" onClick={() => addItem(item)}>
          Добавить
        </Button>
      </div>
    </div>
  );
}
