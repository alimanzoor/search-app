import React from "react";
import Container from "../../Layout/Container/Container";
import AppLogo from "../../../assets/images/thumbnail.jpg";
import style from "./style.module.scss";

const Navbar = () => {
  return (
    <div className={style.navbar}>
      <Container>
        <div className={style.title}>
          <img src={AppLogo} alt="Search App" /> Search User
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
