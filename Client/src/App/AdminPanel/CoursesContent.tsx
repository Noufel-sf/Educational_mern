import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../Api/api";
import { ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";
import { ICourse } from "../Types";

const CourseRow = ({ course , handleDeleteCourse }: { course: ICourse , handleDeleteCourse: (course: ICourse) => void }) => {
  const [status, setStatus] = useState(course.state);
  const [open, setOpen] = useState(false);

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };
  const confirm_course = async () => {
    try {
      await api.put(`/courses/${course._id}`, { state: "published" });
      setStatus("published");
      toast.success("Course confirmed and published!");
    } catch (error) {
      console.error("Error confirming course:", error);
    }
  };

  const statusStyles = {
    draft: "bg-orange-200 text-orange-800",
    published: "bg-green-200 text-green-800",
    archived: "bg-gray-200 text-gray-800",
  };

  return (
    <>
      <tr className="hover:bg-gray-50">
        {/* Cover */}
        <td className="px-6 py-4 whitespace-nowrap">
          <img
            src={course.coverImage}
            alt={course.title}
            className="w-32 h-20 object-cover rounded shadow-sm"
          />
        </td>

        {/* Title */}
        <td className="px-5 py-4 whitespace-nowrap font-bold text-gray-900">
          {course.title}
        </td>

        {/* Status Dropdown */}
        <td className="px-6 py-4 whitespace-nowrap">
          <select
            value={status}
            onChange={handleStatusChange}
            className={`px-3 py-1 text-xs rounded-full font-semibold focus:outline-none ${statusStyles[status]}`}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </td>

        {/* Price */}
        <td className="px-5 py-4 whitespace-nowrap text-green-600 font-bold">
          ${course.price}
        </td>

        {/* Actions */}
        <td className="px-5 py-4 whitespace-nowrap text-right">
          <div className="flex items-center justify-end space-x-2">
            <button className="text-red-600 hover:text-red-900 cursor-pointer"
              onClick={() => handleDeleteCourse(course)}
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button className="bg-[var(--primary-color)] rounded-2xl p-2 text-white cursor-pointer"
              onClick={confirm_course}
            >
              confirm course
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-700 cursor-pointer hover:text-black"
            >
              {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </td>
      </tr>

      {/* Expandable Review Section */}
      {open && (
        <tr>
          <td colSpan={5} className="px-6 py-6 bg-gray-50">
            <div className="space-y-6">
              
              {/* Basics */}
              <div>
                <h4 className="font-semibold text-lg text-gray-800">Course Information</h4>
                <p><span className="font-medium">Category:</span> {course.category}</p>
                <p><span className="font-medium">Duration:</span> {course.duration}</p>
                <p><span className="font-medium">Instructor name:</span> {course.owner?.name}</p>
                <p><span className="font-medium">Instructor email:</span> {course.owner?.email}</p>
              </div>

              {/* About */}
              <div>
                <h4 className="font-semibold text-lg text-gray-800">About</h4>
                <p className="text-gray-700">{course.about}</p>
              </div>

              {/* What You Will Learn */}
              <div>
                <h4 className="font-semibold text-lg text-gray-800">What You Will Learn</h4>
                <ul className="list-disc ml-6 text-gray-700">
                  {course.whatYouWillLearn.map((point :string, idx :number) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h4 className="font-semibold text-lg text-gray-800">Requirements</h4>
                <ul className="list-disc ml-6 text-gray-700">
                  {course.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Curriculum */}
              <div>
                <h4 className="font-semibold text-lg text-gray-800">Curriculum</h4>
                {course.curriculum.map((section : { sectionTitle: string; lessons: string[] }, idx : number) => (
                  <div key={idx} className="mb-3">
                    <p className="font-medium">{section.sectionTitle}</p>
                    <ul className="list-disc ml-6 text-gray-600">
                      {section.lessons.map((lesson :string, lIdx :number) => (
                        <li key={lIdx}>{lesson}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Video Preview */}
              <div>
                <h4 className="font-semibold text-lg text-gray-800 mb-4">Course Video</h4>
                <video controls className="w-full rounded shadow">
                  <source src={course.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const CoursesContent = ({
  Courses,
  handleDeleteCourse,
}: {
  Courses: ICourse[];
  handleDeleteCourse: (course: ICourse) => void;
}) => {


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl text-[var(--primary)] font-extrabold capitalize">Courses</h1>
          <p className="text-gray-600 text-xl mt-2 font-bold">Manage website courses</p>
        </div>
     
      </div>
       
        <div className="bg-white shadow-sm border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-2xl text-[var(--primary)] font-extrabold">All Courses</h3>
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Products..."
                // onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xl font-extrabold text-gray-500 uppercase">cover</th>
                <th className="px-6 py-3 text-left text-xl font-extrabold text-gray-500 uppercase">title</th>
                <th className="px-6 py-3 text-left text-xl font-extrabold text-gray-500 uppercase">state</th>
                <th className="px-6 py-3 text-left text-xl font-extrabold text-gray-500 uppercase">Price</th>
                <th className="px-20 py-3 text-right text-xl font-extrabold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Courses.map((course : ICourse) => (
                <CourseRow
                    key={course._id}
                    course={course}
                    handleDeleteCourse={handleDeleteCourse}
                />
              ))}
            </tbody>
          </table>
        </div>
    
    </div>
  );
};

export default CoursesContent;
