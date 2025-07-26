import React, { useState } from "react";
import { Search, Plus, Eye, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";

// Row Component
const OrdersRow = ({ order }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr className="hover:bg-gray-50 transition-all duration-300">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {order.username.charAt(0)}
              </span>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {order.orderId}
              </div>
              <div className="text-sm text-gray-500">{order.username}</div>
            </div>
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 py-1 text-xl font-medium text-green-600">
            {order.totalAmount}
          </span>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              order.status === "Completed"
                ? "bg-green-200 text-green-800"
                : order.status === "delivired"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {order.status}
          </span>
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex items-center justify-end space-x-2">

            <button className="text-red-600 hover:text-red-900">
              <Trash2 className="h-4 w-4" />
            </button>
            <button onClick={() => setOpen(!open)} className="text-gray-700 cursor-pointer hover:text-black">
              {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </td>
      </tr>

      {/* Accordion details */}
      {open && (
        <tr>
          <td colSpan="4" className="px-6 py-4 bg-gray-50">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">📚 Books in this order:</h4>
              <ul className="pl-4 list-disc text-gray-600">
                {order.books.map((book) => (
                  <li key={book.id}>
                    <span className="font-medium">{book.title}</span> — Quantity: {book.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

// Main Component
const OrdersContent = ({Orders}) => {
  // const [orders, setOrders] = useState([
  //   {
  //     id: 1,
  //     orderId: "1234",
  //     customer: "John Doe",
  //     total: "$100.00",
  //     status: "Completed",
  //     books: [
  //       { id: "b1", title: "Atomic Habits", quantity: 1 },
  //       { id: "b2", title: "Clean Code", quantity: 2 },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     orderId: "2451",
  //     customer: "Noufel",
  //     total: "$60.00",
  //     status: "delivired",
  //     books: [
  //       { id: "b3", title: "Deep Work", quantity: 1 },
  //       { id: "b4", title: "The Pragmatic Programmer", quantity: 1 },
  //     ],
  //   },
  // ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-6xl font-extrabold capitalize text-[var(--primary)]">
            orders
          </h1>
          <p className="text-gray-600 mt-6 font-bold">
            Manage your orders and their status.
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-extrabold">All Orders</h3>
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Orders.map((order) => (
              <OrdersRow key={order._id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersContent;
