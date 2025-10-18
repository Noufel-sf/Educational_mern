// src/components/Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function UpdateProfileDialog({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-150 text-gray-600">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer hover:text-gray-800"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {/* Content */}
        {children}
      </div>
    </div>
  );
}
