import style from './ingredient.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { getCurrentIngredient, getIngredients } from 'services/actions';
import IngredientDetails from 'components/ingredient-details/ingredient-details';

export default function IngredientPage() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const { currentIngredient } = useSelector(state => state.currentIngredient);
    const { ingredients } = useSelector(state => state.ingredients);

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    useEffect(() => {
        if (!currentIngredient._id && ingredients.length > 0) {
            const tmp = ingredients.find(item => item._id === id)
            dispatch(getCurrentIngredient(tmp))
        }
    }, [dispatch, currentIngredient, ingredients, id]);

    return (
        <main className={style.main}>
            {currentIngredient && currentIngredient._id && <IngredientDetails />}
        </main>
    )
}
