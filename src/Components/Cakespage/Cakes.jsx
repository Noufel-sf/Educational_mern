// Updated Cakes component
// src/components/Cakes.js
import React, { useState } from 'react';
import { useCart } from '../CartContext';
import Cake from './Cake';
import Services from '../Homepage/Services';

import Cake1 from '../../assests/food5.png';
import Cake2 from '../../assests/order-2.png'; 
import Cake3 from '../../assests/order-2.png';
import Cake4 from '../../assests/order-3.png';
import Cake5 from '../../assests/Food-Plate.png';
import Cake6 from '../../assests/food4.png';
import Cake7 from '../../assests/food7.png';
import Cake8 from '../../assests/food4.png' ;

const Cakeslist = [
  { img: Cake1, name: 'Classic Cheeseburger', price: 20, category: 'burgers' ,isAdded:false,Qty:0},
  { img: Cake2, name: 'Grilled Chicken Sandwich', price: 18, category: 'sandwiches'   ,isAdded:false,Qty:0},
  { img: Cake3, name: 'BBQ Beef Sandwich', price: 22, category: 'sandwiches'    ,isAdded:false,Qty:0},
  { img: Cake4, name: 'Margherita Pizza', price: 19, category: 'pizza'         ,isAdded:false,Qty:0},
  { img: Cake5, name: 'Mixed Grill Platter', price: 39, category: 'platters' ,isAdded:false,Qty:0},
  { img: Cake6, name: 'Seafood Special', price: 29, category: 'platters' ,isAdded:false,Qty:0},
  { img: Cake7, name: 'Spicy Chicken Wings', price: 79, category: 'appetizers'   ,isAdded:false,Qty:0},
  { img: Cake8, name: 'Caesar Salad Bowl', price: 69, category: 'salads'       ,isAdded:false,Qty:0},
];

const categories = ['all', 'burgers', 'sandwiches', 'pizza', 'platters', 'appetizers', 'salads'];

function Cakes() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCakes =
    selectedCategory === 'all'
      ? Cakeslist
      : Cakeslist.filter((cake) => cake.category === selectedCategory);

  return (
    <div className='title bg-white mt-40'>
      <h1 className='text-3xl lg:text-6xl text-center font-bold mt-10 text-[var(--secondary-color)]'>Our Menu</h1>
      <p className='text-center mt-12 text-2xl text-gray-700  lg:text-4xl'>
        Discover our delicious range of freshly prepared dishes, crafted with love for every taste!
      </p>
      <ul className='flex items-center gap-5 justify-center mt-10 lg:gap-22'>
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
      <div className='grid grid-cols-1  place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 mt-30 px-4'>
        {filteredCakes.map((cake, index) => (
          <Cake
            key={index}
            img={cake.img}
            name={cake.name}
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