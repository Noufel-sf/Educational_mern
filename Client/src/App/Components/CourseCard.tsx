import { Clock, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function CourseCard({
  coverImage,
  category,
  title,
  duration,
  lectures,
  owner,
  price,
  _id,
}) {
  return (
    <Link to={`/coursedetails/${_id}`}>
      <div className="bg-[#f5effc] shadow-md rounded-2xl cursor-pointer overflow-hidden hover:shadow-lg transition p-3 fonts">
        {/* Course Thumbnail */}
        <div className="relative w-full h-64 rounded-xl overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
          />
          <span className="absolute top-2 right-2 bg-white text-gray-700 text-xs font-medium px-2 py-1 rounded-lg shadow">
            {category}
          </span>
        </div>

        {/* Course Info */}
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-base leading-snug line-clamp-2">
              {title}
            </h3>
            <button className="bg-[var(--primary-color)] fonts text-white px-6 cursor-pointer py-2 rounded-full capitalize hover:bg-[var(--secondary-color)]">
              view details
            </button>
          </div>

          {/* Duration + Lectures */}
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <div className="flex items-center gap-1">
              <Clock size={14} /> {duration}
            </div>
            <div className="flex items-center gap-1">
              <BookOpen size={14} /> {lectures} lectures
            </div>
          </div>

          {/* Instructor + Price */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <img
                src={owner?.profileimg}
                alt={owner?.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm text-gray-700">{owner?.name}</span>
            </div>
            <span className="text-pink-600 font-bold">${price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
