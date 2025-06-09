// 

import React from 'react';

function Footer() {
  return (
    <footer className="bg-pink-100 text-gray-700 py-10 mt-16 title">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Column 1 - Products */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Products</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[var(--secondary-color)]">Birthday Cakes</a></li>
            <li><a href="#" className="hover:text-[var(--secondary-color)]">Wedding Cakes</a></li>
            <li><a href="#" className="hover:text-[var(--secondary-color)]">Cupcakes</a></li>
            <li><a href="#" className="hover:text-[var(--secondary-color)]">Custom Orders</a></li>
          </ul>
        </div>

        {/* Column 2 - Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[var(--secondary-color)]">Delivery</a></li>
            <li><a href="#" className="hover:text-[var(--secondary-color)]">Cake Design</a></li>
            <li><a href="#" className="hover:text-[var(--secondary-color)]">Catering</a></li>
            <li><a href="#" className="hover:text-[var(--secondary-color)]">Workshops</a></li>
          </ul>
        </div>

        {/* Column 3 - About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[var(--secondary-color)]">Our Story</a></li>
            <li><a href="#" className="hover:text-[var(--secondary-color)]">Our Team</a></li>
            <li><a href="#" className="hover:text-[var(--secondary-color)]">Testimonials</a></li>
            <li><a href="#" className="hover:text-[var(--secondary-color)]">Careers</a></li>
          </ul>
        </div>

        {/* Column 4 - Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[var(--secondary-color)]">Location</a></li>
            <li><a href="#" className="hover:text-[var(--secondary-color)]">Email Us</a></li>
            <li><a href="#" className="hover:text-[var(--secondary-color)]">Call: +123 456 789</a></li>
            <li><a href="#" className="hover:text-[var(--secondary-color)]">Instagram</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} Cake shop Noufel seif el islam . All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
