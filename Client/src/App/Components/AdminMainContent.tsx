import React from 'react'
import { Menu, Search } from "lucide-react";

function AdminMainContent({ content, setSidebarOpen }: { content: React.ReactNode, setSidebarOpen: (open: boolean) => void }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
            >
              <Menu className="h-6 w-6 cursor-pointer" />
            </button>
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-white  bg-[var(--primary-color)] p-2 rounded-full relative cursor-pointer">
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{content}</main>
      </div>

  )
}

export default AdminMainContent