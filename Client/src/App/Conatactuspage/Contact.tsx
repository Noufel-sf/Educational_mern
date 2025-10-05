import React from 'react'
import ContactContent from './ContactContent'
import Banner from '../ui/Banner'
import { useTheme } from '../Contexts/ThemeContext';



function Contact() {
    // const {isDarkMode} = useTheme() ; 
  return (
    <div>
        <ContactContent />
        <Banner />
    </div>
  )
}

export default Contact