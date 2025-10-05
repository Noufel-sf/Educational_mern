import React from "react";
import Modal from "./UpdateProfiledialog";
import { useAuthStore } from "../ZustandState/GlobaleState";
import { User } from "lucide-react";
import { useState } from "react";
import api from "../Api/api";
import toast from "react-hot-toast";

export default function UpdateProfileDialogContent({ setIsModalOpen, id ,CurrentUser})  {
  const { user } = useAuthStore();
  const UserRole = user?.role;

  const [formData, setFormData] = useState({
    name: CurrentUser?.name,
    domain: CurrentUser?.domain,
    bio: CurrentUser?.bio,
    Experiences: CurrentUser?.Experiences,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
    
  };

  const handleUpdateTeacher = async () => {
    try {
      const res = await api.put(`/teacher/update/${id}`, formData);
      console.log("Teacher updated:", res.data.teacher);
      setIsModalOpen(false);
      toast.success("Profile updated successfully");
      window.location.reload();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };


  const handleUpdateStudent = async () => {
    try {
      const res = await api.put(`/student/update/${id}`, formData);
      console.log("Student updated:", res.data.student);
      setIsModalOpen(false);
      toast.success("Profile updated successfully");
      window.location.reload();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div title="Edit Profile">
      <div className="space-y-4">
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
