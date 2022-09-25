import style from './style.module.scss';
import IngredientCard from 'components/ingredient-card/ingredient-card';
import PropTypes from 'prop-types';
import { dataTypes } from 'utils/types';

export default function IngredientsCategory({ title, ingredients, handleClick }) {

    return (
        <>
            <h2 className="text text_type_main-medium mt-10 mb-6">{title}</h2>
            <div className={style.list}>
                {ingredients.map((item) => (
                    <IngredientCard item={item} key={item._id} handleClick={handleClick} />
                ))}
            </div>
        </>
    );
}

IngredientsCategory.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(dataTypes.isRequired).isRequired,
    handleClick: PropTypes.func.isRequired
};