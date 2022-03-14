import React from "react";
import style from "./style.module.scss";

const Modal = ({ onClose, children }) => {
  return (
    <div className={style.modal}>
      <div className={style.backdrop} onClick={onClose} />
      <div className={style.content}>
        {children}
        <button onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default Modal;
