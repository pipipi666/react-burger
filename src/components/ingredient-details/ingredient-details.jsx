import style from './style.module.css';
import { useSelector } from 'react-redux';

function IngredientDetails() {
    const { currentIngredient } = useSelector(state => state.currentIngredient);

    return (
        <div className={style.content}>
            <img src={currentIngredient.image_large} alt={currentIngredient.name} className={style.img} />
            <p className="text text_type_main-medium mt-4 mb-8">
                {currentIngredient.name}
            </p>
            <ul className={style.energy}>
                <li className={style.energy__prop}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>
                        Калории, ккал
                    </p>
                    <p className='text text_type_digits-default text_color_inactive'>
                        {currentIngredient.calories}
                    </p>
                </li>
                <li className={style.energy__prop}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>
                        Белки, г
                    </p>
                    <p className='text text_type_digits-default text_color_inactive'>
                        {currentIngredient.proteins}
                    </p>
                </li>
                <li className={style.energy__prop}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>
                        Жиры, г
                    </p>
                    <p className='text text_type_digits-default text_color_inactive mb-2'>
                        {currentIngredient.fat}
                    </p>
                </li>
                <li className={style.energy__prop}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>
                        Углеводы, г
                    </p>
                    <p className='text text_type_digits-default text_color_inactive'>
                        {currentIngredient.carbohydrates}
                    </p>
                </li>
            </ul>
        </div>
    );
}

export default IngredientDetails;