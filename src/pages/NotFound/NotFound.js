import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";

const NotFound = () => {
  return (
    <div className={style.notFound}>
      <div className={style.title}>
        We couldn't find what you are looking for
      </div>

      <div className={style.subtitle}>Here are some helpful links instead:</div>
      <div className={style.link}>
        <Link to="/" style={{ color: "#128849" }}>
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
