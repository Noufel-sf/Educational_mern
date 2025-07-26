
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  author: {
    type: String,
    required: true
  },

  description: String,

  genre: String,

  price: {
    type: Number,
    required: true
  },

  stock: {
    type: Number,
    default: 0
  },

  coverUrl: String,

  rating: {
    type: Number,
    default: 0
  }, 

}, {
  timestamps: true
});

const Books = mongoose.model('Books', bookSchema);
module.exports = Books;