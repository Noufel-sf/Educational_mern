import React from 'react';
import { TbTruckDelivery } from "react-icons/tb";
import { FaUserCheck } from "react-icons/fa";
import { MdOutlineFoodBank } from "react-icons/md";
function Services() {
  const services = [
    {
      title: "Custom foods",
      description:
        "Design your own cake with personalized flavors, shapes, and decorations. Perfect for birthdays, weddings, or any special event!",
      icon: <MdOutlineFoodBank className="text-[var(--secondary-color)]" />,
    },
    {
      title: "Same-Day Delivery",
      description:
        "Forgot a birthday? Don’t worry! We offer fast, same-day delivery for selected cake items within the city.",
      icon: <TbTruckDelivery className="text-[var(--secondary-color)]" />,
    },
    {
      title: "Cake Tasting",
      description:
        "Visit our shop for a free tasting session to try out our top cake flavors before you place your order!",
      icon: <FaUserCheck className="text-[var(--secondary-color)]" />,
    },
  ];

  return (
    <section className="w-full py-16 px-6 md:px-20 title mt-120 lg:mt-40">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--secondary-color)] mb-12">Our Services</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              data-aos="fade-up" 
              data-aos-duration='1000'
              key={index}
              className="bg-white rounded-xl  p-8 flex flex-col items-center text-center  transition"
            >
              <div className="text-6xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-[var(--secondary-color)] mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
