import Header from 'layouts/Header/Header'
import React from 'react'
import Footer from 'layouts/Footer/Footer'
import Banner from 'layouts/Body/Banner/Banner'
import ScrollToTopButton from 'layouts/TopButton/ScrollToTopButton'
import ContactCall from 'layouts/ContactCall/ContactCall'
import ContactNetwork from 'layouts/ContactCall/ContactNetwork'
export default function Home() {
  return (
   <>
   <Header></Header>
   <>
    <Banner></Banner>
    <ScrollToTopButton/>
   </>
   <Footer></Footer>
   <ContactCall/>
   <ContactNetwork/>
   </>
  )
}
