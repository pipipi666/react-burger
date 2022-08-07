import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.css';
import { arr } from '../../utils/data';
import PropTypes from 'prop-types';

function Constructor() {
    function total() {
        let sum = 0;
        return arr.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.price;
        }, sum);
    }

    return (
        <div className={style.container}>
            <main className={style.main}>
                <section className="ml-8">
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={arr[0].name + " (верх)"}
                        price={arr[0].price}
                        thumbnail={arr[0].image}
                    />
                </section>
                <section className={style.ingredients}>
                    {arr.map((item, index) => (
                        (index !== 0 && index !== arr.length - 1) &&
                        <div className={style.list__item} key={item._id}>
                            <DragIcon />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </div>
                    ))}
                </section>
                <section className="ml-8">
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={arr[arr.length - 1].name + " (низ)"}
                        price={arr[arr.length - 1].price}
                        thumbnail={arr[arr.length - 1].image}
                    />
                </section>
            </main>
            <footer className={style.footer}>
                <span className="text text_type_digits-medium">{total()} <CurrencyIcon /></span>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </footer>
        </div>
    );
}

Constructor.propTypes = {
    price: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
};

export default Constructor;