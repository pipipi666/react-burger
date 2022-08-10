import React from 'react';
import style from './style.module.css';

function ModalOverlay({ children, close }) {

    return (
        <div className={style.overlay} onClick={close}>
            {children}
        </div>
    );
}

export default ModalOverlay;