const express = require('express');
const router = express.Router();
const Book = require('../Models/Books');
const { upload } = require('../middleware/multer');

// @route   POST /api/books
// Create book with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, author, description, price, genre, stock } = req.body;

    const book = new Book({
      title,
      author,
      description,
      price,
      genre, // Handle genre as string
      stock,
      coverUrl: req.file ? req.file.path : '', // Handle case when no file is uploaded
    });

    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add book' });
  }
});

// @route   GET /api/books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error("Fetch Books Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/books/herobooks - MUST come before /:id route
router.get("/herobooks", async (req, res) => {
  try {
    const books = await Book.find().limit(4); // Limit to 4 for Hero section
    res.status(200).json(books);
  } catch (err) {
    console.error("Failed to fetch hero books:", err);
    res.status(500).json({ message: "Failed to fetch hero books" });
  }
});

// @route   GET /api/books/:id - MUST come after specific routes
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error("Fetch Book Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/books/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  } catch (error) {
    console.error("Delete Book Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/books/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (error) {
    console.error("Update Book Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
