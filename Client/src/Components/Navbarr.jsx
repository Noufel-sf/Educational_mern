import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";
import { useCart } from "./CartContext";

function Navbarr() {
  const [open, setOpen] = useState(false);
  const { cartItemCount ,logout ,user } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logbutton, setlogbutton] = useState("");
  console.log("user", user);

   const handleLogin = () => {
    if (isLoggedIn) {
      setlogbutton("logout");
      setIsLoggedIn(false);
    } else {
      logout();
      setlogbutton("");
    }
  };


  return (
    <nav className="w-full bg-white z-50 fixed top-0 left-0 p-5">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="text-5xl font-extrabold text-[var(--secondary-color)]">
          <span className="text-[var(--primary-color)]">book</span>store
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-3xl text-[var(--primary-color)]">
            {open ? "✖" : "☰"}
          </button>
        </div>

        {/* Menu */}
        <div
          className={`${
            open ? "block" : "hidden"
          } md:flex absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent p-5 md:p-0 transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            {[
              { name: "Home", path: "/" },
              { name: "Books", path: "/cakes" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
              { name: "Admin", path: "/admin" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                className="uppercase text-2xl font-semibold text-[var(--secondary-color)] hover:text-[var(--primary-color)]"
              >
                {link.name}
              </Link>
            ))}

                      {/* Auth Buttons */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="title capitalize py-2 px-6 bg-black text-white rounded-full font-bold text-xl hover:bg-[var(--primary-color)] transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="title capitalize py-2 px-6 bg-black text-white rounded-full font-bold text-xl hover:bg-[var(--primary-color)]"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="h-8 w-8 bg-gray-300 cursor-pointer rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
          )}
          <button
            onClick={handleLogin}
            className="text-sm cursor-pointer p-3  rounded-full capitalize font-bold hover:text-[var(--primary-color)] transition duration-300"
          >
            {logbutton}
          </button>

            {/* Cart icon */}
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="relative text-[var(--secondary-color)] hover:text-[var(--primary-color)] text-2xl"
            >
              <FaBagShopping />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--primary-color)] text-white rounded-full px-2 text-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

    
    </nav>
  );
}

export default Navbarr;
