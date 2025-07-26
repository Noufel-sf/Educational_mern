import React from 'react';
import { Link } from 'react-router-dom';
import AboutImage from '/hero.jpg'; // Ensure this path is correct

function Banner() {
  return (
    <section className=" py-20 px-6 relative overflow-hidden title mt-40">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="lg:text-5xl capitalize text-3xl md:text-4xl font-bold text-[var(--secondary-color)] mb-4">
          order your own book
        </h2>
        <p className="text-lg text-gray-700  mb-12 font-bold">
            book with your own requirments
        </p>

        <div className="relative flex justify-center items-center">
          {/* Cake Image */}
          <img
            src={AboutImage}
            alt="Secret book"
            data-aos="fade-up" 
            data-aos-duration='1000'
            className="w-[450px] md:w-[470px] z-10"
          />

          {/* Example ingredient bubbles (you can position more) */}
          <div className="absolute left-4 top-10 text-sm text-[var(--secondary-color)] font-medium" >
             rosey
          </div>
          <div className="absolute right-6 top-20 text-sm text-[var(--secondary-color)] font-medium">
             rosey
          </div>
          <div className="absolute left-2 bottom-10 text-sm text-[var(--secondary-color)] font-medium">
             birthday
          </div>
          <div className="absolute right-10 bottom-14 text-sm text-[var(--secondary-color)] font-medium">
             sports
          </div>
          {/* Add more as needed */}
        </div>

        {/* CTA Button */}
        <div className="mt-16">
          <p className="mb-4 text-gray-700 capitalize text-lg font-semibold">
            how do you want your book? <br />
          </p>
         <Link to="/owncake"> 
            <button className="bg-[var(--secondary-color)] capitalize cursor-pointer hover:bg-[var(--primary-color)] text-white py-3 px-8 rounded-full text-lg font-semibold transition">
              order now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Banner;
