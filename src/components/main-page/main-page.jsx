import React from 'react';
import style from './style.module.css';
import Header from '../app-header/app-header';
import Ingredients from '../burger-ingredients/burger-ingredients';
import Constructor from '../burger-constructor/burger-constructor';

function Main() {
    return (
        <div>
            <Header />
            <main className={style.main}>
                <Ingredients />
                <Constructor />
            </main>
        </div>
    );
}

export default Main;