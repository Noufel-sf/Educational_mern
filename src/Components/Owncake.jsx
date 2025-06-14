import React from "react";
import Banner from "./Homepage/Banner";


import Cake1 from '../assests/81V3mrjjWcL.jpg';
import Cake2 from '../assests/7habits.jpg';
import Cake3 from '../assests/limitless.jpg';
import Cake4 from '../assests/artofwar.jpg'  ;


import Cake from "./Cakespage/Cake";
import { Link } from "react-router-dom";
import { useCart } from './CartContext';

const Cakeslist = [
  { img: Cake1, name: "The Psychology of Money", price: 20, category: "finance", author: "Morgan Housel", isAdded: false, Qty: 0 },
  { img: Cake2, name: "The 7 Habits of Highly Effective People", price: 18, category: "self-help", author: "Stephen R. Covey", isAdded: false, Qty: 0 },
  { img: Cake3, name: "Limitless", price: 22, category: "self-help", author: "Jim Kwik", isAdded: false, Qty: 0 },
  { img: Cake4, name: "The Art of War", price: 22, category: "philosophy", author: "Sun Tzu", isAdded: false, Qty: 0 },
];

function Owncake() {
    const { addToCart } = useCart();


  return (
    <div className="max-w-[80%] mx-auto bg-white p-8 mt-12 title">
      <h2 className="text-3xl lg:text-5xl title capitalize font-bold text-center mb-6 text-[var(--secondary-color)]">
        Order Your Own book
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className=" capitalize block text-sm font-bold text-gray-700">
            name
          </label>
          <input
            type="text"
            placeholder="Chocolate, Vanilla, Strawberry..."
            className="mt-1 block w-full rounded-md  shadow-md p-3  focus:border-[var(--primary-color)] focus:outline-none focus:border-2"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">
            product Size
          </label>
          <select className="mt-1 block w-full rounded-md shadow-md p-3">
            <option>100 page</option>
            <option>200 page</option>
            <option>300 page</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">
            category
          </label>
          <input
            type="text"
            placeholder="Buttercream, Whipped, Ganache..."
            className="mt-1 block w-full rounded-md shadow-md p-3  focus:border-[var(--primary-color)] focus:outline-none focus:border-2"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">
            authors
          </label>
          <input
            type="text"
            placeholder="Berries, Nuts, Chocolate Chips..."
            className="mt-1 block w-full rounded-md shadow-md p-3  focus:border-[var(--primary-color)] focus:outline-none focus:border-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold  text-gray-700">
            Additional Notes
          </label>
          <textarea
            rows="4"
            placeholder="Any special instructions..."
            className="mt-1 block w-full rounded-md shadow-md p-3 focus:border-[var(--primary-color)] focus:outline-none focus:border-2"
          ></textarea>
        </div>

        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white font-semibold px-6 py-3 rounded-lg mt-4 cursor-pointer transition duration-300 text-lg title"
          >
            Submit Request
          </button>
        </div>
      </form>
      <div className="mt-30 flex flex-col items-center justify-center mx-auto gap-25 ">
        <h1 className="text-3xl lg:text-6xl capitalize text-center font-bold mt-10 title text-[var(--secondary-color)]">
          Explore our products
        </h1>
        <p className="text-center text-gray-700  mt-12 text-2xl lg:text-4xl">
          Explore our delicious range of products, perfect for any occasion!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-8 mt-10 px-4">
          {Cakeslist.map((cake, index) => (
            <Cake
              key={index}
              img={cake.img}
              name={cake.name}
              author={cake.author}
              price={cake.price}
              loading="lazy"
              Qty={cake.Qty}
              AddTocart={() => addToCart(cake)}
              data-category={cake.category}
              
            />
          ))}
        </div>
        <Link to="/cakes">
          <button className="bg-[var(--secondary-color)]  hover:bg-[var(--primary-color)] transition duration-300  capitalize text-white py-4 px-12 font-bold cursor-pointer rounded-full text-2xl title">
            Explore all books
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Owncake;
