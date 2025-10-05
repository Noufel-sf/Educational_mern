import { fetchCurrentUser } from './../../../../Server/Controllers/AuthController';
import { create } from "zustand";
import api from "../Api/api";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher";
  profileimg?: string;
  courses?: string[];
  favouritecourses?: string[];
  bio?: string;
  Experiences?: string;
  domain?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
}

// 🔹 helper function to check profile completeness
const checkTeacherProfile = (user: User | null) => {
  if (user?.role !== "teacher") return;

  const missingFields: string[] = [];
  if (!user.profileimg) missingFields.push("Profile image");
  if (!user.courses?.length) missingFields.push("Courses");
  if (!user.bio) missingFields.push("Bio");
  if (!user.Experiences) missingFields.push("Experiences");
  if (!user.domain) missingFields.push("Domain");

  if (missingFields.length > 0) {
    toast.error(`Complete your profile: ${missingFields.join(", ")}`);
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,

  setUser: (user) => {
    set({ user });
    checkTeacherProfile(user);
  },

  logout: async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
    set({ user: null });
  },

  fetchCurrentUser: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/auth/currentuser", { withCredentials: true });
      set({ user: res.data.user, loading: false });
      checkTeacherProfile(res.data.user); // 🔹 run check here too
    } catch (err) {
      console.error("Failed to fetch user:", err);
      set({ user: null, loading: false });
    }
  },
}));
