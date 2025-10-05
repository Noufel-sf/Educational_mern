import React from 'react'
import { X } from "lucide-react";

function SidebarContent({ sidebarItems , sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) {
  return (
       <div
        className={`$${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h2 className="text-3xl font-extrabold text-gray-800">Admin Panel</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X className="h-6 w-6 text-[var(--primary)]" />
          </button>
        </div>

        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center cursor-pointer px-6 py-3 text-left text-2xl capitalize font-extrabold hover:bg-gray-50 transition $$
                  {
                    activeTab === item.id
                      ? "bg-red-100 text-red-500"
                      : "text-gray-700"
                  }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
  )
}

export default SidebarContent