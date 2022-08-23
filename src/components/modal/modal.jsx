import { useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import style from './style.module.css';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

function Modal({ close, title, children }) {
    const modalRoot = document.getElementById("react-modals");

    useEffect(() => {
        const handleEsc = (e) => {
            e.key === "Escape" && close();
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [close]);


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
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
    close: PropTypes.func.isRequired,
};


export default Modal;