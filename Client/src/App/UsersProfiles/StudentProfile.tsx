import React, { useState } from "react";
import { MdOutlineEditNote } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import api from "@/App/Api/api";
import UpdateProfileDialog from "../Components/UpdateProfiledialog";
import UpdateProfileDialogContent from "../Components/UpdateProfileDialogContent";
import { useAuthStore } from "../ZustandState/GlobaleState";
import toast from "react-hot-toast";

function StudentProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, setUser } = useAuthStore();
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
  });
  
  const handleUpdateStudent = async () => {
    try {
      console.log("Updating student with data:", formData);
      const res = await api.put(`/student/update/${user?.id}`, formData);
      setUser(res.data.user);
      setIsModalOpen(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };
  console.log(user);
  

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-12 mt-20 px-6">
      {/* Left Side */}
      <div className="flex-shrink-0 relative">
        <img
          src={"/profile.png"}
          alt={user?.name}
          className="rounded-full w-58 h-58 object-cover shadow-md bg-[var(--secondary-color)]"
        />
      </div>

      {/* Right Side */}
      <div className="flex-1 space-y-6">
        <div className="flex items-start flex-col gap-4">
          <MdOutlineEditNote
            className="cursor-pointer text-4xl p-2 bg-[var(--primary-color)] rounded-full text-white"
            onClick={() => setIsModalOpen(true)}
          />
          <h1 className="text-5xl fonts capitalize">{user?.name}</h1>
          <p className="text-2xl font-bold">{user?.bio}</p>
          </div>
      </div>
      
      <UpdateProfileDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"Update Profile"}
      >
        <UpdateProfileDialogContent 
          setIsModalOpen={setIsModalOpen}
          id={user?.id}
          CurrentUser={user}
        />
      </UpdateProfileDialog>
    </div>
  );
}

export default StudentProfile;
