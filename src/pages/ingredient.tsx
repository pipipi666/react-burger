import style from './ingredient.module.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import IngredientDetails from 'components/ingredient-details/ingredient-details';
import { fetchIngredients, getCurrentIngredient } from 'services/slices/ingredientsSlice';
import { IData } from 'utils/types';

export default function IngredientPage() {

    const dispatch = useDispatch<any>();
    const { id } = useParams<{ id: string }>();
    const { currentIngredient } = useSelector((state: any) => state.ingredients);
    const { ingredients } = useSelector((state: any) => state.ingredients);

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    useEffect(() => {
        if (!currentIngredient._id && ingredients.length > 0) {
            const tmp = ingredients.find((item: IData) => item._id === id)
            dispatch(getCurrentIngredient(tmp))
        }
    }, [dispatch, currentIngredient, ingredients, id]);

    return (
        <>
            <h1 className="text text_type_main-large mt-30">
                Детали ингредиента
            </h1>
            <main className={style.main}>
                {currentIngredient && currentIngredient._id && <IngredientDetails />}
            </main>
        </>
    )
}