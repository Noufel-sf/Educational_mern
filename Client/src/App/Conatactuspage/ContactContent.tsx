import { ArrowRight } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";

function ContactContent() {
  return (
    <motion.div
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      animate="show"
      className="flex container mx-auto flex-col lg:flex-row items-center gap-5 max-w-[90%] lg:w-[60%] md:gap-12 mt-10"
    >
      {/* LEFT CONTENT */}
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          variants={textVariant(0.4)}
          className="text-4xl md:text-6xl font-bold mb-6 fonts"
        >
          Contact Us
        </motion.h2>

        <motion.p
          variants={fadeIn("up", 0.2)}
          className="text-lg text-gray-700 mb-10"
        >
          Have a question, a custom cake idea, or just want to say hello? Fill
          out the form below — we’d love to hear from you!
        </motion.p>

        <motion.form
          variants={fadeIn("up", 0.3)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
        >
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col">
            <label className="font-semibold mb-2">Message</label>
            <textarea
              placeholder="Tell us what’s on your mind..."
              rows={5}
              className="p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-pink-400 resize-none"
            ></textarea>
          </div>

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full cursor-pointer bg-[var(--primary-color)] fonts hover:bg-[var(--secondary-color)] transition text-white font-semibold py-3 px-6 rounded-lg"
            >
              Send Message
            </button>
          </div>
        </motion.form>
      </div>

      {/* RIGHT IMAGE */}
      <motion.div
        variants={fadeIn("left", 0.3)}
        className="relative w-full p-8 lg:w-1/3"
      >
        <img
          src="/aboutus3.png"
          alt="Learning"
          className="w-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

export default ContactContent;
