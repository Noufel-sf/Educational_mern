import { Search, Plus, Edit, Trash2 } from "lucide-react";

// Book Row Component
const BookRow = ({ book, handleUpdate, handleDelete }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap">{book._id}</td>
    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{book.title}</td>
    <td className="px-6 py-4 whitespace-nowrap text-green-600 font-bold">{book.author}</td>
    <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">{book.genre}</td>
    <td className="px-6 py-4 whitespace-nowrap text-green-600 font-bold">${book.price}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm">{book.stock}</td>
    <td className="px-6 py-4 whitespace-nowrap text-right">
      <div className="flex items-center justify-end space-x-2">
        <button
          className="text-gray-600 cursor-pointer hover:text-gray-900"
          onClick={() => handleUpdate(book)}
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          className="text-red-600 hover:text-red-900 cursor-pointer"
          onClick={() => handleDelete(book)}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </td>
  </tr>
);

const BooksContent = ({
  Books,
  addBook,
  setAddBook,
  newBook,
  setNewBook,
  handleSubmit,
  handleUpdate,
  handleDelete,
  handleSearch,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl text-[var(--primary)] font-extrabold capitalize">
            My Books
          </h1>
          <p className="text-gray-600 text-xl mt-2 font-bold">
            Manage your books
          </p>
        </div>
        <button
          onClick={() => setAddBook(!addBook)}
          className="flex items-center cursor-pointer px-4 py-2 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--secondary)] font-extrabold transition"
        >
          <Plus className="h-4 w-4 mr-2" />
          {addBook ? "Back to list" : "Add Book"}
        </button>
      </div>

      {addBook ? (
      <form
  onSubmit={handleSubmit}
  className="bg-white p-6 shadow-sm border rounded-lg space-y-4"
>
  <h3 className="text-3xl text-[var(--primary)] font-extrabold">
    Add New Book
  </h3>

  <input
    type="text"
    placeholder="Title"
    value={newBook.title}
    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
    className="w-full px-3 py-2 border rounded-md"
    required
  />

  <input
    type="text"
    placeholder="Author"
    value={newBook.author}
    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
    className="w-full px-3 py-2 border rounded-md"
    required
  />

  <textarea
    placeholder="Description"
    value={newBook.description}
    onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
    className="w-full px-3 py-2 border rounded-md"
    required
  />

  <input
    type="text"
    placeholder="Genre"
    value={newBook.genre}
    onChange={(e) =>
      setNewBook({ ...newBook, genre: e.target.value})
    }
    className="w-full px-3 py-2 border rounded-md"
    required
  />

  <input
    type="number"
    placeholder="Price"
    value={newBook.price}
    onChange={(e) =>
      setNewBook({ ...newBook, price: Number(e.target.value) })
    }
    className="w-full px-3 py-2 border rounded-md"
    required
  />

  <input
    type="number"
    placeholder="Stock quatity"
    value={newBook.stock}
    onChange={(e) =>
      setNewBook({ ...newBook, stock: Number(e.target.value) })
    }
    className="w-full px-3 py-2 border rounded-md"
    required
  />

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setNewBook({ ...newBook, image: e.target.files[0] })}
    className="w-full px-3 py-2 border rounded-md"
    required
  />

  <button
    type="submit"
    className="w-full px-4 py-2 font-extrabold cursor-pointer bg-[var(--primary)] rounded-md hover:bg-[var(--secondary)] transition"
  >
    Add Book
  </button>
</form>

      ) : (
        <div className="bg-white shadow-sm border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-2xl text-[var(--primary)] font-extrabold">All Books</h3>
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Books..."
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xl font-extrabold text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xl font-extrabold text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xl font-extrabold text-gray-500 uppercase">Author</th>
                <th className="px-6 py-3 text-left text-xl font-extrabold text-gray-500 uppercase">Genre</th>
                <th className="px-6 py-3 text-left text-xl font-extrabold text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xl font-extrabold text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-right text-xl font-extrabold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Books.map((book) => (
                <BookRow
                  key={book._id}
                  book={book}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BooksContent;
