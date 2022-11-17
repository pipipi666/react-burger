import style from "./style.module.scss";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IData } from "utils/types";

interface IProps {
  ingredient: IData;
}

export default function OrderIngredient({ ingredient }: IProps) {
  return (
    <div className={style.container}>
      <div className={style.img}>
        <img src={ingredient.image} alt={ingredient.name} />
      </div>
      <span className={`text text_type_main-default ${style.name}`}>
        {ingredient.name}
      </span>
      <div className={style.price}>
        <span className={`text text_type_digits-default ${style.number}`}>
          {ingredient.count} x {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
}
