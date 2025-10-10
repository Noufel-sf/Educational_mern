import React from "react";
import Modal from "./UpdateProfiledialog";
import { useAuthStore } from "../ZustandState/GlobaleState";
import { User } from "lucide-react";
import { useState } from "react";
import api from "../Api/api";
import { FiEdit } from "react-icons/fi";
import toast from "react-hot-toast";

export default function UpdateProfileDialogContent({ setIsModalOpen, id ,CurrentUser})  {
  const { user } = useAuthStore();
  const UserRole = user?.role;

  const [formData, setFormData] = useState({
    name: CurrentUser?.name,
    domain: CurrentUser?.domain,
    bio: CurrentUser?.bio,
    Experiences: CurrentUser?.Experiences,
    profileimg: CurrentUser?.profileimg,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };


  const [preview, setPreview] = useState<string | null>(
    CurrentUser?.profileimg || null
  );
  
  const [profileImgFile, setProfileImgFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
      setProfileImgFile(file);
      setFormData({ ...formData, profileimg:file});
    }
  };

const handleUpdateTeacher = async () => {
  try {
    const form = new FormData();
    form.append("name", formData.name || "");
    form.append("domain", formData.domain || "");
    form.append("bio", formData.bio || "");
    form.append("Experiences", formData.Experiences || "");
    if (profileImgFile) form.append("profileimg", profileImgFile);

    const res = await api.put(`/teacher/update/${id}`, form);

    console.log("Teacher updated:", res.data.teacher);
    toast.success("Profile updated successfully");
    setIsModalOpen(false);
    // Optionally refresh or update Zustand state here
  } catch (err) {
    console.error("Update failed:", err);
    toast.error("Failed to update profile");
  }
};


const handleUpdateStudent = async () => {
  try {
    const form = new FormData();
    form.append("name", formData.name || "");
    form.append("bio", formData.bio || "");
    if (profileImgFile) form.append("profileimg", profileImgFile);

    const res = await api.put(`/student/update/${id}`, form );

    console.log("Student updated:", res.data.student);
    toast.success("Profile updated successfully");
    setIsModalOpen(false);
  } catch (err) {
    console.error("Update failed:", err);
    toast.error("Failed to update profile");
  }
};



  return (
    <div title="Edit Profile">
      <div className="space-y-4">


         <div className="relative w-24 h-24">
          <img
            src={preview || "/profile.png"}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <label
            htmlFor="profile-upload"
            className="absolute bottom-0 right-0 bg-[var(--primary-color)] text-white p-2 rounded-full cursor-pointer hover:bg-[var(--secondary-color)]"
          >
            <FiEdit />
          </label>
          <input
            id="profile-upload"
            type="file"
            name="profileimg"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={formData.name || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {UserRole === "teacher" && (
          <input
            type="text"
            name="domain"
            placeholder="Domain"
            value={formData.domain || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        )}
        {UserRole === "teacher" && (
          <textarea
            name="Experiences"
            placeholder="Experiences"
            value={formData.Experiences || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        )}



        <button
          onClick={UserRole === "teacher" ? handleUpdateTeacher : handleUpdateStudent}
          className="w-full bg-[var(--primary-color)] cursor-pointer text-white py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
