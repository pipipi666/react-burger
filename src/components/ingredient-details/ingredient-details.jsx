import React from 'react';
import style from './style.module.css';
import PropTypes from 'prop-types';

function IngredientDetails({ data }) {

    return (
        <div className={style.content}>
            <img src={data.image_large} alt={data.name} className={style.img} />
            <p className="text text_type_main-medium mt-4 mb-8">
                {data.name}
            </p>
            <div className={style.energy}>
                <div className={style.energy__prop}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>
                        Калории, ккал
                    </p>
                    <p className='text text_type_digits-default text_color_inactive'>
                        {data.calories}
                    </p>
                </div>
                <div className={style.energy__prop}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>
                        Белки, г
                    </p>
                    <p className='text text_type_digits-default text_color_inactive'>
                        {data.proteins}
                    </p>
                </div>
                <div className={style.energy__prop}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>
                        Жиры, г
                    </p>
                    <p className='text text_type_digits-default text_color_inactive mb-2'>
                        {data.fat}
                    </p>
                </div>
                <div className={style.energy__prop}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>
                        Углеводы, г
                    </p>
                    <p className='text text_type_digits-default text_color_inactive'>
                        {data.carbohydrates}
                    </p>
                </div>
            </div>
        </div>
    );
}

IngredientDetails.propTypes = {
    data: PropTypes.shape({
        price: PropTypes.number,
        calories: PropTypes.number,
        proteins: PropTypes.number,
        carbohydrates: PropTypes.number,
        fat: PropTypes.number,
        name: PropTypes.string,
        image_large: PropTypes.string,
    })
};

export default IngredientDetails;