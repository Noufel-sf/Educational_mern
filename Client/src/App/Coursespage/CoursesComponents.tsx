import React from 'react'
import AllCourses from './AllCourses'
import Banner from '../ui/Banner'
import { useTheme } from '../Contexts/ThemeContext'


function CoursesComponents() {
  // const {isDarkMode} = useTheme() ; 

  return (
    <div>
        <AllCourses />
        <Banner />
    </div>
  )
}

export default CoursesComponents