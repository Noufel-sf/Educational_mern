import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// ✅ Simple fade-up animation
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutusContent() {
  return (
    <section className="py-16">
      {/* First Section */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="flex container mx-auto flex-col lg:flex-row items-center gap-5 md:gap-12 mt-20"
      >
        {/* Left: Image */}
        <motion.div
          variants={fadeUp}
          className="relative w-full p-8 lg:w-1/2"
        >
          <img
            src="/aboutus2.png"
            alt="Learning"
            className="rounded-2xl w-full object-cover shadow-md"
          />
          <motion.div
            variants={fadeUp}
            className="absolute bottom-12 left-12 p-5 bg-white shadow-lg lg:p-8 rounded-xl"
          >
            <p className="text-sm text-gray-500">Average Class Completion Rate</p>
            <p className="text-green-500 text-xs font-semibold">↑ 65+</p>
            <p className="text-3xl font-bold text-gray-900">95%</p>
          </motion.div>
        </motion.div>

        {/* Right: Content */}
        <motion.div
          variants={fadeUp}
          className="lg:w-1/2 space-y-6 px-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold fonts leading-snug">
            Why Choose Us for Your <br /> Learning Journey
          </h2>
          <p className="text-gray-600 max-w-xl">
            Explore courses that expand your digital abilities, covering key
            areas like data analytics, design, and marketing for career growth
            and innovation.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Experience Mentors",
                desc: "Expert mentors fostering growth through personalized guidance.",
              },
              {
                title: "Course Certification",
                desc: "Recognized proof of skills and knowledge gained in courses.",
              },
              {
                title: "Job Placement",
                desc: "Dedicated support to help you find and secure your dream job.",
              },
              {
                title: "Lifetime Support",
                desc: "Continuous online support for students for ultimate success.",
              },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            variants={fadeUp}
            className="mt-4 bg-[var(--primary-color)] fonts cursor-pointer text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-pink-700 transition"
          >
            Explore Courses <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Second Section */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="flex container mx-auto flex-col lg:flex-row items-center gap-5 md:gap-12 mt-20"
      >
        {/* Right: Content */}
        <motion.div
          variants={fadeUp}
          className="lg:w-1/2 space-y-6 px-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold fonts leading-snug">
            Learn With Confidence <br /> Anytime, Anywhere
          </h2>
          <p className="text-gray-600 max-w-xl">
            Our platform is designed to provide flexible, high-quality learning
            that fits your lifestyle and career goals.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Flexible Learning",
                desc: "Access courses anytime with lifetime updates.",
              },
              {
                title: "Interactive Classes",
                desc: "Engage with practical projects and real-world cases.",
              },
              {
                title: "Career Growth",
                desc: "Gain skills that directly boost your career path.",
              },
              {
                title: "Community Support",
                desc: "Join a network of learners and mentors worldwide.",
              },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            variants={fadeUp}
            className="mt-4 bg-[var(--primary-color)] fonts cursor-pointer text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-pink-700 transition"
          >
            Explore Courses <ArrowRight size={18} />
          </motion.button>
        </motion.div>

        {/* Left: Image */}
        <motion.div
          variants={fadeUp}
          className="relative w-full p-8 lg:w-1/2"
        >
          <img
            src="/contactus.png"
            alt="Learning"
            className="rounded-2xl w-full object-cover shadow-md"
          />
          <motion.div
            variants={fadeUp}
            className="absolute bottom-12 left-12 p-5 bg-white shadow-lg lg:p-8 rounded-xl"
          >
            <p className="text-sm text-gray-500">Trusted by Students</p>
            <p className="text-green-500 text-xs font-semibold">↑ 1200+</p>
            <p className="text-3xl font-bold text-gray-900">Active Learners</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
