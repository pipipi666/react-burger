import style from './style.module.scss';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Registration({
    title, buttonName, links, handleFormSubmit, children
}) {

    const history = useHistory();

    const handleClick = (path) => {
        history.push({ pathname: path });
    }

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <form className={style.main} onSubmit={handleFormSubmit}>
                    <h2 className="text text_type_main-medium mt-10">
                        {title}
                    </h2>
                    {children}
                    <Button htmlType="submit" type='primary' size='large'>
                        {buttonName}
                    </Button>
                </form>
                {links.map((item, index) => (
                    <p
                        key={index}
                        className='text text_type_main-default text_color_inactive mb-4'
                    >
                        <span className='pr-2'>{item.text}</span>
                        <Button type="secondary" onClick={() => handleClick(item.path)}>
                            {item.button}
                        </Button>
                    </p>
                ))}
            </div>
        </div>
    );
}

Registration.propTypes = {
    title: PropTypes.string.isRequired,
    buttonName: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        button: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    handleFormSubmit: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
};
