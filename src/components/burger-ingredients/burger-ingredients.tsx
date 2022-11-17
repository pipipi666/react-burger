import { useMemo, useState, useEffect, useRef } from "react";
import style from "./style.module.scss";
import Modal from "components/modal/modal";
import IngredientDetails from "components/ingredient-details/ingredient-details";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { ROUTES } from "utils/constsRoute";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import {
  deleteCurrentIngredient,
  fetchIngredients,
  getCurrentIngredient,
} from "services/slices/ingredientsSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import { Tab } from "utils/libComponentsWithTypes";

export default function BurgerIngredients() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [current, setCurrent] = useState("buns");
  const [isModalVisible, setModalVisible] = useState(
    location.pathname !== ROUTES.HOME
  );
  const { ingredients, currentIngredient } = useAppSelector(
    (state) => state.ingredients
  );
  const sauces = useMemo(
    () => ingredients.filter((item) => item.type === "sauce"),
    [ingredients]
  );
  const filling = useMemo(
    () => ingredients.filter((item) => item.type === "main"),
    [ingredients]
  );
  const buns = useMemo(
    () => ingredients.filter((item) => item.type === "bun"),
    [ingredients]
  );
  const refBuns = useRef<HTMLDivElement>(null);
  const refFilling = useRef<HTMLDivElement>(null);
  const refSauces = useRef<HTMLDivElement>(null);
  const refIngredients = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const scrollIng = refIngredients.current?.scrollTop;
    const startSauces = refBuns.current && refBuns.current?.clientHeight / 2;
    const startFilling =
      refBuns.current &&
      refSauces.current &&
      refBuns.current?.clientHeight + refSauces.current.clientHeight / 2;
    if (scrollIng && startSauces && startFilling) {
      if (scrollIng < startSauces) {
        setCurrent("buns");
      } else if (scrollIng > startSauces && scrollIng < startFilling)
        setCurrent("sauces");
      else if (scrollIng > startFilling) {
        setCurrent("filling");
      }
    }
  };

  const handleClick = (currentId: string) => {
    const id = ingredients.find((item) => item._id === currentId);
    dispatch(getCurrentIngredient(id));
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
    dispatch(deleteCurrentIngredient());
    history.replace(ROUTES.HOME);
  };

  const handleScroll = (ref: HTMLDivElement) => {
    ref.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  useEffect(() => {
    !ingredients.length && dispatch(fetchIngredients());
  }, [dispatch, ingredients]);

  useEffect(() => {
    if (!currentIngredient && ingredients.length > 0) {
      const tmp = ingredients.find((item) => item._id === id);
      dispatch(getCurrentIngredient(tmp));
    }
  }, [dispatch, currentIngredient, ingredients, id]);

  return (
    <section className={style.container}>
      <h1 className={"text text_type_main-large mt-10 mb-5"}>
        Соберите бургер
      </h1>
      <ul className={style.nav}>
        <li
          className={style.tab__wrapper}
          onClick={() => {
            handleScroll(refBuns.current!);
          }}
        >
          <Tab value="buns" active={current === "buns"} onClick={setCurrent}>
            Булки
          </Tab>
        </li>
        <li
          className={style.tab__wrapper}
          onClick={() => {
            handleScroll(refSauces.current!);
          }}
        >
          <Tab
            value="sauces"
            active={current === "sauces"}
            onClick={setCurrent}
          >
            Соусы
          </Tab>
        </li>
        <li
          className={style.tab__wrapper}
          onClick={() => {
            handleScroll(refFilling.current!);
          }}
        >
          <Tab
            value="filling"
            active={current === "filling"}
            onClick={setCurrent}
          >
            Начинки
          </Tab>
        </li>
      </ul>
      <div
        className={style.ingredients}
        ref={refIngredients}
        onScroll={onScroll}
      >
        <div ref={refBuns}>
          <IngredientsCategory
            title="Булки"
            ingredients={buns}
            handleClick={handleClick}
          />
        </div>
        <div ref={refSauces}>
          <IngredientsCategory
            title="Соусы"
            ingredients={sauces}
            handleClick={handleClick}
          />
        </div>
        <div ref={refFilling}>
          <IngredientsCategory
            title="Начинки"
            ingredients={filling}
            handleClick={handleClick}
          />
        </div>
      </div>
      {isModalVisible && (
        <Modal title="Детали ингредиента" close={handleClose}>
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
}
