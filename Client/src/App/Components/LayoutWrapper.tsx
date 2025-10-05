
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbarr from './Navbarr';
import Footer from './Footer';
import { useTheme } from '../Contexts/ThemeContext';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-[var(--background-color)] text-gray-900'
    }`}>
      {!isAdmin && <Navbarr />}
      <main className="flex-1">
        {children}
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}
