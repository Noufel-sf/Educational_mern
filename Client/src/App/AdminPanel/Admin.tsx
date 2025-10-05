import { useState, useEffect, useMemo } from "react";
import { User, ICourse, state } from "../Types";
import { BarChart3, Menu, Search, PackageIcon } from "lucide-react";

import { useUsers } from "../hooks/useUsers";
import { useCourses, useDeleteCourse } from "../hooks/useCourses"; // 👈 new hooks
import UsersContent from "./UsersContent";
import CoursesContent from "./CoursesContent";
import DashboardContent from "./DashboardContent";
import SettingsContent from "./SettingsContent";
import DeleteCourseDialog from "../Components/DeleteCourseDialog";
import AdminMainContent from "../Components/AdminMainContent";
import SidebarContent from "../Components/SidebarContent";
import toast from "react-hot-toast";

const Admin = () => {

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [stats, setStats] = useState<state[]>([]);
  const [SelectedCourse, setSelectedCourse] = useState<ICourse | null>(null);

  

  const { data: Allusers = [], isLoading: usersLoading, isError: usersError } = useUsers();

  const Totalteachers = useMemo(
    () => Allusers.filter((u: User) => u.role === "teacher").length,
    [Allusers]
  );
  const Totalstudents = useMemo(
    () => Allusers.filter((u: User) => u.role === "student").length,
    [Allusers]
  );

  // ✅ Courses 
  const {
    data: Courses = [],
    isLoading: coursesLoading,
    isError: coursesError,
  } = useCourses();

  const deleteCourseMutation = useDeleteCourse();

  const Totalcourses = useMemo(() => Courses.length, [Courses]);

  // ✅ Stats
  useEffect(() => {
    setStats([
      { title: "Total Teachers", value: Totalteachers, color: "#fceedf" },
      { title: "Total Students", value: Totalstudents, color: "#ea4c89" },
      { title: "Total Courses", value: Totalcourses, color: "#009d77" },
    ]);
  }, [Totalteachers, Totalstudents, Totalcourses]);



  // Delete course
  const handleDeleteCourse = (course: ICourse) => {
    setSelectedCourse(course);
    setShowConfirm(true);
  };

  const CancelDelete = () => {
    setShowConfirm(false);
    setSelectedCourse(null);
  };


  const DeleteCourse = async () => {
    if (!SelectedCourse) return;

    deleteCourseMutation.mutate(SelectedCourse._id, {
      onSuccess: () => {
        setShowConfirm(false);
        setSelectedCourse(null);
        toast.success("Course deleted successfully!");
      },
      onError: () => {
        toast.error("Failed to delete course!");
      },
    });
  };


  const renderContent = () => {
    if (usersLoading || coursesLoading) return <p>Loading...</p>;
    if (usersError || coursesError) return <p>Error loading data</p>;

    switch (activeTab) {
      case "Dashboard":
        return <DashboardContent stats={stats} />;
      case "Courses":
        return (
          <CoursesContent
            Courses={Courses}
            handleDeleteCourse={handleDeleteCourse}
          />
        );
      case "Users":
        return <UsersContent Allusers={Allusers} />;
      case "Settings":
        return <SettingsContent />;
      default:
        return <DashboardContent stats={stats} />;
    }
  };

  const sidebarItems = [
    { id: "Dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "Courses", label: "Courses", icon: PackageIcon },
    { id: "Users", label: "Users", icon: PackageIcon },
    { id: "Settings", label: "Settings", icon: PackageIcon },
  ];

  return (
    <div className="flex h-screen  fonts">
      {/* Sidebar */}
      <SidebarContent
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        sidebarItems={sidebarItems}
        setActiveTab={setActiveTab}
      />

      {/* Main Content */}
      {
        <AdminMainContent content ={renderContent()} 
          setSidebarOpen={setSidebarOpen}
        />
      }

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Confirm delete dialog */}
      {showConfirm && SelectedCourse && (
        <DeleteCourseDialog
          showConfirm={showConfirm}
          selectedCourse={SelectedCourse}
          CancelDelete={CancelDelete}
          DeleteCourse={DeleteCourse}
        />
      )}
    </div>
  );
};

export default Admin;
