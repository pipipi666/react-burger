import React, { FC, ReactNode, useEffect } from "react";
import * as ReactDOM from "react-dom";
import style from "./style.module.scss";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "components/modal-overlay/modal-overlay";

interface IProps {
  close: () => void;
  title: string | number;
  children: ReactNode;
}

export const Modal: FC<IProps> = ({ close, title, children }) => {
  const modalRoot = document.getElementById("react-modals")!;
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === "Escape" && close();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [close]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay close={close} />
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <header className={style.header}>
          {typeof title === "number" ? (
            <span className="text text_type_digits-default">#{title}</span>
          ) : (
            <span className="text text_type_main-large">{title}</span>
          )}
          <div onClick={() => close()}>
            <CloseIcon type="primary" />
          </div>
        </header>
        <div className={style.content}>{children}</div>
      </div>
    </>,
    modalRoot
  );
};
