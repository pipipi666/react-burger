import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useLocation } from 'react-router-dom';
import IngredientPage from "../ingredient/ingredient";
import BurgerConstructor from "components/burger-constructor/burger-constructor";
import BurgerIngredients from "components/burger-ingredients/burger-ingredients";
import style from './home.module.scss';
import { ROUTES } from "utils/constsRoute";
import { ILocationState } from "utils/types";

export default function HomePage() {

    const location = useLocation<ILocationState>();

    if (location.pathname !== ROUTES.HOME && location.state?.from !== ROUTES.HOME) {
        return < IngredientPage />
    }

    return (
        <div className={style.wrapper}>
            <main className={style.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
            </main>
        </div>
    )
}
