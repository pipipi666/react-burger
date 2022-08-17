import React from 'react';
import style from './style.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ close }) {

    return (
        <div className={style.overlay} onClick={close} />
    );
}

ModalOverlay.propTypes = {
    close: PropTypes.func.isRequired,
};

export default ModalOverlay;