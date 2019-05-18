const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  isbn: Number
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
