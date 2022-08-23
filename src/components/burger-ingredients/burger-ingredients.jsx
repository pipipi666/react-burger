import { useMemo, useState, useEffect, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/index.js';
import IngredientCard from '../ingredient-card/ingredient-card';
import {
    GET_CURRENT_INGREDIENT,
    DELETE_CURRENT_INGREDIENT
} from '../../services/actions/index.js';


function BurgerIngredients() {
    const {
        ingredients,
        ingredientsRequest,
        ingredientsFailed
    } = useSelector(state => state.ingredients);
    const [isModalVisible, setModalVisible] = useState(false);
    const [current, setCurrent] = useState('buns');
    const sauces = useMemo(() => ingredients.filter(item => item.type === "sauce"), [ingredients]);
    const filling = useMemo(() => ingredients.filter(item => item.type === "main"), [ingredients]);
    const buns = useMemo(() => ingredients.filter(item => item.type === "bun"), [ingredients]);
    const dispatch = useDispatch();
    const refBuns = useRef(null);
    const refFilling = useRef(null);
    const refSauces = useRef(null);
    const refIngredients = useRef(null);

    const handleClick = (currentId) => {
        const id = ingredients.find(item => item._id === currentId)
        dispatch({ type: GET_CURRENT_INGREDIENT, id })
        setModalVisible(true);
    };

    const handleClose = () => {
        setModalVisible(false);
        dispatch({ type: DELETE_CURRENT_INGREDIENT })
    };

    const handleScroll = (ref) => {
        ref.scrollIntoView({ block: "start", behavior: "smooth" })
    };

    const onScroll = () => {
        const scrollIng = refIngredients.current.scrollTop;
        const startSauces = refBuns.current.clientHeight / 2;
        const startFilling = refBuns.current.clientHeight + refSauces.current.clientHeight / 2;
        if (scrollIng < startSauces) setCurrent('buns')
        else if (scrollIng > startSauces && scrollIng < startFilling) setCurrent('sauces');
        else if (scrollIng > startFilling) setCurrent('filling');
    }

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    const loading = (
        <p className="text text_type_main-medium">
            Загрузка...
        </p>);

    const fail = (
        <p className="text text_type_main-medium">
            Ошибка выполнения запроса
        </p>
    )

    const content = (
        <>
            <h1 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </h1>
            <nav className={style.nav}>
                <div onClick={() => { handleScroll(refBuns.current) }}>
                    <Tab
                        value="buns"
                        active={current === 'buns'}
                        onClick={setCurrent}
                    >
                        Булки
                    </Tab>
                </div>
                <div onClick={() => { handleScroll(refSauces.current) }}>
                    <Tab
                        value="sauces"
                        active={current === 'sauces'}
                        onClick={setCurrent}
                    >
                        Соусы
                    </Tab>
                </div>
                <div onClick={() => { handleScroll(refFilling.current) }}>
                    <Tab
                        value="filling"
                        active={current === 'filling'}
                        onClick={setCurrent}
                    >
                        Начинки
                    </Tab>
                </div>
            </nav>
            <div className={style.ingredients} ref={refIngredients} onScroll={onScroll}>
                <div ref={refBuns}>
                    <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
                    <div className={style.list}>
                        {buns.map((item) => (
                            <IngredientCard item={item} handleClick={handleClick} key={item._id} />
                        ))}
                    </div>
                </div>
                <div ref={refSauces}>
                    <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
                    <div className={style.list}>
                        {sauces.map((item) => (
                            <IngredientCard item={item} handleClick={handleClick} key={item._id} />
                        ))}
                    </div>
                </div>
                <div ref={refFilling}>
                    <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
                    <div className={style.list}>
                        {filling.map((item) => (
                            <IngredientCard item={item} handleClick={handleClick} key={item._id} />
                        ))}
                    </div>
                </div>
            </div>
            {isModalVisible &&
                <Modal title="Детали ингредиента" close={handleClose}>
                    <IngredientDetails />
                </Modal>
            }
        </>
    );

    return (
        <section className={style.container}>
            {ingredientsRequest ? loading
                : ingredientsFailed ? fail
                    : content}
        </section>
    );
}

export default BurgerIngredients;