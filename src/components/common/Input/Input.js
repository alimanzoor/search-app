import React from "react";
import style from "./style.module.scss";

const Input = ({ onChange, value, placeholder }) => {
  return (
    <div className={style.input}>
      <input
        type="text"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
