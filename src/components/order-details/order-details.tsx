import style from "./style.module.scss";
import background from "assets/image/graphics.svg";
import { useAppSelector } from "utils/hooks";
import Loader from "components/loader/loader";

export default function OrderDetails() {
  const { order, orderRequest, orderFailed } = useAppSelector(
    (state) => state.ingredients
  );

  const content = (
    <>
      <p className={`text text_type_digits-large mt-4 mb-8 ${style.number}`}>
        {order?.number}
      </p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img alt="done" src={background} className={style.done__img} />
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-20">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );

  return (
    <div className={style.content}>
      {orderRequest ? (
        <Loader />
      ) : orderFailed ? (
        <p className="text text_type_main-medium">Ошибка выполнения запроса</p>
      ) : (
        content
      )}
    </div>
  );
}
