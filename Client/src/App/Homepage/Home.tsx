import React from 'react'
import Hero from './Hero'
import Potential from './Potential'
import HomeCoursesList from './HomeCoursesList'
import WhyChooseUs from '../ui/WhychooseUs'
import AskedQuestions from '../ui/AskedQeustions'
import Banner from '../ui/Banner'
import {useTheme} from "../Contexts/ThemeContext"


function Home() {
  // const { isDarkMode } = useTheme();
  return (
  <div>
        <Hero />
        <Potential />
        <HomeCoursesList />
        <WhyChooseUs />
        <AskedQuestions />
        <Banner />
        {/* <Services /> */}
    </div>
  )
}

export default Home