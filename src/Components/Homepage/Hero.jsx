import React from "react";

import Cake1 from "../../assests/48 laws of power.png" ;
import Cake2 from "../../assests/artofwar.jpg" ;
import Headerimg from "../../assests/Banner4.png";
import Cake3 from "../../assests/habits.jpg";
import Cake4 from "../../assests/7habits.jpg" ;


import Cake from "../Cakespage/Cake";
import Services from "./Services";
import Banner from "./Banner";
import { Link } from "react-router-dom";
import { useCart } from '../CartContext';

const Cakeslist = [
  { img: Cake1, name: "The 48 Laws of Power", price: 20, category: "self-help", author: "Robert Greene", isAdded: false, Qty: 0 },
  { img: Cake2, name: "The Art of War", price: 18, category: "philosophy", author: "Sun Tzu", isAdded: false, Qty: 0 },
  { img: Cake3, name: "Atomic Habits", price: 22, category: "self-help", author: "James Clear", isAdded: false, Qty: 0 },
  { img: Cake4, name: "The 7 Habits of Highly Effective People", price: 22, category: "self-help", author: "Stephen R. Covey", isAdded: false, Qty: 0 },
];


function Hero() {
  
  const { addToCart } = useCart();


  return (
    <div className="">
      <div
        className=" lg:h-[100vh] h-[70vh] "
         style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${Headerimg})`,
          backgroundSize: "cover",
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
         }}
      >
        <div className=" p-10 flex flex-col md:flex-row items-center justify-between h-full max-w-[80%] mx-auto">
          {/* Left Text Section */}
          <div className="flex title flex-col justify-center gap-8  md:text-left lg:items-start items-center text-center">
            <h2
              className="capitalize text-5xl md:text-5xl lg:text-9xl font-bold text-white leading-snug"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
             <span className="capitalize text-[var(--primary-color)]"> Read books on</span> <br /> our website
            </h2>
            <p
              className="title w-1/2 text-white font-bold"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              {" "}
              Lorem ipsum Unde, ea neque eaque in a quam odit officia pariatur
              animi nihil magnam labore enim consequuntur at facere, eaque culpa
              suscipit officiis facilis quod animi nihil magnam labore enim consequuntur at facere, eaque culpa
              suscipit officiis facilis quod.
            </p>
            <Link to="/owncake"> 
            <button
              className="bg-[var(--primary-color)] text-white font-semibold px-15 text-3xl title py-3 rounded-full capitalize cursor-pointer w-fit self-center md:self-start"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              order now
            </button>
            </Link>
          </div>

          {/* Right Image Section */}
        </div>{" "}
      </div>

      {/* Services Section */}
      <Services />
      <section className="flex flex-col mt-40 items-center justify-center  mx-auto gap-25 ">
        <h1 className="capitalize text-2xl lg:text-5xl font-bold text-[var(--secondary-color)] title">
          Explore our products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2  place-items-center lg:grid-cols-4 gap-21 mt-10 px-4">
          {Cakeslist.map((cake, index) => (
            <Cake
              key={index}
              img={cake.img}
              name={cake.name}
              author={cake.author}
              price={cake.price}
              Qty={cake.Qty}
              AddTocart={() => addToCart(cake)}
              data-category={cake.category}
              loading="lazy"
            />
          ))}
        </div>
        <Link to="/cakes">
          <button className="bg-[var(--secondary-color)]  hover:bg-[var(--primary-color)] transition duration-300  capitalize text-white py-4 px-12 font-bold cursor-pointer rounded-full text-2xl title">
            Explore all books
          </button>
          {" "}
        </Link>
      </section>

      {/* Banner section */}
      <Banner />
    </div>
  );
}

export default Hero;
