import React from 'react'

function Cake({img , name, price , category , AddTocart, author}) {
  return (
    <div className='flex items-center gap-8 title flex-col shadow-black rounded-lg cursor-pointer' data-aos="fade-up" 
                data-aos-duration='1200'
                data-category={category}
                >

        <div className="cake-item">
          <div className="w-full h-48 overflow-hidden rounded-lg">
            <img
              src={img}
              alt={name}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
        <div className='flex flex-col items-center text-center gap-5'>
            <h2 className='text-2xl font-bold capitalize'>{name}</h2>
            <h2 className='text-2xl capitalize font-bold'>{author}</h2>
            <p className='text-2xl   text-[var(--secondary-color)] font-bold'>{price} $</p>
            <button className='bg-[var(--secondary-color)] text-white px-12 py-4 rounded-full font-bold cursor-pointer capitalize hover:bg-[var(--primary-color)] transition duration-300'
            onClick={AddTocart}
            >add to cart</button>
        </div>
    </div>
  )
}

export default Cake