import React, { useState, useContext, useEffect } from "react";
import User from "../User/User";
import Modal from "../../common/Modal/Modal";
import DispatchContext from "../../../context/DispatchContext";
import { USER_SELECTED } from "../../../context/constant.types";
import DefaultImage from "../../../assets/images/thumbnail.jpg";
import style from "./style.module.scss";
import Input from "../../common/Input/Input";
import StateContext from "../../../context/StateContext";
import { useUsers } from "../../../hooks/useUsers";

const UserList = ({ users }) => {
  // console.log("Users UserList", users);
  const { fetchDetail } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [input, setInput] = useState("");
  const [modal, setModal] = useState({ isOpen: false, imageUrl: "", atl: "" });
  const { loading, handleClickNext, handleClickPrev } = useUsers();
  const [filteredUser, setFilteredUser] = useState([]);

  const handleOpenModal = ({ picture, name }) => {
    const { large } = picture;
    const image = large ? large : DefaultImage;
    const alt = name && name.first ? name.first : "user image";
    setModal({ isOpen: true, imageUrl: image, alt });
  };

  const handleCloseModal = () => {
    setModal({ isOpen: false, imageUrl: "", atl: "" });
  };

  const handleSelectedUser = (user) => {
    dispatch({ type: USER_SELECTED, payload: user });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    const filtered = users.results.filter((item) => {
      if (value.trim() === "") {
        return item;
      }
      const cleanedValue = value.trim().toLowerCase();
      const firstName = item.name.first.toLowerCase();
      const lastName = item.name.last.toLowerCase();
      const fullName = `${firstName} ${lastName}`;

      if (fullName.includes(cleanedValue)) {
        return item;
      }
      return false;
    });
    setFilteredUser(filtered);
  };

  useEffect(() => {
    setFilteredUser(users.results);
  }, [users]);

  return (
    <div className={style.container}>
      <div className={style.search}>
        <Input
          onChange={handleInputChange}
          value={input}
          placeholder="Search User"
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className={style.userList}>
          {filteredUser.length > 0 && (
            <table className={style.table}>
              <thead>
                <tr>
                  <th>Info</th>
                  <th>Email</th>
                  <th>DOB</th>
                  <th>Phone</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {filteredUser.map((user) => (
                  <User
                    key={user.login.uuid}
                    onClickImage={() => handleOpenModal(user)}
                    onSelectUser={() => handleSelectedUser(user)}
                    user={user}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      {filteredUser.length > 0 && (
        <div className={style.pagination}>
          <button
            onClick={handleClickPrev}
            disabled={fetchDetail.currentPage <= 1 || loading}
          >
            Prev
          </button>
          <div className={style.activePage}>{fetchDetail.currentPage}</div>
          <button onClick={handleClickNext} disabled={loading}>
            Next
          </button>
        </div>
      )}
      {modal.isOpen && (
        <Modal onClose={handleCloseModal}>
          <img src={modal.imageUrl} alt={modal.alt} />
        </Modal>
      )}
    </div>
  );
};

export default UserList;

const Loading = () => {
  return (
    <div className={style.loading}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => (
        <div key={item} className={style.item}></div>
      ))}
    </div>
  );
};
