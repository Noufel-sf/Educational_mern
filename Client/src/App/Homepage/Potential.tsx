import React from 'react'
import { PotentialList } from '../data'
import { motion } from "framer-motion";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";

function Potential() {
  return (
    <motion.div 
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className='flex flex-col items-center justify-center gap-12 mt-50 lg:container mx-auto'
    >
    <motion.div 
      variants={fadeIn("up", 0.2)}
      className="flex flex-col lg:flex-row justify-between items-center lg:max-w-[80%]"
    >
      <motion.h2 
        variants={textVariant(0.3)}
        className='text-4xl md:text-5xl fonts font-bold mb-4 lg:w-1/2 text-center'
      >
        Unlock Your Potential <br /> with digital skills mastery
      </motion.h2>
      <motion.p 
        variants={fadeIn("up", 0.5)}
        className='text-gray-600 text-xl text-center lg:max-w-1/2'
      >
       Achieve excellence by mastering digital skills, empowering yourself to exceed expectations, drive innovation, and unlock new levels of success.
      </motion.p>

    </motion.div>
    <motion.div 
      variants={staggerContainer(0.1, 0.6)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="flex flex-col items-center lg:flex-row justify-center w-[80%]  gap-10"
    >
      {PotentialList.map((item, index) => (
        <motion.div 
          key={index} 
          variants={fadeIn("up", index * 0.1)}
          className="flex py-12 flex-col items-center rounded-xl mb-4 gap-4 w-full lg:w-1/3"
          style={{ backgroundColor: item.bgcolor }}
        >
          <img src={item.img} alt={item.heading} className="w-16 h-16 mb-2" />
          <h3 className="text-2xl capitalize font-semibold text-black fonts">{item.heading}</h3>
          <p className="text-gray-600 text-center max-w-1/2">{item.text}</p>
        </motion.div>
      ))}
    </motion.div>
    {/* conters */}
    <motion.div 
      variants={fadeIn("up", 0.8)}
      className="flex flex-col gap-5 lg:flex-row lg:justify-between max-w-[90%] lg:max-w-[80%] w-full items-center bg-amber-300 py-10 px-12 rounded-xl"
    >
        <motion.div variants={fadeIn("up", 0.1)} className="flex flex-col gap">
            <h1 className='text-4xl lg:text-5xl fonts'>120k+</h1>
            <h4 className='text-lg lg:text-2xl'>students world wide</h4>
        </motion.div>
        <motion.div variants={fadeIn("up", 0.2)} className="flex flex-col gap">
            <h1 className='text-4xl lg:text-5xl fonts'>120k+</h1>
            <h4 className='text-lg lg:text-2xl'>students world wide</h4>
        </motion.div>
        <motion.div variants={fadeIn("up", 0.3)} className="flex flex-col gap">
            <h1 className='text-4xl lg:text-5xl fonts'>120k+</h1>
            <h4 className='text-lg lg:text-2xl'>students world wide</h4>
        </motion.div>
        <motion.div variants={fadeIn("up", 0.4)} className="flex flex-col gap">
            <h1 className='text-4xl lg:text-5xl fonts'>120k+</h1>
            <h4 className='text-lg lg:text-2xl'>students world wide</h4>
        </motion.div>

    </motion.div>

    </motion.div>
  )
}

export default Potential