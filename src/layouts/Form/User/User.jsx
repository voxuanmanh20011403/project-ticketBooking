import Header from "layouts/Header/Header";
import React from "react";
import Footer from "layouts/Footer/Footer";
import Box from "@mui/material/Box";
import UserForm from "./UserForm";
import { useNavigate } from "react-router-dom";
import { auth } from "data/firebase";

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
          <Footer />
        </>
      )}
    </>
  );
};

export default User;
