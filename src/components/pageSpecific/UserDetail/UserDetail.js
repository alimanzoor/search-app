import React, { useContext, useEffect } from "react";
import StateContext from "../../../context/StateContext";
import Container from "../../Layout/Container/Container";
import IconBack from "../../../assets/images/icon-back.png";
import DispatchContext from "../../../context/DispatchContext";
import style from "./style.module.scss";
import { USER_RESET_SELECTED } from "../../../context/constant.types";
import DefaultImage from "../../../assets/images/thumbnail.jpg";

const UserDetail = () => {
  const { selectedUser } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const { picture, name, email, gender, phone } = selectedUser;

  //Image
  const { large } = picture;
  const thumb = large ? large : DefaultImage;

  // Name
  const { first, last } = name;
  const fullName = first && last ? `${first} ${last}` : "NA";

  // Phone Number
  const removeDash = phone && phone.replaceAll("-", "");
  const removeSpace = removeDash.replaceAll(" ", "");
  const setSpace = removeSpace.replaceAll(")", ") ");
  const phoneNumber = setSpace.replaceAll("-", "");

  const handleNavigateBack = () => {
    dispatch({ type: USER_RESET_SELECTED });
  };

  useEffect(() => {
    console.log("appState", selectedUser);
  }, [selectedUser]);

  return (
    <div className={style.userDetail}>
      <Container>
        <button
          onClick={handleNavigateBack}
          type="button"
          className={style.navigation}
          title="back to home"
        >
          <img src={IconBack} alt="back to home" />
        </button>

        <div className={style.detail}>
          <div className={style.image}>
            <img src={thumb} alt={name} />
          </div>
          <div className={style.content}>
            <div className={style.name}>{fullName}</div>
            <div className={style.email}>{email}</div>
            <div className={style.gender}>{gender}</div>
            <div className={style.phoneNumber}>Tel: {phoneNumber}</div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UserDetail;
