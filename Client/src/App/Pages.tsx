import React from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Homepage/Home";
import Navbarr from "./Components/Navbarr";
import Footer from "./Components/Footer";
import CoursesComponents from "./Coursespage/CoursesComponents";
import Login from "./Loginpage/Login";
import Signup from "./Singuppage/Signup";
import Contact from "./Conatactuspage/Contact";
import { useAuthStore } from "./ZustandState/GlobaleState";
import { Toaster } from "react-hot-toast";
import TeacherProfile from "./UsersProfiles/TeacherProfile";
import Admin from "./AdminPanel/Admin";
import LayoutWrapper from "./Components/LayoutWrapper";
import CourseDetails from "./CourseDetailspage/CourseDetails";
import CourseVideo from "./CourseDetailspage/CourseVideo";
import AddCourse from "./ui/AddCourse";
import About from "./Aboutuspage/About";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StudentProfile from "./UsersProfiles/StudentProfile";


function Pages() {
  const { fetchCurrentUser } = useAuthStore();
  
  useEffect(() => {
    fetchCurrentUser(); // get user from token when app loads
  }, []);
  
  const queryClient = new QueryClient();
  return (
    <div>
      <LayoutWrapper>
        <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursesComponents />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/coursedetails/:id" element={<CourseDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/teacher/:id" element={<TeacherProfile />} />
          <Route path="/student/:id" element={<StudentProfile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/coursevideo/:id" element={<CourseVideo />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        </QueryClientProvider>
      </LayoutWrapper>
      <Toaster position="top-center" />
    </div>
  );
}

export default Pages;
