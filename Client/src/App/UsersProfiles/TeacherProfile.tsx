import { useState } from "react";
import { MdOutlineEditNote } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTeacher } from "../Services/TeacherService";
import { ICourse } from "../Types";
import { useAuthStore } from "../ZustandState/GlobaleState";
import UpdateProfileDialogContent from "../Components/UpdateProfileDialogContent";
import UpdateProfileDialog from "../Components/UpdateProfiledialog";
import CourseCard from "../Components/CourseCard";
import api from "@/App/Api/api";
import toast from "react-hot-toast";

interface Teacher {
  _id: string;
  name: string;
  profileimg?: string;
  bio?: string;
  Experiences?: string;
  domain?: string;
  Courses: ICourse[];
}

export default function TeacherProfile() {
  const { id } = useParams();
  const { user } = useAuthStore();

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  // Teacher Query
  const {
    data: teacher,
    isLoading,
    isError,
    error,
  } = useQuery<Teacher>({
    queryKey: ["teacher", id],
    queryFn: () => fetchTeacher(id!),
    enabled: !!id, 
  });

  console.log("the teacher is " , teacher) ;
  
  const isOwner = user?.id === teacher?._id;


  if (isLoading) {
    return <p className="text-center mt-20">Loading profile...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-20 text-red-500">
        Failed to fetch teacher: {(error as Error).message}
      </p>
    );
  }

  if (!teacher) {
    return <p className="text-center mt-20">Teacher not found.</p>;
  }

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-12 mt-20 px-6">
        {/* Left Side */}
        <div className="flex-shrink-0 relative">
          <img
            src={teacher?.profileimg}
            alt={teacher.name}
            className="rounded-full w-58 h-58 object-cover shadow-md bg-[var(--secondary-color)]"
          />
        </div>

        {/* Right Side */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl md:text-5xl font-bold capitalize fonts">
              {teacher.name}
            </h1>

            {isOwner && (
              <MdOutlineEditNote
                className="cursor-pointer text-4xl p-2 bg-[var(--primary-color)] rounded-full text-white"
                onClick={() => setIsModalOpen(true)}
              />
            )}
          </div>

          <h2 className="text-xl md:text-xl font-bold capitalize fonts">
            {teacher.domain || "No domain specified"}
          </h2>

          <p className="font-bold max-w-xl">
            {teacher.bio ||
              "This teacher has not provided a bio yet. Stay tuned!"}
          </p>

          <h3 className="text-xl md:text-2xl font-bold capitalize fonts">
            Experiences
          </h3>
          <p className="max-w-xl font-bold">
            {teacher.Experiences ||
              "This teacher has not shared experiences yet."}
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h3 className="text-xl md:text-2xl font-bold capitalize fonts">
                Available Courses
              </h3>
              {isOwner && (
                <Link to="/addcourse">
                  <button
                    className="bg-[var(--primary-color)] cursor-pointer fonts text-white py-1 px-3 rounded-full"
                    onClick={() => setIsCourseModalOpen(true)}
                  >
                    Add Course
                  </button>
                </Link>
              )}
            </div>
            {teacher.Courses && teacher.Courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teacher.Courses.map((course) => (
                  <CourseCard key={course._id} {...course} />
                ))}
              </div>
            ) : (
              <p className="font-bold">No courses added yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {isOwner && (
        <UpdateProfileDialog
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Update Profile"
        >
          <UpdateProfileDialogContent setIsModalOpen={setIsModalOpen} id={id} CurrentUser={teacher} />
        </UpdateProfileDialog>
      )}
    </section>
  );
}
