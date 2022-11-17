import style from "./style.module.scss";

interface IProps {
  close: () => void;
}

export default function ModalOverlay({ close }: IProps) {
  return <div className={style.overlay} onClick={close} />;
}
