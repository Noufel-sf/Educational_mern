import React, { useEffect, useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Search } from "lucide-react";
import { User } from "../Types";
import { Link } from "react-router-dom";



interface UserRowProps {
  user: User;
  handleDelete: (user: User) => void;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => (
    <tr className="hover:bg-[#f5effc]">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-xl capitalize font-medium text-gray-700">
            {user.name?.charAt(0) || "U"}
          </span>
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className="px-2 py-1 text-xs font-medium rounded-full">
        {user.email}
      </span>
    </td>

    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.role === "teacher" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
        {user.role}
      </span>
    </td>

    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <div className="flex items-center justify-end space-x-2">
        <button
          // onClick={() => handleDelete(user)}
          className="text-red-600 hover:text-red-900"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <Link to={`/teacher/${user._id}`}>
          <button className="capitalize text-sm fonts font-bold cursor-pointer py-2 px-4 rounded-full text-white bg-[var(--primary-color)]">
            Visit
          </button>
        </Link>
      </div>
    </td>
  </tr>
);

const UsersContent = ({Allusers}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-bold">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[60%]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-extrabold text-[var(--primary)]">Users</h1>
          <p className="text-gray-600 font-bold mt-2">
            Manage your users and their permissions.
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-extrabold text-gray-900">All Users</h3>
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
          
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(
              Allusers.map((user) => (
                <UserRow key={user._id} user={user} />
              ))
            )} 
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersContent;
