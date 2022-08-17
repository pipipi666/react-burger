import { useEffect, useState } from 'react';
import style from './style.module.css';
import Header from '../app-header/app-header';
import Ingredients from '../burger-ingredients/burger-ingredients';
import Constructor from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../utils/burger-api';
import { IngredientsContext } from '../../services/ingredientsContext';

function Main() {
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    const [ingredientsData, setIngredientsData] = useState([]);

    useEffect(() => {
        getIngredients(setLoading, setIngredientsData, setError);
    }, []);


    if (isLoading) {
        return (
            <p className="text text_type_main-large mt-10">
                Загрузка...
            </p>
        );
    }

    return (
        <>
            <Header />
            {error ?
                <p className="text text_type_main-large mt-10">
                    Ошибка во время выполнения запроса</p>
                : <main className={style.main}>
                    <Ingredients data={ingredientsData} />
                    <IngredientsContext.Provider
                        value={{ ingredientsData, setIngredientsData }}
                    >
                        <Constructor />
                    </IngredientsContext.Provider>
                </main>}
        </>
    );
}

export default Main;