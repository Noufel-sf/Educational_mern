import React from "react";
import { useState } from "react";
import Headerimg from "/hero.jpg";


import Book from "../Bookspage/Book";
import Services from "./Services";
import Banner from "./Banner";
import { Link } from "react-router-dom";
import { useCart } from '../CartContext';
import { useEffect } from "react";
import axios from "axios"




function Hero() {
  
  const { addToCart } = useCart();
  const [Booklist , setBooklist] = useState([]) ; 

  const fetchBooks = async () => {

    try{
      const response = await axios.get("http://localhost:5000/api/books/herobooks");
      console.log("the 4 books ",response.data);

      setBooklist(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks(); 
  },[])



  return (
    <div className="mt-35">
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
        <div className="">
          {/* Left Text Section */}
          <div className="flex flex-col justify-center py-12 lg:py-54 text-center items-center gap-6">
            <h2
              className="capitalize text-5xl md:text-5xl lg:text-9xl font-bold text-white leading-snug"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
             <span className="capitalize text-[var(--primary-color)]"> Read books on</span> <br /> our website
            </h2>
            {/* <p
              className="title w-1/2 text-white font-bold"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              {" "}
              Lorem ipsum Unde, ea neque eaque in a quam odit officia pariatur
              animi nihil magnam labore enim consequuntur at facere, eaque culpa
              suscipit officiis facilis quod animi nihil magnam labore enim consequuntur at facere, eaque culpa
              suscipit officiis facilis quod.
            </p> */}
            <button
              className="bg-[var(--primary-color)] text-white font-semibold px-15 text-3xl title py-3 rounded-full capitalize cursor-pointer"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              order now
            </button>
          </div>

          {/* Right Image Section */}
        </div>
      </div>

      {/* Services Section */}
      <Services />
      <section className="flex flex-col mt-40 items-center justify-center  mx-auto gap-25 ">
        <h1 className="capitalize text-2xl lg:text-5xl font-bold text-[var(--secondary-color)] title">
          Explore our products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2  place-items-center lg:grid-cols-4 gap-25 mt-10 px-4">
          {Booklist.map((book, index) => (
            <Book
              key={index}
              coverUrl={book.coverUrl}
              name={book.title}
              author={book.author}
              price={book.price}
              Qty={book.quantity}
              AddTocart={() => addToCart(book)}
              data-category={book.genre}
              _id={book._id}
              loading="lazy"
            />
          ))}
        </div>
        <Link to="/books">
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
