import React from 'react';
import style from './style.module.css';
import { dataTypes } from '../../utils/types';

function IngredientDetails({ data }) {

    return (
        <div className={style.content}>
            <img src={data.image_large} alt={data.name} className={style.img} />
            <p className="text text_type_main-medium mt-4 mb-8">
                {data.name}
            </p>
            <ul className={style.energy}>
                <li className={style.energy__prop}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>
                        Калории, ккал
                    </p>
                    <p className='text text_type_digits-default text_color_inactive'>
                        {data.calories}
                    </p>
                </li>
                <li className={style.energy__prop}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>
                        Белки, г
                    </p>
                    <p className='text text_type_digits-default text_color_inactive'>
                        {data.proteins}
                    </p>
                </li>
                <li className={style.energy__prop}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>
                        Жиры, г
                    </p>
                    <p className='text text_type_digits-default text_color_inactive mb-2'>
                        {data.fat}
                    </p>
                </li>
                <li className={style.energy__prop}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>
                        Углеводы, г
                    </p>
                    <p className='text text_type_digits-default text_color_inactive'>
                        {data.carbohydrates}
                    </p>
                </li>
            </ul>
        </div>
    );
}

IngredientDetails.propTypes = {
    data: dataTypes
};

export default IngredientDetails;