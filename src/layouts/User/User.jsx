import Header from 'layouts/Header/Header'
import React from 'react'
import UserForm from './UserForm'
import Footer from 'layouts/Footer/Footer'
import Box from '@mui/material/Box';


const User = () => {
  return (
         <>
         <Header></Header>
         <Box>
        <UserForm />
      </Box>
   <Footer></Footer>
   </>
  )
}

export default User