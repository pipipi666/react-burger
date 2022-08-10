import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import Header from '../app-header/app-header';
import Ingredients from '../burger-ingredients/burger-ingredients';
import Constructor from '../burger-constructor/burger-constructor';

function Main() {
    const [isLoading, setLoading] = useState(true);
    const [ingredientsData, setIngredientsData] = useState([]);
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL)
            .then(response => response.json())
            .then(res => {
                setIngredientsData(res.data);
                setLoading(false);
            })
            .catch(e => console.log(e.message))
    }, []);

    return (
        <div>
            <Header />
            {!isLoading &&
                <main className={style.main}>
                    <Ingredients data={ingredientsData} />
                    <Constructor data={ingredientsData} />
                </main>}
        </div>
    );
}

export default Main;