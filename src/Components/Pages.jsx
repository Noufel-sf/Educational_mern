import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbarr from './Navbarr'
import Footer from './Footer'
import Home from './Homepage/Home'
import Cakes from './Cakespage/Cakes'
import AboutUs from './AboutUs'
import ContactUs from './Contactuspage/ContactUs' // Fixed typo in directory name
import Cart from './Cartpage/Cart'
import Owncake from './Owncake'
import { CartProvider } from './CartContext'

function Pages() {
  return (
    <div>
     <CartProvider> 
      <Navbarr />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cakes" element={<Cakes />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/owncake" element={<Owncake />} />
      </Routes>
      <Footer />
      </CartProvider>
    </div>
  )
}

export default Pages