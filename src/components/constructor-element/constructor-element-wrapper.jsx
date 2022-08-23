import style from './style.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";
import {
    UPDATE_CONSTRUCTOR_LIST,
    DELETE_INGREDIENT_CONSTRUCTOR
} from '../../services/actions/index.js';

function ConstructorElementWrapper({ item }) {
    const dispatch = useDispatch();
    const { constructorIngredients } = useSelector(state => state.constructorIngredients);
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'component',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover(itemHov, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = itemHov.item.dropId;
            const hoverIndex = item.dropId;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            const dragCard = constructorIngredients.find(card => card.dropId === dragIndex);
            const hoverCard = constructorIngredients.find(card => card.dropId === hoverIndex);
            const newCards = [...constructorIngredients].map(item => item.dropId === dragCard.dropId ? hoverCard : item.dropId === hoverCard.dropId ? dragCard : item)
            dispatch({
                type: UPDATE_CONSTRUCTOR_LIST,
                constructorIngredients: newCards
            })
        }
    })
    const [{ isDragging }, drag] = useDrag({
        type: 'component',
        item: () => ({ item }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    const preventDefault = (e) => e.preventDefault();


    const handleRemove = item => {
        dispatch({
            type: DELETE_INGREDIENT_CONSTRUCTOR,
            item,
        });
    }

    return (
        <div
            className={style.list__item}
            ref={ref}
            style={{ opacity }}
            onDrop={preventDefault}
            data-handler-id={handlerId}
        >
            <div>{item.dropId}</div>
            <DragIcon />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => handleRemove(item)}
            />
        </div>
    );
}

export default ConstructorElementWrapper;