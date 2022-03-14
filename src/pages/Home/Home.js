import React, { useContext } from "react";
import StateContext from "../../context/StateContext";
import UserList from "../../components/pageSpecific/UserList/UserList";
import Container from "../../components/Layout/Container/Container";
import UserDetail from "../../components/pageSpecific/UserDetail/UserDetail";
import { useUsers } from "../../hooks/useUsers";

const Home = () => {
  const { users, selectedUser, fetchDetail } = useContext(StateContext);
  const { error } = useUsers();

  if (error)
    return (
      <div style={{ margin: "2rem" }}>there is some error, try again alter</div>
    );

  if (selectedUser) return <UserDetail />;

  return (
    <Container>
      {users && users.length > 0 && (
        <UserList users={users[fetchDetail.currentPage - 1]} />
      )}
    </Container>
  );
};

export default Home;
