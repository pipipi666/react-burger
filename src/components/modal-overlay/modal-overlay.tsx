import { FC } from 'react';
import style from './style.module.scss';

interface IProps {
    close: () => void;
}

export const ModalOverlay: FC<IProps> = ({ close }) => {
    return (
        <div className={style.overlay} onClick={close} />
    );
}
