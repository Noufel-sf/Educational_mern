import * as React from 'react';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import background from "/background.png"
import { motion } from "framer-motion";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";

const Banner = () => {

  return (
    <motion.div 
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`container mx-auto py-20 px-4 rounded-3xl shadow-sm mt-50 max-w-[90%]`} 
      style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}
    >
      <motion.div 
        variants={fadeIn("up", 0.2)}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h2 
          variants={textVariant(0.3)}
          className="text-4xl md:text-6xl fonts mb-4"
        >
          Join Driven Professionals & Launch<br />
          Your Dream Career Today!
        </motion.h2>
        
        <motion.p 
          variants={fadeIn("up", 0.5)}
          className="text-gray-700 mb-8 max-w-2xl mx-auto"
        >
          Connect with a network of driven professionals, gain valuable insights, and access
          resources that propel you toward your dream career.
        </motion.p>
        
        <motion.form 
          variants={fadeIn("up", 0.7)}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-96 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            className="bg-[var(--secondary-color)] cursor-pointer fonts hover:bg-[var(--primary-color)] text-white font-medium px-8 py-3 rounded-full flex items-center gap-2 transition-all"
          >
            Join With Us
            <ArrowRight size={20} />
          </button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default Banner;