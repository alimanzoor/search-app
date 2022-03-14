import React from "react";
import DefaultImage from "../../../assets/images/thumbnail.jpg";
import style from "./style.module.scss";

const User = ({ user, onClickImage, onSelectUser }) => {
  const { picture, name, login, email, dob, location, phone } = user || {};

  //Image
  const { thumbnail } = picture;
  const thumb = thumbnail ? thumbnail : DefaultImage;

  // Name
  const { first, last } = name;
  const fullName = first && last ? `${first} ${last}` : "NA";
  const uName = login && login.username ? login.username : "";

  // Phone Number
  const removeDash = phone && phone.replaceAll("-", "");
  const removeSpace = removeDash.replaceAll(" ", "");
  const setSpace = removeSpace.replaceAll(")", ") ");
  const phoneNumber = setSpace.replaceAll("-", "");

  // Address
  const streetNumber =
    location && location.street && location.street.number
      ? location.street.number
      : "";
  const streetName =
    location && location.street && location.street.name
      ? location.street.name
      : "";
  const street = `${streetNumber} ${streetName}`;
  const city = location && location.city ? location.city : "";
  const country = location && location.country ? location.country : "";
  const postcode = location && location.postcode ? location.postcode : "";

  return (
    <tr className={style.row}>
      <td>
        <div className={style.info}>
          <div className={style.image}>
            <img src={thumb} alt={fullName} onClick={onClickImage} />
          </div>
          <div>
            <button type="button" onClick={onSelectUser} className={style.name}>
              {fullName}
            </button>
            <div className={style.username}>{uName}</div>
          </div>
        </div>
      </td>
      <td className={style.text}>
        {email && <div className={style.email}>{email}</div>}
      </td>
      <td className={style.text}>
        {dob && dob.date && <div>{formattedDOB(dob.date)}</div>}
      </td>
      <td className={style.text}>{phoneNumber}</td>
      <td className={style.address}>
        <span>
          {street}, {city},
        </span>
        <span>
          {country} - ({postcode})
        </span>
      </td>
    </tr>
  );
};

export default User;

const formattedDOB = (date) => {
  let today = new Date(date);
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  return mm + "/" + dd + "/" + yyyy;
};
