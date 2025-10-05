import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";

export default function WhyChooseUs() {
  return (
    <motion.section 
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="py-16"
    >
      <div className=" flex container mx-auto flex-col lg:flex-row items-center gap-5  md:gap-12 mt-50 ">
        
        {/* Left Side: Image with Badge */}
        <motion.div
          variants={fadeIn("left", 0.3)}
          className="relative  w-full p-8 lg:w-1/2"
        >

          <img
            src="/whychooseus.png"
            alt="Learning"
            className="rounded-2xl w-full object-cover shadow-md"
            />
          {/* Floating Badge */}
          <div className="absolute bottom-12 left-12 p-5   bg-white shadow-lg lg:p-8 rounded-xl">
            <p className="text-sm text-gray-500">Average Class Completion Rate</p>
            <p className="text-green-500 text-xs font-semibold">↑ 65+</p>
            <p className="text-3xl font-bold text-gray-900">95%</p>
          </div>
            </motion.div>
        

        {/* Right Side: Content */}
        <motion.div 
          variants={fadeIn("right", 0.5)}
          className="lg:w-1/2 space-y-6 px-12"
        >
          <motion.h2 
            variants={textVariant(0.2)}
            className="text-4xl lg:text-5xl font-bold fonts  leading-snug"
          >
            Why Choose Us for Your <br /> Learning Journey
          </motion.h2>
          <motion.p 
            variants={fadeIn("up", 0.4)}
            className="text-gray-600 max-w-xl"
          >
            Explore courses that expand your digital abilities, covering key
            areas like data analytics, design, and marketing for career growth
            and innovation.
          </motion.p>

          {/* Features Grid */}
          <motion.div 
            variants={staggerContainer(0.1, 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 "
          >
            <motion.div variants={fadeIn("up", 0.1)}>
              <h3 className="font-semibold text-lg">Experience Mentors</h3>
              <p className="text-gray-600 text-sm">
                Expert mentors fostering growth through personalized guidance.
              </p>
            </motion.div>
            <motion.div variants={fadeIn("up", 0.2)}>
              <h3 className="font-semibold text-lg">Course Certification</h3>
              <p className="text-gray-600 text-sm">
                Recognized proof of skills and knowledge gained in courses.
              </p>
            </motion.div>
            <motion.div variants={fadeIn("up", 0.3)}>
              <h3 className="font-semibold text-lg">Job Placement</h3>
              <p className="text-gray-600 text-sm">
                Dedicated support to help you find and secure your dream job.
              </p>
            </motion.div>
            <motion.div variants={fadeIn("up", 0.4)}>
              <h3 className="font-semibold text-lg">Lifetime Support</h3>
              <p className="text-gray-600 text-sm">
                Continuous online support for students for ultimate success.
              </p>
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.button 
            variants={fadeIn("up", 0.8)}
            className="mt-4 bg-[var(--primary-color)] fonts cursor-pointer text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-pink-700 transition"
          >
            Explore Courses <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
