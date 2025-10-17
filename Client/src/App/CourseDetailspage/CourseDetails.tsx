import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaTimes,
  FaClock,
  FaUserFriends,
  FaLevelUpAlt,
  FaBookOpen,
  FaCalendarAlt,
} from "react-icons/fa";
import Banner from "../ui/Banner";
import api from "../Api/api";
import LoadingSpinner from "../Components/LoadingSpinner";

function CourseDetails() {
  const { id } = useParams(); // course id from URL
  const [course, setCourse] = useState<any>(null);

  // fetching the course information
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data.course);
        console.log("the course is ", res.data.course);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-[90%] lg:max-w-[60%] flex flex-col gap-12 items-start justify-center mx-auto">
      <div className="flex flex-col items-center lg:items-start gap-8">
        <h1 className="text-4xl lg:text-6xl fonts capitalize">
          {course.title}
        </h1>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 rounded-2xl p-6 md:p-2  transition-colors duration-300">
          {/* LEFT: Course Image */}
          <div className=" flex justify-center items-center">
            <img
              src={course.coverImage}
              alt="Course cover"
              className="rounded-2xl shadow-md object-cover h-full   flex-1"
            />
          </div>

          {/* RIGHT: Info Card */}
          <div className="  flex-shrink-0 bg-amber-200 rounded-2xl p-8 flex flex-col justify-between shadow-inner">
            {/* Price */}
            <h2 className="text-3xl font-bold text-pink-600 mb-4">
              ${course.price?.toFixed(2) ?? "140.00"}
            </h2>

            {/* Course Info */}
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Course Information
            </h3>

            <div className="flex flex-col gap-4 text-gray-700">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FaLevelUpAlt /> Level
                </span>
                <span className="font-semibold capitalize">{course.level}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FaBookOpen /> Lectures
                </span>
                <span className="font-semibold">
                  {course.lectures ?? "20 lectures"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FaClock /> Duration
                </span>
                <span className="font-semibold">{course.duration}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FaUserFriends /> Total Enrolled
                </span>
                <span className="font-semibold">
                  {course.enrolled ?? "150+ Students"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FaCalendarAlt /> Last Update
                </span>
                <span className="font-semibold">
                  {course.updatedAt ?? "September 17, 2024"}
                </span>
              </div>
            </div>

            {/* Button */}
            <Link
              to={`/coursevideo/${course._id}`}
              className="mt-6 inline-flex items-center justify-center gap-3 bg-pink-600 hover:bg-pink-700 text-white text-md font-semibold py-3 px-8 rounded-full transition-all duration-300 w-fit"
            >
              Start Learning →
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl md:text-4xl fonts capitalize">
            about the course
          </h1>
          <p className="font-bold md:max-w-[50%]">{course.about}</p>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl md:text-4xl fonts capitalize">
            what you will learn
          </h1>
          <ul className="list-disc pl-6 font-bold max-w-[50%]">
            {course.whatYouWillLearn.map((point: string, idx: number) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      </div>

      <Link to={`/teacher/${course.owner?._id}`}>
        <div className="flex flex-col items-start md:flex-row gap-5 cursor-pointer">
          <div className="flex flex-col gap-3 bg-[var(--primary-color)] items-center rounded-xl p-12 ">
            <img
              src={course.owner?.profileimg}
              alt="mentor"
              className="w-40 h-40 rounded-full object-cover"
            />
            <h2 className="fonts text-3xl capitalize">{course.owner?.name}</h2>
            <h2 className="fonts text-3xl capitalize">
              {course.owner?.domain}
            </h2>
            {/* <h4 className="fonts text-xl">{course.owner?.email}</h4> */}
          </div>
        </div>
      </Link>

      <Banner />
    </div>
  );
}

export default CourseDetails;
