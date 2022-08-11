import React from 'react';
import style from './style.module.css';

function ModalOverlay({ close }) {

    return (
        <div className={style.overlay} onClick={close} />
    );
}

export default ModalOverlay;