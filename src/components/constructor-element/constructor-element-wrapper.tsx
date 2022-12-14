import style from "./style.module.scss";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import {
  deleteIngredient,
  setIngredients,
} from "services/slices/ingredientsSlice";
import { IData } from "utils/types";
import { useAppDispatch, useAppSelector } from "utils/hooks";

interface IProps {
  item: IData;
}

export default function ConstructorElementWrapper({ item }: IProps) {
  const dispatch = useAppDispatch();
  const { constructorIngredients } = useAppSelector(
    (state) => state.ingredients
  );
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "component",
    hover(dragItem: IProps, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = dragItem.item.dropId;
      const hoverIndex = item.dropId;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (
        hoverIndex &&
        dragIndex &&
        dragIndex < hoverIndex &&
        hoverClientY < hoverMiddleY
      ) {
        return;
      }
      if (
        hoverIndex &&
        dragIndex &&
        dragIndex > hoverIndex &&
        hoverClientY > hoverMiddleY
      ) {
        return;
      }
      const dragCard = constructorIngredients.find(
        (card) => card.dropId === dragIndex
      );
      const hoverCard = constructorIngredients.find(
        (card) => card.dropId === hoverIndex
      );
      const newCards = constructorIngredients.map((item) =>
        item.dropId === dragCard?.dropId
          ? hoverCard
          : item.dropId === hoverCard?.dropId
          ? dragCard
          : item
      );
      dispatch(setIngredients(newCards));
    },
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "component",
    item: () => ({ item }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  const opacity = isDragging ? 0 : 1;
  const handleRemove = (item: IData) => {
    dispatch(deleteIngredient(item));
  };

  return (
    <div
      className={style.list__item}
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleRemove(item)}
      />
    </div>
  );
}
