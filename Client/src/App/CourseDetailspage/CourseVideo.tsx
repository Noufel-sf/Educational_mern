import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AskedQuestions from "../ui/AskedQeustions";
import { ICourse } from "../Types";
import api from "../Api/api";

export default function VideoPage() {
  const { id } = useParams(); // course id from URL
  const [course, setCourse] = useState<ICourse | null>(null);

    // fetching the course information
    useEffect(() => {
      const fetchCourse = async () => {
        try {
          const res = await api.get(`/courses/${id}`);
          setCourse(res.data.course);
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 fonts">
      {/* Title */}
      <h1 className="text-3xl md:text-6xl font-bold text-center mb-4 fonts">
        {course.title}
      </h1>

      {/* Instructor + Price */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6 w-full max-w-6xl">
        <div className="text-center md:text-left">
          <h2 className="text-xl fonts">
             <span className="font-semibold text-4xl">Instructor: {course.owner?.name}</span>
          </h2>
          <p className="text-gray-600 fonts">{course.owner?.email}</p>
               <div className="flex gap-4 items-center">
          
        </div>
        </div>
        <div className="text-center md:text-right">
          <h2 className="text-xl fonts">
            <span className="capitalize text-xl fonts font-bold cursor-pointer py-2 px-4 rounded-full text-white bg-[var(--primary-color)]">{course.category}</span>
          </h2>
        </div>
      </div>

      {/* Video Player */}
      <div className="w-full max-w-6xl aspect-video rounded-xl shadow-lg overflow-hidden">
        <video
          src={course.video} // fallback if no video in db
          controls
          className="w-full h-full object-cover"
        />
      </div>

      {/* Course Description */}
      <div className="w-full max-w-6xl mt-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">About this course</h2>
        <p className=" leading-relaxed">{course.about}</p>
        <p className=" leading-relaxed mt-5">
          <span className="font-bold text-3xl ">What you'll learn:</span>
          <ul className="list-disc list-inside">
            {course.whatYouWillLearn.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </p>
   
      </div>

      {/* Asked Questions section */}
      <div className="w-full max-w-6xl mt-12">
        <AskedQuestions />
      </div>
    </div>
  );
}
