
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbarr from './Navbarr';
import Footer from './Footer';

export default function LayoutWrapper({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbarr />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}
