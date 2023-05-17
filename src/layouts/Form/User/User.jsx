import Header from "layouts/Header/Header";
import React from "react";
import Footer from "layouts/Footer/Footer";
import Box from "@mui/material/Box";
import UserForm from "./UserForm";

const User = () => {
  return (
    <>
      <Header />
      <Box>
        <UserForm />
      </Box>
      <Footer />
    </>
  );
};

export default User;
