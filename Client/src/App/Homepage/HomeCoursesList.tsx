import CourseCard from "../Components/CourseCard";
import api from "../Api/api";
import { useState ,useEffect } from "react";
import { Link } from "react-router-dom";
import { ICourse } from "../Types";
import { motion } from "framer-motion";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";
import LoadingSpinner from "../Components/LoadingSpinner";

export default function HomeCoursesList() {
 
  const [Courses ,setCourses] = useState<ICourse[]>([]) ;
  const [loading,setLoading] = useState(true) ; 

  // ✅ Fetch all courses
  const fetchCourses = async () => {
    try {
      const response = await api.get(`/courses/gethomecourses`);
      console.log("Fetched courses:", response.data);
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('all');

  if (loading) {
    return <LoadingSpinner />
  }


  const filteredCourses =
    selectedCategory === 'all'
      ? Courses
      : Courses.filter((course) => course.category === selectedCategory);

    const categories = ["All" ,"ui/ux design " , "software enginering" , "Networking" , "Cyber security"] ;

  return (
    <motion.div 
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="flex items-center flex-col justify-center gap-15 mt-50"
    >
        <motion.h1 
          variants={textVariant(0.2)}
          className="text-4xl lg:text-6xl fonts capitalize"
        >
          our popular courses
        </motion.h1>
      
      <motion.div 
        variants={staggerContainer(0.1, 0.4)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[90%] lg:max-w-[70%]"
      >
        {filteredCourses.map((course : ICourse, i :number) => (
          <motion.div
            key={i}
            variants={fadeIn("up", i * 0.1)}
          >
            <CourseCard {...course} />
          </motion.div>
        ))}
      </motion.div>
      <motion.div variants={fadeIn("up", 0.6)}>
        <Link to ="/courses">
        <button className="bg-[var(--primary-color)] cursor-pointer hover:bg-[var(--secondary-color)] transition duration-400 fonts text-white px-6 py-3 rounded-full capitalize mt-8">
          View All Courses
        </button>
        </Link>
      </motion.div>
    </motion.div>
  );
}