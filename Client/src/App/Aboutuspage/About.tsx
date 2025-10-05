import React from 'react'
import AboutusContent from './AboutusContent'
import AskedQuestions from '../ui/AskedQeustions'
import { useTheme } from '../Contexts/ThemeContext'




function About() {
  // const {isDarkMode} = useTheme() ; 

  return (
    <div>
        <AboutusContent />
        <AskedQuestions />
    </div>
  )
}

export default About