import style from "./style.module.scss";
import { IngredientCard } from "components/ingredient-card/ingredient-card";
import { IData } from "utils/types";
import { FC } from "react";

interface IProps {
  title: string;
  ingredients: Array<IData>;
  handleClick: (currentId: string) => void;
}

export const IngredientsCategory: FC<IProps> = ({
  title,
  ingredients,
  handleClick,
}) => {
  return (
    <>
      <h2 className="text text_type_main-medium mt-10 mb-6 ml-2">{title}</h2>
      <div className={style.list}>
        {ingredients.map((item) => (
          <IngredientCard
            item={item}
            key={item._id}
            handleClick={handleClick}
          />
        ))}
      </div>
    </>
  );
};
