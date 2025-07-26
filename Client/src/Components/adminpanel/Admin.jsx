import { useState, useEffect } from "react";
import axios from "axios";

import {
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  PackageIcon,
  BaggageClaim,
} from "lucide-react";
import BooksContent from "./BooksContent";
import OrdersContent from "./OrdersContent";
import SettingsContent from "./SettingsContent";
import DashboardContent from "./DashboardContent";
import { useCart } from "../CartContext";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [Books, setBooks] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);
  const [selectedThing, setSelectedThing] = useState(null);
  const [addBook, setAddBook] = useState(false);
  const [Orders,setOrders] = useState([]) ; 
  const {user} = useCart() ;
  
  
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    image: "",
  });

  const sidebarItems = [
    { id: "Dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "Books", label: "Books", icon: PackageIcon },
    { id: "Orders", label: "Orders", icon: PackageIcon },
    { id: "Settings", label: "Settings", icon: PackageIcon },
  ];

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Failed to fetch books", error);
    }
  };

useEffect(() => {
  const fetchOrders = async () => {
    // Check if user exists and has a token before making the request
    if (!user || !user.token) {
      console.log("User not logged in or token not available");
      return;
    }

    try {
      console.log("Fetching orders with token:", user.token.substring(0, 20) + "..."); // Debug log
      const response = await axios.get("http://localhost:5000/api/order", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setOrders(response.data);
      console.log("Fetched orders:", response.data);
    } catch (err) {
      console.error("❌ Error fetching orders:", err.response?.data || err.message);
    }
  };

  // Only fetch orders when user is available
  if (user && user.token) {
    fetchOrders();
  }
}, [user]); // Only user as dependency
  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("title", newBook.title);
      formData.append("author", newBook.author);
      formData.append("description", newBook.description);
      formData.append("price", newBook.price);
      formData.append("stock", newBook.stock);
      formData.append("genre", newBook.genre);
      formData.append("image", newBook.image); // This is the File object

      try {
        const response = await axios.post("http://localhost:5000/api/books", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setBooks([...Books, response.data]);
        setAddBook(false);
      } catch (error) {
        console.error("Error adding book", error);
      }
};

  const cancelDelete = () => {
    setShowConfirm(false);
    setSelectedThing(null);
  };

  const DeleteItem = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/Books/${selectedThing._id}`);
      setBooks(Books.filter((book) => book._id !== selectedThing._id));
      setShowConfirm(false);
      setSelectedThing(null);
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  const Updateproduct = async (item) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/Books/${item._id}`, item);
      setBooks(Books.map((book) => (book._id === response.data._id ? response.data : book)));
      setShowUpdate(false);
      setSelectedThing(null);
    } catch (error) {
      console.error("Error updating book", error);
    }
  };

  const handleUpdate = (item) => {
    setSelectedThing(item);
    setShowUpdate(true);
    setUpdateProduct(true);
  };

  const CancelUpdate = () => {
    setShowUpdate(false);
    setSelectedThing(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardContent />;
      case "Books":
        return (
          <BooksContent
            Books={Books}
            addBook={addBook}
            setAddBook={setAddBook}
            newBook={newBook}
            setNewBook={setNewBook}
            selectedThing={selectedThing}
            setSelectedThing={setSelectedThing}
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
            handleDelete={(item) => {
              setSelectedThing(item);
              setShowConfirm(true);
            }}
          />
        );
      case "Orders":
        return <OrdersContent 
          Orders={Orders}
        />;
      case "Settings":
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
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

      {/* Main Content */}
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
            <button className="text-gray-500 hover:text-gray-700 relative cursor-pointer">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Confirm delete dialog */}
      {showConfirm && selectedThing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-sm mb-6">
              Are you sure you want to delete <strong>{selectedThing.title}</strong>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={DeleteItem}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Update book dialog */}
      {showUpdate && selectedThing && updateProduct && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
      <h2 className="text-lg font-semibold mb-4">Update Book</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          defaultValue={selectedThing.title}
          onChange={(e) =>
            setSelectedThing({ ...selectedThing, title: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Author"
          defaultValue={selectedThing.author}
          onChange={(e) =>
            setSelectedThing({ ...selectedThing, author: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <textarea
          placeholder="Description"
          defaultValue={selectedThing.description}
          onChange={(e) =>
            setSelectedThing({ ...selectedThing, description: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Genre"
          defaultValue={selectedThing.genre}
          onChange={(e) =>
            setSelectedThing({ ...selectedThing, genre: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="number"
          placeholder="Price"
          defaultValue={selectedThing.price}
          onChange={(e) =>
            setSelectedThing({ ...selectedThing, price: Number(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="number"
          placeholder="Stock"
          defaultValue={selectedThing.stock}
          onChange={(e) =>
            setSelectedThing({ ...selectedThing, stock: Number(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Cover Image URL"
          defaultValue={selectedThing.coverUrl}
          onChange={(e) =>
            setSelectedThing({ ...selectedThing, coverUrl: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            Updateproduct(selectedThing);
          }}
          className="w-full px-4 py-2 text-white rounded-md bg-black hover:bg-[var(--primary-color)] transition"
        >
          Update Book
        </button>
        <button
          type="button"
          className="w-full px-4 py-2 text-white rounded-md bg-gray-600 hover:bg-gray-700 transition"
          onClick={CancelUpdate}
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
)}
    
  
    </div>
    
  );
  
};

export default Admin;
