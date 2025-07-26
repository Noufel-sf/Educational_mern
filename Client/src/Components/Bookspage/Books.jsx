import React, { useState, useEffect } from 'react';
import axios from "axios";
import Book from './Book';
import Services from '../Homepage/Services';


const categories = ['all', 'self-help', 'business', 'fiction', 'philosophy', 'biography'];



function books() {
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books");
      setBooklist(response.data);
    } catch (error) {
      console.error("Failed to fetch books", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [Booklist , setBooklist] = useState([]) ; 

  const filteredBooks =
    selectedCategory === 'all'
      ? Booklist
      : Booklist.filter((book) => book.category === selectedCategory);

  return (
    <div className=' bg-white mt-40'>
      <h1 className='text-5xl lg:text-6xl text-center font-bold mt-10 text-[var(--secondary-color)] capitalize'>Our books</h1>
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
      <div className='grid grid-cols-1  place-items-center  md:grid-cols-2 lg:grid-cols-3 gap-20 mt-30 px-4'>
        {filteredBooks.map((book, index) => (
          <Book
            key={index}
            coverUrl={book.coverUrl}
            loading="lazy"
            title={book.title}
            author={book.author}
            price={book.price}
            Qty={book.stock}
            _id={book._id}
            data-category={book.genre}
          />
        ))}
      </div>
      <Services />
    </div>
  );
}

export default books;