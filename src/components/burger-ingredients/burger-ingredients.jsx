import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.scss';
import Modal from 'components/modal/modal';
import IngredientDetails from 'components/ingredient-details/ingredient-details';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory, useParams } from "react-router-dom";
import { ROUTES } from 'utils/constsRoute';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { deleteCurrentIngredient, fetchIngredients, getCurrentIngredient } from 'services/slices/ingredientsSlice';

export default function BurgerIngredients() {

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const { id } = useParams();
    const [current, setCurrent] = useState('buns');
    const {
        ingredients,
        ingredientsRequest,
        ingredientsFailed
    } = useSelector(state => state.ingredients);
    const { currentIngredient } = useSelector(state => state.ingredients);
    const sauces = useMemo(() => ingredients.filter(item => item.type === "sauce"), [ingredients]);
    const filling = useMemo(() => ingredients.filter(item => item.type === "main"), [ingredients]);
    const buns = useMemo(() => ingredients.filter(item => item.type === "bun"), [ingredients]);
    const refBuns = useRef(null);
    const refFilling = useRef(null);
    const refSauces = useRef(null);
    const refIngredients = useRef(null);
    const [isModalVisible, setModalVisible] = useState(location.pathname !== ROUTES.HOME);

    useEffect(() => {
        ingredients.length === 0 && dispatch(fetchIngredients());
    }, [dispatch, ingredients]);

    useEffect(() => {
        if (!currentIngredient?._id && ingredients.length > 0) {
            const tmp = ingredients.find(item => item._id === id)
            dispatch(getCurrentIngredient(tmp))
        }
    }, [dispatch, currentIngredient, ingredients, id]);

    const onScroll = () => {
        const scrollIng = refIngredients.current.scrollTop;
        const startSauces = refBuns.current.clientHeight / 2;
        const startFilling = refBuns.current.clientHeight + refSauces.current.clientHeight / 2;
        if (scrollIng < startSauces) setCurrent('buns')
        else if (scrollIng > startSauces && scrollIng < startFilling) setCurrent('sauces');
        else if (scrollIng > startFilling) setCurrent('filling');
    }

    const handleClick = useCallback((currentId) => {
        const id = ingredients.find(item => item._id === currentId)
        dispatch(getCurrentIngredient(id))
        setModalVisible(true);
    }, [ingredients, dispatch]);

    const handleClose = () => {
        setModalVisible(false);
        dispatch(deleteCurrentIngredient())
        history.replace({
            pathname: ROUTES.HOME
        });
    };

    const handleScroll = (ref) => {
        ref.scrollIntoView({ block: "start", behavior: "smooth" })
    };

    const loading = (
        <p className="text text_type_main-medium mt-10">
            Загрузка...
        </p>);

    const fail = (
        <p className="text text_type_main-medium mt-10">
            Ошибка выполнения запроса
        </p>
    )

    const content = (
        <>
            <h1 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </h1>
            <div className={style.nav}>
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
            </div>
            <div className={style.ingredients} ref={refIngredients} onScroll={onScroll}>
                <div ref={refBuns}>
                    <IngredientsCategory title='Булки' ingredients={buns} handleClick={handleClick} />
                </div>
                <div ref={refSauces} >
                    <IngredientsCategory title='Соусы' ingredients={sauces} handleClick={handleClick} />
                </div>
                <div ref={refFilling}>
                    <IngredientsCategory title='Начинки' ingredients={filling} handleClick={handleClick} />
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
