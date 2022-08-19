import React, { useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import style from './style.module.css';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

function Modal({ close, title, error, isLoading, children }) {
    const modalRoot = document.getElementById("react-modals");

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                close();
            }
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [close]);

    const errorText = (
        <p className="text text_type_main-large mt-10">
            Ошибка во время выполнения запроса
        </p>
    );

    if (isLoading) {
        return (
            <p className="text text_type_main-large mt-10">
                Загрузка...
            </p>
        );
    }

    return ReactDOM.createPortal(
        <>
            <ModalOverlay close={close}>
            </ModalOverlay>
            <div className={style.modal} onClick={e => e.stopPropagation()}>
                <header className={style.header}>
                    <span className="text text_type_main-medium">
                        {error ? "Ошибка" : title}
                    </span>
                    <div onClick={() => close()}>
                        <CloseIcon />
                    </div>
                </header>
                <div className={style.content}>
                    {error ? errorText : children}
                </div>
            </div>
        </>,
        modalRoot
    );
};

Modal.propTypes = {
    isLoading: PropTypes.bool,
    error: PropTypes.object,
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
    close: PropTypes.func.isRequired,
};


export default Modal;