import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Banner from "../ui/Banner";
import api from "../Api/api";

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
    return <p className="text-center mt-20">Loading course...</p>;
  }

  return (
    <div className="max-w-[90%] lg:max-w-[70%] flex flex-col gap-12 items-start justify-center mx-auto">
      <div className="flex flex-col items-center lg:items-start gap-8">
        <h1 className="text-4xl lg:text-6xl fonts capitalize">
          {course.title}
        </h1>
        <div className="flex flex-col items-center md:flex-row gap-12">
          <img
            src={course.coverImage}
            alt="course cover"
            className="rounded-lg w-[90%] md:w-1/2 border-12 border-white"
          />
          <div className="flex flex-col gap-4 bg-[#fbecc0] text-black p-12 rounded-xl">
           
            <h1 className="text-4xl fonts capitalize mb-2">
              course information
            </h1>

            <div className="flex items-center justify-between">
              <h5 className="flex items-center gap-2 fonts">
                <FaTimes />
                Duration
              </h5>
              <h5 className="fonts font-semibold capitalize">
                {course.duration}
              </h5>
            </div>

            <div className="flex items-center justify-between">
              <h5 className="flex items-center gap-2 fonts">
                <FaTimes />
                Category
              </h5>
              <h5 className="fonts font-semibold capitalize">
                {course.category}
              </h5>
            </div>

            <Link to={`/coursevideo/${course._id}`}>
              <button className="capitalize text-xl fonts font-bold cursor-pointer py-2 px-4 rounded-full text-white bg-[var(--primary-color)]">
                watch course
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl md:text-4xl fonts capitalize">about the course</h1>
          <p className="font-bold md:max-w-[50%]">{course.about}</p>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl md:text-4xl fonts capitalize">what you will learn</h1>
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
            <img src={course.owner?.profileimg} alt="mentor" className="w-40 h-40 rounded-full object-cover" />
            <h2 className="fonts text-3xl capitalize">{course.owner?.name}</h2>
            <h2 className="fonts text-3xl capitalize">{course.owner?.domain}</h2>
            {/* <h4 className="fonts text-xl">{course.owner?.email}</h4> */}

          </div>
        </div>
      </Link> 

      <Banner />
      </div>
  );
}

export default CourseDetails;
