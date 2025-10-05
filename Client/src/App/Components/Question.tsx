import React, { useState } from 'react';
import { FaMinus } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';

const QuestionCard = ({ id, title, text }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`rounded-xl p-5 shadow-[0_4px_0_0_#000] border border-black my-5 transition-all duration-800 ${
        isOpen ? 'bg-[var(--primary-color)]' : 'bg-[#F3F3F3] text-black'
      }`}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <button
          className="text-2xl rounded-full bg-[#F3F3F3] p-2 border border-black cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaMinus /> : <FaPlus />}
        </button>
      </div>

      {/* Divider + Text */}
      {isOpen && (
        <div className="mt-4 transition-all duration-600">
          <hr className="border-black my-4" />
          <p className="text-sm leading-relaxed text-black">{text}</p>
        </div>
      )}
    </div>
  );
};
export default QuestionCard;
