import React from 'react'
import {useState ,useEffect} from 'react' ; 
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from 'react-icons/fa';
import { useCart } from './CartContext';


function Bookdetails() {
  const [book, setbook] = useState({});
  const { addToCart } = useCart();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then((res) => setbook(res.data))
      .catch((err) => console.error("Error fetching book:", err));
  }, [id]);

  if (!book.title) return <div className="text-center mt-10">Loading book details...</div>;

  return (
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 mt-40 gap-12">
      {/* book Image */}
      <div className="w-[400px] h-[560px] bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* book Info */}
      <div className="flex flex-col gap-12 justify-between">
        <div>
          <h1 className="text-5xl font-bold mb-5">{book.title}</h1>
          <p className="text-2xl text-gray-600 mb-4">By {book.author}</p>
          <p className="text-xl text-gray-600 mb-4">Genre: {book.genre}</p>
          <p className="text-xl text-gray-600 mb-4">Description:</p>
          <p className="text-xl text-gray-600 mb-4">{book.description}</p>
          <p className="text-xl text-[var(--primary-color)] font-bold mb-6">
            ${book.price}
          </p>
          <p className="text-gray-700 mb-6">
            {book.description ||
              "No description available for this book."}
          </p>
          <div className="flex items-center gap-4 mb-12">
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
          </div>
          <p className="font-bold mb-4">The number in the Stock: {book.stock || "Available"}</p>
        
        </div>

        <button
          onClick={() => addToCart(book)}
          className="bg-black text-white py-3 px-8 rounded-full cursor-pointer transition font-semibold text-lg hover:bg-[var(--primary-color)]"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default Bookdetails