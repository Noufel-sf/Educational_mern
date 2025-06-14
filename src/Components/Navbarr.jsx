import React, { useState } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";
import { useCart } from './CartContext';
// import Headerimg from "../assests/Headerimg.png"; // Adjust the path as necessary
function Navbarr() {
  const [open, setOpen] = useState(false);
  const { cartItemCount } = useCart(); // Get the count from context

  return (
    <nav className="lg:px-4  flex items-center  justify-between mx-auto py-12"
    //  style={{
    //            backgroundImage: `url(${Headerimg})`,
    //            backgroundSize: "cover",
    //             backgroundPosition: "right",
    //            backgroundRepeat: "no-repeat",
    //            backgroundAttachment: "fixed",
    //          }}>
    >
      <div className="flex items-center justify-between mx-auto w-[80%]">
        <div className="text-[var(--secondary-color)] text-2xl font-bold  lg:text-5xl title uppercase">
          <h1><span className="m-3 text-[var(--primary-color)]">book</span>store</h1>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-[var(--secondary-color)] focus:outline-none text-2xl cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
        <div
          className={`flex-col items-center  md:flex-row md:flex gap-3 md:static absolute left-0 w-full md:w-auto p-5 bg-orange-200 text-white md:bg-transparent transition-all duration-300 ease-in ${
            open ? "flex top-30 z-30" : "hidden md:flex top-[-400px]"
          }`}
        >
          <Link
            to="/"
            className="title block py-2 uppercase px-4 text-[var(--secondary-color)] hover:text-[var(--primary-color)] font-bold text-2xl lg:text-3xl"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/cakes"
            className="title uppercase block py-2 px-4 text-[var(--secondary-color)] hover:text-[var(--primary-color)] font-bold text-2xl lg:text-3xl"
            onClick={() => setOpen(false)}
          >
            books
          </Link>
          <Link
            to="/about"
            className="title uppercase py-2 px-4 text-[var(--secondary-color)] hover:text-[var(--primary-color)] font-bold text-2xl lg:text-3xl"
            onClick={() => setOpen(false)}
          >  
          {/* the name of the link must be like the name of the one in the route pages  */}
            About
          </Link>
          <Link
            to="/contact"
            className="title uppercase py-2 px-4 capitalize text-[var(--secondary-color)] hover:text-[var(--primary-color)] font-bold text-2xl lg:text-3xl"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/cart"
            className="title block relative py-2 px-4 text-[var(--secondary-color)] hover:text-[var(--primary-color)] font-bold text-3xl  items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <FaBagShopping className="text-2xl z-111" />
            <span className=" px-1 absolute text-[20px] bg-white rounded-full top-[-5px] right-0">
              {cartItemCount} {/* Display the count here */}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbarr;
