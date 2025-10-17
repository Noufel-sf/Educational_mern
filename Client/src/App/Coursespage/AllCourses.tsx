import { motion } from "framer-motion";
import { fadeIn, staggerContainer, textVariant } from "../utils/motion";
import CourseCard from "../Components/CourseCard";
import { ICourse } from "../Types";
import { usePublishedCourses } from "../hooks/useCourses";
import LoadingSpinner from "../Components/LoadingSpinner";
import { useState } from "react";

export default function AllCourses() {
  const { data: courses = [], isLoading, isError } = usePublishedCourses();
  const [selectedCategory, setSelectedCategory] = useState("All");

  if (isLoading) {
    return (
       <LoadingSpinner/>
    );
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl text-red-600 font-semibold text-center mt-40 fonts"
      >
        Failed to load courses. Please try again later.
      </motion.div>
    );
  }

  // ✅ Filter courses by category
  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter(
          (course: ICourse) =>
            course.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const categories = [
    "All",
    "UI/UX Design",
    "Software Engineering",
    "Networking",
    "Cyber Security",
  ];

  return (
    <motion.div
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center gap-10 py-16"
    >
      {/* Title */}
      <h1
        className="text-4xl lg:text-6xl fonts capitalize text-center"
      >
        Explore Our Courses
      </h1>

      {/* Categories */}
      <ul className="flex items-center flex-wrap p-4 gap-4 justify-center">
        {categories.map((cat) => (
          <li
            key={cat}
            className={`capitalize text-lg lg:text-xl fonts font-semibold cursor-pointer py-2 px-6 rounded-full transition duration-300 ${
              selectedCategory === cat
                ? "bg-[var(--primary-color)] text-white"
                : "bg-[var(--secondary-color)] text-white hover:text-[var(--primary-color)]"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>

      {/* Courses Grid */}
      <motion.div
        variants={staggerContainer(0.1, 0.8)}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full px-4"
      >
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course: ICourse, i: number) => (
            <motion.div key={course._id} variants={fadeIn("up", i * 0.1)}>
              <CourseCard {...course} />
            </motion.div>
          ))
        ) : (
          <motion.p
            variants={fadeIn("up", 0.2)}
            className="text-center col-span-full text-xl text-gray-600"
          >
            No courses found in{" "}
            <span className="font-bold">{selectedCategory}</span>
          </motion.p>
        )}
      </motion.div>

      {/* View All Button */}
      {selectedCategory !== "All" && (
        <button
          onClick={() => setSelectedCategory("All")}
          className="bg-[var(--primary-color)] fonts text-white px-8 py-3 rounded-full capitalize mt-8 hover:opacity-90 transition"
        >
          View All Courses
        </button>
      )}
    </motion.div>
  );
}
