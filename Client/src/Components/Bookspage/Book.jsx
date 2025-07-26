import React from 'react'
import { Link } from "react-router-dom";


function Book({coverUrl , title, price , genre , author, _id}) {
  return (
    <div className='flex items-center gap-8 title  shadow-black rounded-lg cursor-pointer' data-aos="fade-up" 
                data-aos-duration='1200'
                data-category={genre}
                >

        <div className="cake-item">
          <div className="w-full h-48 overflow-hidden rounded-lg">
            <img
              src={coverUrl}
              alt={title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
        <div className='flex flex-col items-center text-center gap-5'>
            <h2 className='text-2xl font-bold capitalize max-w-[200px]'>{title}</h2>
            <h2 className='text-xl capitalize font-bold'>{author}</h2>
            <p className='text-2xl   text-[var(--primary-color)] font-bold'>{price} $</p>
            <Link 
             to={`/book/${_id}`}
            > 
            <button className='bg-[var(--secondary-color)] text-white px-12 py-4 rounded-full font-bold cursor-pointer capitalize hover:bg-[var(--primary-color)] transition duration-300'
            >view details</button>
            </Link>
        </div>
    </div>
  )
}

export default Book