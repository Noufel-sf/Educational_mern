import React from 'react'

function Cake({img , name, price , category , AddTocart }) {
  return (
    <div className='flex items-center gap-8 title flex-col' data-aos="fade-up" 
                data-aos-duration='1200'
                data-category={category}
                >

        <img src={img} alt={name} className='w-80 h-80' loading='lazy' />
        <div className='flex flex-col items-center text-center gap-5'>
            <h2 className='text-2xl font-bold'>{name}</h2>
            <p className='text-2xl   text-[var(--secondary-color)] font-bold'>{price}</p>
            <button className='bg-[var(--primary-color)] text-white px-12 py-4 rounded-full cursor-pointer capitalize hover:bg-[var(--secondary-color)] transition duration-300'
            onClick={AddTocart}
            >add to cart</button>
        </div>
    </div>
  )
}

export default Cake