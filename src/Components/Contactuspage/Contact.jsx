import React from 'react';

function Contact() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-20 title">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--secondary-color)] mb-6">Contact Us</h2>
        <p className="text-lg text-gray-700 mb-10">
          Have a question, a custom cake idea, or just want to say hello? Fill out the form below — we’d love to hear from you!
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="flex flex-col">
            <label className="text-[var(--secondary-color)] font-semibold mb-2">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="p-3 rounded-lg border border-pink-300 outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[var(--secondary-color)] font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="p-3 rounded-lg border border-pink-300 outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col">
            <label className="text-[var(--secondary-color)] font-semibold mb-2">Message</label>
            <textarea
              placeholder="Tell us what’s on your mind..."
              rows={5}
              className="p-3 rounded-lg border border-pink-300 outline-none focus:ring-2 focus:ring-pink-400 resize-none"
            ></textarea>
          </div>

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)] transition text-white font-semibold py-3 px-6 rounded-lg"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
