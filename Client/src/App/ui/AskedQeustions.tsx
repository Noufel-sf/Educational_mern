import React from 'react'
import { Questions } from '../data'
import QuestionCard from '../Components/Question'
import { motion } from "framer-motion";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";

function AskedQuestions() {
  return (
    <motion.section 
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="flex flex-col items-center gap-8 mt-20 lg:mt-50 container mx-auto"
    >
        <motion.h1 
          variants={textVariant(0.2)}
          className="text-5xl text-center fonts md:text-6xl font-bold capitalize"
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p 
          variants={fadeIn("up", 0.4)}
          className='w-full md:max-w-1/2 text-center'
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum numquam vel fuga asperiores ducimus. Adipisci, recusandae totam quidem rem ipsum voluptatem do
        </motion.p>
        <motion.div 
          variants={staggerContainer(0.1, 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className='w-full lg:w-[60%] px-2 md:px-8 '
        >
          {Questions.map((question, index) => (
            <motion.div
              key={question.id}
              variants={fadeIn("up", index * 0.1)}
            >
              <QuestionCard {...question} />
            </motion.div>
          ))}
        </motion.div>
    </motion.section>
  )
}

export default AskedQuestions