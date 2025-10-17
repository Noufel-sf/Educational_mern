import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuthStore } from "../ZustandState/GlobaleState";
import { useTheme } from "../Contexts/ThemeContext";



function Navbarr() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuthStore();
  const UserRole = user?.role ; 
  console.log("user is ", user);


  return (
    <nav className={`w-full lg:w-[60%] mx-auto flex items-center justify-between py-12 px-4 relative fonts`}>
      <div className="text-2xl font-bold app-impact-font tracking-widest">
        <Link to="/">
          <img src="/logo.png" alt="Logo" />
        </Link>
      </div>

      {/* Hamburger Icon */}
      <div className="flex gap-5">
        <button
          className={`lg:hidden justify-center items-center z-50 ${
            theme === "dark" ? "text-white" : "text-black"
          } text-3xl cursor-pointer`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

        {/* Dark/Light Toggle for mobile */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-2xl lg:hidden cursor-pointer hover:text-gray-500 transition"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
        </button>
      </div>

      {/* Nav Links */}
      <ul
        className={`
          flex-col gap-8 text-lg font-semibold z-[103] ${
            theme === "dark" ? "bg-[#181818]" : "bg-gray-100"
          } rounded-lg p-8 absolute top-full left-0 w-full shadow-lg transition-all duration-300
          ${open ? "flex" : "hidden"}
          lg:flex lg:flex-row lg:static lg:bg-transparent lg:shadow-none lg:p-0 lg:w-auto lg:items-center
        `}
        onClick={() => setOpen(false)}
      >

        <li>
          <Link
            to="/courses"
            className="hover:text-gray-500 transition cursor-pointer text-2xl"
          >
            Courses
          </Link>
        </li>
        <li>
          <Link
            to="/admin"
            className="hover:text-gray-500 transition cursor-pointer text-2xl"
          >
            Admin
          </Link>
        </li>
 
        <li>
          <Link
            to="/about"
            className="hover:text-gray-500 transition cursor-pointer text-2xl"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="hover:text-gray-500 transition cursor-pointer text-2xl"
          >
            Contact
          </Link>
        </li>
        <li>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-2xl hidden lg:block cursor-pointer hover:text-gray-500 transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </li>

        {user ? (
          <div className="flex items-center gap-3">
            <Link to={`/${UserRole}/${user.id}`}>
              <img
                src={user.profileimg}
                alt={user.name}
                className="w-10 h-10 object-cover rounded-full"
              />
            </Link>
            <button
              onClick={logout}
              className="capitalize text-xl fonts font-bold cursor-pointer py-2 px-4 rounded-full text-white bg-[var(--primary-color)]"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <li>
              <Link to="/login">
                <button className="capitalize text-xl fonts font-bold cursor-pointer py-2 px-4 rounded-full text-white bg-[var(--primary-color)]">
                  Log In
                </button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <button className="capitalize text-xl fonts font-bold cursor-pointer py-2 px-4 rounded-full text-white bg-[var(--primary-color)]">
                  Sign Up
                </button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbarr;
