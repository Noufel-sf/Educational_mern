import React from 'react'
import './App.css'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Appimage from './assets/headerimg.png'
import Pages from './Components/Pages'


function App() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);

  return (
    <div>

        <Pages />

    </div>
  )
}

export default App
