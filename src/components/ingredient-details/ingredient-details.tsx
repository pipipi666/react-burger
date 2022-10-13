import style from "./style.module.scss";
import { useMemo } from "react";
import { useAppSelector } from "utils/hooks";

export default function IngredientDetails() {
  const { currentIngredient } = useAppSelector((state) => state.ingredients);
  const stats = useMemo(
    () => [
      {
        name: "Калории, ккал",
        value: currentIngredient?.calories,
      },
      {
        name: "Белки, г",
        value: currentIngredient?.proteins,
      },
      {
        name: "Жиры, г",
        value: currentIngredient?.fat,
      },
      {
        name: "Углеводы, г",
        value: currentIngredient?.carbohydrates,
      },
    ],
    [currentIngredient]
  );

  return (
    <div className={style.content}>
      <img
        src={currentIngredient?.image_large}
        alt={currentIngredient?.name}
        className={style.img}
      />
      <p className="text text_type_main-medium mt-4 mb-8">
        {currentIngredient?.name}
      </p>
      <ul className={style.energy}>
        {stats.map((stat, index) => (
          <li className={style.energy__prop} key={index}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              {stat.name}
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {stat.value}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
