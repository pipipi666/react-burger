import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Redirect, useLocation } from "react-router-dom";
import IngredientPage from "../ingredient/ingredient";
import BurgerConstructor from "components/burger-constructor/burger-constructor";
import BurgerIngredients from "components/burger-ingredients/burger-ingredients";
import style from "./home.module.scss";
import { ROUTES } from "utils/constsRoute";
import { ILocationState } from "utils/types";
import { useState } from "react";
import { Button } from "utils/libComponentsWithTypes";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import {
  CloseIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { isAuth } from "utils/utils";
import { fetchOrder, setIngredients } from "services/slices/ingredientsSlice";
import Modal from "components/modal/modal";
import OrderDetails from "components/order-details/order-details";
import Loader from "components/loader/loader";

export default function HomePage() {
  const location = useLocation<ILocationState>();
  const dispatch = useAppDispatch();
  const [isConstructor, setConstructor] = useState(false);
  const { sum, constructorIngredients, ingredientsRequest, ingredientsFailed } =
    useAppSelector((state) => state.ingredients);
  const auth = isAuth();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleClick = () => {
    if (!isConstructor) {
      setConstructor(true);
    } else if (sum > 0) {
      if (auth) {
        setModalVisible(true);
        const ingredients = constructorIngredients.map((item) => item._id);
        dispatch(fetchOrder(ingredients));
      } else return <Redirect to={ROUTES.LOGIN} />;
    }
  };

  const handleClose = () => {
    setConstructor(false);
    setModalVisible(false);
    dispatch(setIngredients([]));
  };

  const content = (
    <>
      <main
        className={`${style.main} ${
          !constructorIngredients.length && style.empty
        }`}
      >
        <DndProvider backend={HTML5Backend}>
          <div className={`${style.section} ${!isConstructor && style.active}`}>
            <BurgerIngredients />
          </div>
          <div
            className={`${style.section} ${style.constr}  ${
              !constructorIngredients.length && style.constr__empty
            } ${isConstructor && style.active}`}
          >
            <div className={style.title}>
              <div className="text text_type_main-medium">Заказ</div>
              <div onClick={() => setConstructor(false)}>
                <CloseIcon type="primary" />
              </div>
            </div>
            <BurgerConstructor />
          </div>
          <div className={style.footer}>
            <div className={style.total}>
              <p className="text text_type_digits-default">{sum}</p>
              <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="small" onClick={handleClick}>
              <span className="text text_type_main-default">
                {isConstructor ? "Заказать" : "Смотреть заказ"}
              </span>
            </Button>
          </div>
        </DndProvider>
      </main>
      {isModalVisible && (
        <Modal title="" close={handleClose}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );

  if (
    location.pathname !== ROUTES.HOME &&
    location.state?.from !== ROUTES.HOME
  ) {
    return <IngredientPage />;
  }

  return (
    <div className={style.wrapper}>
      {ingredientsRequest ? (
        <Loader />
      ) : ingredientsFailed ? (
        <p className="text text_type_main-medium mt-10">
          Ошибка выполнения запроса
        </p>
      ) : (
        content
      )}
    </div>
  );
}
