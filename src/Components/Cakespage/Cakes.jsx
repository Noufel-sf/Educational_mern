// Updated Cakes component
// src/components/Cakes.js
import React, { useState } from 'react';
import { useCart } from '../CartContext';
import Cake from './Cake';
import Services from '../Homepage/Services';

import Cake1 from '../../assests/48 laws of power.png' ;
import Cake2 from '../../assests/limitless.jpg'; 
import Cake3 from '../../assests/habits3.jpg';
import Cake4 from '../../assests/compond.jpg';
import Cake5 from '../../assests/nomore.jpg' ;
import Cake6 from '../../assests/crimeandpun.png'  ;
import Cake7 from '../../assests/49552.jpg'  ;
import Cake8 from '../../assests/crimeandpun.png' ;

const Cakeslist = [
  { img: Cake1, name: 'The 48 Laws of Power', price: 20, category: 'self-help', author: 'Robert Greene', isAdded: false, Qty: 0},
  { img: Cake2, name: 'Limitless', price: 18, category: 'self-help', author: 'Jim Kwik', isAdded: false, Qty: 0},
  { img: Cake3, name: 'Atomic Habits', price: 22, category: 'self-help', author: 'James Clear', isAdded: false, Qty: 0},
  { img: Cake4, name: 'The Compound Effect', price: 19, category: 'business', author: 'Darren Hardy', isAdded: false, Qty: 0},
  { img: Cake5, name: 'No More Mr. Nice Guy', price: 39, category: 'self-help', author: 'Robert A. Glover', isAdded: false, Qty: 0},
  { img: Cake6, name: 'Crime and Punishment', price: 29, category: 'fiction', author: 'Fyodor Dostoevsky', isAdded: false, Qty: 0},
  { img: Cake7, name: 'The Art of War', price: 79, category: 'philosophy', author: 'Sun Tzu', isAdded: false, Qty: 0},
  { img: Cake8, name: 'The 7 Habits of Highly Effective People', price: 69, category: 'self-help', author: 'Stephen R. Covey', isAdded: false, Qty: 0},
];

const categories = ['all', 'self-help', 'business', 'fiction', 'philosophy', 'biography'];

function Cakes() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCakes =
    selectedCategory === 'all'
      ? Cakeslist
      : Cakeslist.filter((cake) => cake.category === selectedCategory);

  return (
    <div className='title bg-white mt-40'>
      <h1 className='text-3xl lg:text-6xl text-center font-bold mt-10 text-[var(--secondary-color)] capitalize'>Our books</h1>
      <p className='text-center mt-12 text-2xl text-gray-700  lg:text-4xl'>
        Discover our premium collection of quality books, carefully selected for your category!
      </p>
      <ul className='flex items-center flex-wrap p-4 gap-5 justify-center mt-30 lg:gap-22'>
        {categories.map((cat) => (
          <li
            key={cat}
            className={`capitalize text-xl lg:text-4xl font-bold cursor-pointer ${
              selectedCategory === cat ? 'text-[var(--primary-color)]' : 'text-[var(--secondary-color)]'
            } hover:text-[var(--primary-color)] transition duration-300`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>
      <div className='grid grid-cols-1  place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-30 px-4'>
        {filteredCakes.map((cake, index) => (
          <Cake
            key={index}
            img={cake.img}
            loading="lazy"
            name={cake.name}
            author={cake.author}
            price={cake.price}
            Qty={cake.Qty}
            data-category={cake.category}
            AddTocart={() => addToCart(cake)}
          />
        ))}
      </div>
      <Services />
    </div>
  );
}

export default Cakes;