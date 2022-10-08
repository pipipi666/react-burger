import style from './style.module.scss';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { DragEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";
import { deleteIngredient, setIngredients } from 'services/slices/ingredientsSlice';
import { IData } from '../../utils/types';
import { FC } from 'react';
import { AppDispatch } from 'services/store';

interface IProps {
    item: IData;
}

export const ConstructorElementWrapper: FC<IProps> = ({ item }) => {

    const dispatch = useDispatch<AppDispatch>();
    const { constructorIngredients } = useSelector((state: any) => state.ingredients);
    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'component',
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
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
            if (hoverIndex && dragIndex && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (hoverIndex && dragIndex && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            const dragCard = constructorIngredients.find((card: IData) => card.dropId === dragIndex);
            const hoverCard = constructorIngredients.find((card: IData) => card.dropId === hoverIndex);
            const newCards = constructorIngredients.map((item: IData) =>
                item.dropId === dragCard.dropId ? hoverCard
                    : item.dropId === hoverCard.dropId ? dragCard
                        : item)
            dispatch(setIngredients(newCards))
        },
        collect(monitor) {
            return {
              handlerId: monitor.getHandlerId(),
            };
        }
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'component',
        item: () => ({ item }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    const preventDefault = (e: DragEvent<HTMLDivElement>) => e.preventDefault();
    const handleRemove = (item: IData) => dispatch(deleteIngredient(item));

    return (
        <div
            className={style.list__item}
            ref={ref}
            style={{ opacity }}
            onDrop={preventDefault}
            data-handler-id={handlerId}
        >
            <DragIcon type='primary'/>
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => handleRemove(item)}
            />
        </div>
    );
}
