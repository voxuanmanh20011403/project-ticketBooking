import Header from "layouts/Header/Header";
import React from "react";
import Box from "@mui/material/Box";
import UserForm from "./UserForm";
import { useNavigate } from "react-router-dom";
import { auth } from "data/firebase";
import Ground from "layouts/Body/Cart/Ground";

const User = () => {
  const user = auth.currentUser;
  const navi = useNavigate();
  return (
    <>
      {user === null ? (
        navi("/")
      ) : (
        <>
          <Header />
          <Box>
            <UserForm />
          </Box>
          <Ground />
        </>

      )}
    </>
  );
};

export default User;
