import PropTypes from 'prop-types';

export const dataTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
});

// export interface IData {
//     readonly _id: string;
//     readonly name: string;
//     readonly  type: 'bun' | 'sauce' | 'main';
//     readonly proteins: number;
//     readonly fat: number;
//     readonly carbohydrates: number;
//     readonly calories: number;
//     readonly price: number;
//     readonly image: string;
//     readonly image_mobile: string;
//     readonly image_large: string;
//     readonly __v: number;
// }

