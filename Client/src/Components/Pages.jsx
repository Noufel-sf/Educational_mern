import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbarr from './Navbarr'
import Footer from './Footer'
import Home from './Homepage/Home'
import Cakes from './Bookspage/Books'
import AboutUs from './AboutUs'
import ContactUs from './Contactuspage/ContactUs' // Fixed typo in directory name
import Cart from './Cartpage/Cart'
import Admin from './adminpanel/admin'
import { CartProvider } from './CartContext'
import LayoutWrapper from './LayoutWrapper'
import Login from "./login"
import Signup from "./signup"
import Bookdetails from './Bookdetails'

function Pages() {
  return (
    <div>
     <CartProvider>
       <LayoutWrapper>  
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cakes" element={<Cakes />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/admin" element={<Admin />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/book/:id" element={<Bookdetails />} />
      </Routes>
      </LayoutWrapper>
      </CartProvider>
    </div>
  )
}

export default Pages