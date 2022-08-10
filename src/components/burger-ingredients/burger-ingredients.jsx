import React, { useEffect, useState } from 'react';
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.css';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import ModalOverlay from '../modal/modal-overlay';
import IngredientDetails from '../ingredient-details/ingredient-details';

function Ingredients({ data }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [current, setCurrent] = useState('buns');
    const [targetIngredient, setTargetIngredient] = useState();
    let sauces = data.filter(item => item.type === "sauce");
    let ingredients = data.filter(item => item.type === "main");
    let buns = data.filter(item => item.type === "bun");

    const handleClick = (id) => {
        setTargetIngredient(data.find(item => item._id === id));
        setModalVisible(true);
    }

    const modalClose = () => {
        setModalVisible(false);
    }

    useEffect(() => {
        const modalEsc = (e) => {
            if (e.keyCode === 27 && isModalVisible === true) {
                setModalVisible(false);
            }
        }
        window.addEventListener('keydown', modalEsc)
        return () => window.removeEventListener('keydown', modalEsc)
    }, [])

    return (
        <section className={style.container}>
            <h1 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </h1>
            <nav className={style.nav}>
                <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>Булки</Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="ingredients" active={current === 'ingredients'} onClick={setCurrent}>Начинки</Tab>
            </nav>
            <div className={style.ingredients}>
                <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
                <div className={style.list}>
                    {buns.map((item) => (
                        <div className={style.list__item} key={item._id} onClick={() => handleClick(item._id)}>
                            <div className={style.cntr}><Counter count={1} size="default" /></div>
                            <img src={item.image} className={style.img} alt={item.name}></img>
                            <p className={`text text_type_main-default ${style.price}`}><span className='text text_type_digits-default'>{item.price}</span><CurrencyIcon /></p>
                            <p className={`text text_type_main-default ${style.item__title}`}>
                                {item.name}
                            </p>
                        </div>
                    ))}
                </div>
                <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
                <div className={style.list}>
                    {sauces.map((item) => (
                        <div className={style.list__item} key={item._id} onClick={() => handleClick(item._id)}>
                            <div className={style.cntr}><Counter count={1} size="default" /></div>
                            <img src={item.image} className={style.img} alt={item.name}></img>
                            <p className={`text text_type_main-default ${style.price}`}><span className='text text_type_digits-default'>{item.price}</span><CurrencyIcon /></p>
                            <p className={`text text_type_main-default ${style.item__title}`}>
                                {item.name}
                            </p>
                        </div>
                    ))}
                </div>
                <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
                <div className={style.list}>
                    {ingredients.map((item) => (
                        <div className={style.list__item} key={item._id} onClick={() => handleClick(item._id)}>
                            <div className={style.cntr}><Counter count={1} size="default" /></div>
                            <img src={item.image} className={style.img} alt={item.name}></img>
                            <p className={`text text_type_main-default ${style.price}`}><span className='text text_type_digits-default'>{item.price}</span><CurrencyIcon /></p>
                            <p className={`text text_type_main-default ${style.item__title}`}>
                                {item.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {isModalVisible &&
                <ModalOverlay close={modalClose}>
                    <Modal title="Детали ингредиента" close={modalClose}>
                        <IngredientDetails data={targetIngredient} />
                    </Modal>
                </ModalOverlay>}
        </section>
    );
}

Ingredients.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            price: PropTypes.number,
            name: PropTypes.string,
            image: PropTypes.string,
            type: PropTypes.oneOf(['bun', 'sauce', 'main']),
        }))
};

export default Ingredients;