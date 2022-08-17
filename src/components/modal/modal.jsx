import React, { useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import style from './style.module.css';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

function Modal({ close, title, error, isLoading, children }) {
    const modalRoot = document.getElementById("react-modals");

    useEffect(() => {
        const modalEsc = (e) => {
            if (e.keyCode === 27) {
                close();
            }
        }
        window.addEventListener('keydown', modalEsc)
        return () => window.removeEventListener('keydown', modalEsc)
    }, [close]);

    if (isLoading) {
        return (
            <p className="text text_type_main-large mt-10">
                Загрузка...
            </p>
        );
    }

    if (error) {
        return ReactDOM.createPortal(
            <>
                <ModalOverlay close={close}>
                </ModalOverlay>
                <div className={style.modal} onClick={e => e.stopPropagation()}>
                    <header className={style.header}>
                        <span className="text text_type_main-medium">
                            Ошибка
                        </span>
                        <div onClick={() => close()}>
                            <CloseIcon />
                        </div>
                    </header>
                    <div className={style.content}>
                        <p className="text text_type_main-large mt-10">
                            Ошибка во время выполнения запроса
                        </p>
                    </div>
                </div>
            </>,
            modalRoot
        );
    }

    return ReactDOM.createPortal(
        <>
            <ModalOverlay close={close}>
            </ModalOverlay>
            <div className={style.modal} onClick={e => e.stopPropagation()}>
                <header className={style.header}>
                    <span className="text text_type_main-medium">
                        {title}
                    </span>
                    <div onClick={() => close()}>
                        <CloseIcon />
                    </div>
                </header>
                <div className={style.content}>
                    {children}
                </div>
            </div>
        </>,
        modalRoot
    );
};

Modal.propTypes = {
    isLoading: PropTypes.bool,
    error: PropTypes.bool,
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
    close: PropTypes.func,
};


export default Modal;