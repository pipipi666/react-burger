import React, { useState } from 'react';
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.css';
import { arr } from '../../utils/data';
import PropTypes from 'prop-types';

function Ingredients() {
    const [current, setCurrent] = useState('buns')
    let sauces = arr.filter(item => item.type === "sauce");
    let ingredients = arr.filter(item => item.type === "main");
    let buns = arr.filter(item => item.type === "bun");
    return (
        <div className={style.container}>
            <h1 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </h1>
            <nav className={style.nav}>
                <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>Булки</Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="ingredients" active={current === 'ingredients'} onClick={setCurrent}>Начинки</Tab>
            </nav>
            <main className={style.ingredients}>
                <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
                <section className={style.list}>
                    {buns.map((item) => (
                        <div className={style.list__item} key={item._id}>
                            <div className={style.cntr}><Counter count={1} size="default" /></div>
                            <img src={item.image} className={style.img} alt={item.name}></img>
                            <p className={`text text_type_main-default ${style.price}`}><span className='text text_type_digits-default'>{item.price}</span><CurrencyIcon /></p>
                            <p className={`text text_type_main-default ${style.item__title}`}>
                                {item.name}
                            </p>
                        </div>
                    ))}
                </section>
                <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
                <section className={style.list}>
                    {sauces.map((item) => (
                        <div className={style.list__item} key={item._id}>
                            <div className={style.cntr}><Counter count={1} size="default" /></div>
                            <img src={item.image} className={style.img} alt={item.name}></img>
                            <p className={`text text_type_main-default ${style.price}`}><span className='text text_type_digits-default'>{item.price}</span><CurrencyIcon /></p>
                            <p className={`text text_type_main-default ${style.item__title}`}>
                                {item.name}
                            </p>
                        </div>
                    ))}
                </section>
                <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
                <section className={style.list}>
                    {ingredients.map((item) => (
                        <div className={style.list__item} key={item._id}>
                            <div className={style.cntr}><Counter count={1} size="default" /></div>
                            <img src={item.image} className={style.img} alt={item.name}></img>
                            <p className={`text text_type_main-default ${style.price}`}><span className='text text_type_digits-default'>{item.price}</span><CurrencyIcon /></p>
                            <p className={`text text_type_main-default ${style.item__title}`}>
                                {item.name}
                            </p>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}

Ingredients.propTypes = {
    price: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.oneOf(['bun', 'sauce', 'main'])
};

export default Ingredients;