import Header from 'layouts/Header/Header'
import React from 'react'
import Footer from 'layouts/Footer/Footer'
import Banner from 'layouts/Body/Banner/Banner'
import ScrollToTopButton from 'layouts/TopButton/ScrollToTopButton'
import ContactCall from 'layouts/ContactCall/ContactCall'
export default function Home() {
  return (
   <>
   <Header></Header>
   <>
    <Banner></Banner>
    <ScrollToTopButton/>
    <ContactCall/>
   </>
   <Footer></Footer>
   </>
  )
}
