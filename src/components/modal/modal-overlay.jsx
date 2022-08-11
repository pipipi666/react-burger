import React from 'react';
import style from './style.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ close }) {

    return (
        <div className={style.overlay} onClick={close}>
        </div>
    );
}

ModalOverlay.propTypes = {
    close: PropTypes.func,
};

export default ModalOverlay;