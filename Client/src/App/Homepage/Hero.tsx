import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";

import Services from "./Services";
import { Link } from "react-router-dom";


export default function Hero() {
  return (
    <motion.section 
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      animate="show"
      className="w-full flex flex-col justify-center items-center text-center h-screen font-bold px-6 gap-8">
      {/* Logo */}
     
      <motion.h1 
        variants={textVariant(0.3)}
        className="text-5xl  md:text-8xl py-2 fonts"
      >
             Your new Journey with <br /> <span>Digital growth</span>
      </motion.h1>
    
      {/* Subtitle */}
      <motion.p 
        variants={fadeIn("up", 0.6)}
        className="text-gray-600 max-w-2xl mb-6"
      >
        Our unique curriculum blends modern educational approaches with traditional values, 
        fostering love for learning that lasts a lifetime. Join us as we embark on this 
        
      </motion.p>
      <motion.div
        variants={fadeIn("up", 0.6)}
        className="flex flex-col md:flex-row justify-center items-center gap-4 w-full"
      >
      <motion.input
       variants={fadeIn("up", 0.6)}
       required
       placeholder="search about courses"
        className="w-1/4  outline-none px-5 capitalize border border-gray-200 py-3 rounded-full  bg-gray-100"
      />
      <motion.button
        variants={fadeIn("up", 0.6)}
        className="bg-[var(--primary-color)] text-white px-6 py-3 rounded-full capitalize"
      >
        find courses
      </motion.button>

      </motion.div>


    
    </motion.section>
  );
}