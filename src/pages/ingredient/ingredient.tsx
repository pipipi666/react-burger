import style from "./ingredient.module.scss";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import IngredientDetails from "components/ingredient-details/ingredient-details";
import {
  fetchIngredients,
  getCurrentIngredient,
} from "services/slices/ingredientsSlice";
import { IData } from "utils/types";
import { useAppDispatch, useAppSelector } from "utils/hooks";

export default function IngredientPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { ingredients, currentIngredient } = useAppSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (!currentIngredient && ingredients.length > 0) {
      const tmp = ingredients.find((item: IData) => item._id === id);
      dispatch(getCurrentIngredient(tmp));
    }
  }, [dispatch, currentIngredient, ingredients, id]);

  return (
    <>
      <h1 className={`text text_type_main-large mt-30 ${style.h1}`}>
        Детали ингредиента
      </h1>
      {currentIngredient && <IngredientDetails />}
    </>
  );
}
