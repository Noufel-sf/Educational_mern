import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../ZustandState/GlobaleState";
import api from "../Api/api";

export default function AddCourseForm() {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const { user } = useAuthStore();

  const [whatYouWillLearn, setWhatYouWillLearn] = useState<string[]>([""]);
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [curriculum, setCurriculum] = useState<
    { sectionTitle: string; lessons: string[] }[]
  >([{ sectionTitle: "", lessons: [""] }]);

const Add_Course_to_Teacher = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("owner", user ? user.id : "");
    formData.append("about", about);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("duration", duration);

    // ✅ Only append files if they exist
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }
    if (video) {
      formData.append("video", video);
    }

    formData.append("whatYouWillLearn", JSON.stringify(whatYouWillLearn));
    formData.append("requirements", JSON.stringify(requirements));
    formData.append("curriculum", JSON.stringify(curriculum));

    const response = await api.post("/courses/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Your course will be reviewed by the admin before being published");
    console.log("Course added successfully:", response.data);
  } catch (error) {
    console.error("Error adding course:", error);
    toast.error("Failed to add course");
  }
};


  return (
    <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-2xl mt-10 fonts bg-[var(--primary-color)]">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center text-white ">
        Add New Course
      </h1>

      <form onSubmit={Add_Course_to_Teacher} className="space-y-6">
        {/* Basic Inputs */}
        <div>
          <label className="block font-semibold mb-1 text-gray-800 ">
            Course Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded-md bg-white"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1  ">
            About the Course
          </label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full border p-2 rounded-md bg-white"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1  ">
              Price ($)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border p-2 rounded-md bg-white"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">
              Duration
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 6h 30m"
              className="w-full border p-2 rounded-md  bg-white"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1  ">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded-md  bg-white"
            required
          />
        </div>
      <label htmlFor="coverImage" className="block font-semibold mb-1  ">
        Cover Image
      </label>
        <input
            type="file"
            onChange={(e) => setCoverImage(e.target.files ? e.target.files[0] : null)}
            className="w-full border p-2 rounded-md  "
        />
      <label htmlFor="video" className="block font-semibold mb-1  ">
        Video
      </label>
        <input
        type="file"
        onChange={(e) => setVideo(e.target.files ? e.target.files[0] : null)}
        className="w-full border p-2 rounded-md  bg-white"
        />

        {/* What You Will Learn */}
        <div>
          <label className="block font-semibold mb-2  ">
            What You’ll Learn
          </label>
          {whatYouWillLearn.map((item, idx) => (
            <input
              key={idx}
              type="text"
              value={item}
              onChange={(e) => {
                const newArr = [...whatYouWillLearn];
                newArr[idx] = e.target.value;
                setWhatYouWillLearn(newArr);
              }}
              placeholder={`Learning Point ${idx + 1}`}
              className="w-full border p-2 mb-2 rounded-md bg-white"
            />
          ))}
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
            onClick={() => setWhatYouWillLearn([...whatYouWillLearn, ""])}
          >
            + Add Point
          </button>
        </div>

        {/* Requirements */}
        <div>
          <label className="block font-semibold mb-2  ">
            Requirements
          </label>
          {requirements.map((item, idx) => (
            <input
              key={idx}
              type="text"
              value={item}
              onChange={(e) => {
                const newArr = [...requirements];
                newArr[idx] = e.target.value;
                setRequirements(newArr);
              }}
              placeholder={`Requirement ${idx + 1}`}
              className="w-full border p-2 mb-2 rounded-md bg-white "
            />
          ))}
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
            onClick={() => setRequirements([...requirements, ""])}
          >
            + Add Requirement
          </button>
        </div>

        {/* Curriculum */}
        <div>
          <label className="block font-semibold mb-2  ">
            Curriculum
          </label>
          {curriculum.map((section, idx) => (
            <div
              key={idx}
              className="border p-4 rounded-lg mb-4 dark:border-gray-700"
            >
              <input
                type="text"
                value={section.sectionTitle}
                onChange={(e) => {
                  const newArr = [...curriculum];
                  newArr[idx].sectionTitle = e.target.value;
                  setCurriculum(newArr);
                }}
                placeholder="Section Title"
                className="w-full border p-2 mb-2 rounded-md"
              />
              {section.lessons.map((lesson, lIdx) => (
                <input
                  key={lIdx}
                  type="text"
                  value={lesson}
                  onChange={(e) => {
                    const newArr = [...curriculum];
                    newArr[idx].lessons[lIdx] = e.target.value;
                    setCurriculum(newArr);
                  }}
                  placeholder={`Lesson ${lIdx + 1}`}
                  className="w-full border p-2 mb-2 rounded-md"
                />
              ))}
              <button
                type="button"
                className="px-3 py-1 bg-green-500 text-white rounded-md cursor-pointer"
                onClick={() => {
                  const newArr = [...curriculum];
                  newArr[idx].lessons.push("");
                  setCurriculum(newArr);
                }}
              >
                + Add Lesson
              </button>
            </div>
          ))}
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
            onClick={() =>
              setCurriculum([
                ...curriculum,
                { sectionTitle: "", lessons: [""] },
              ])
            }
          >
            + Add Section
          </button>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer py-3 bg-[var(--primary-color)] text-white font-bold rounded-md"
        >
          Create Course
        </button>
      </form>
    </div>
  );
}
