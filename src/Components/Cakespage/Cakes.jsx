// Updated Cakes component
// src/components/Cakes.js
import React, { useState } from 'react';
import { useCart } from '../CartContext';
import Cake from './Cake';
import Services from '../Homepage/Services';

import Cake1 from '../../assests/clothes-3.jpg' ;
import Cake2 from '../../assests/clothes-1.jpg'; 
import Cake3 from '../../assests/jacket-1.jpg';
import Cake4 from '../../assests/jacket-4.jpg';
import Cake5 from '../../assests/shirt-1.jpg';
import Cake6 from '../../assests/shirt-2.jpg'  ;
import Cake7 from '../../assests/sports-2.jpg'  ;
import Cake8 from '../../assests/jacket-2.jpg' ;

const Cakeslist = [
  { img: Cake1, name: 'Premium Cotton T-Shirt', price: 20, category: 'clothing' ,isAdded:false,Qty:0},
  { img: Cake2, name: 'Casual Denim Jacket', price: 18, category: 'clothing'   ,isAdded:false,Qty:0},
  { img: Cake3, name: 'Designer Leather Jacket', price: 22, category: 'clothing'    ,isAdded:false,Qty:0},
  { img: Cake4, name: 'Wireless Bluetooth Headphones', price: 19, category: 'electronics'         ,isAdded:false,Qty:0},
  { img: Cake5, name: 'Smart Fitness Watch', price: 39, category: 'electronics' ,isAdded:false,Qty:0},
  { img: Cake6, name: 'Ergonomic Office Chair', price: 29, category: 'furniture' ,isAdded:false,Qty:0},
  { img: Cake7, name: 'Running Sports Shoes', price: 79, category: 'footwear'   ,isAdded:false,Qty:0},
  { img: Cake8, name: 'Designer Handbag', price: 69, category: 'accessories'       ,isAdded:false,Qty:0},
];

const categories = ['all', 'clothing', 'electronics', 'furniture', 'footwear', 'accessories'];

function Cakes() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCakes =
    selectedCategory === 'all'
      ? Cakeslist
      : Cakeslist.filter((cake) => cake.category === selectedCategory);

  return (
    <div className='title bg-white mt-40'>
      <h1 className='text-3xl lg:text-6xl text-center font-bold mt-10 text-[var(--secondary-color)]'>Our Products</h1>
      <p className='text-center mt-12 text-2xl text-gray-700  lg:text-4xl'>
        Discover our premium collection of quality products, carefully selected for your lifestyle!
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