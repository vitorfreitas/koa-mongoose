const Book = require("./book.model");

const postBook = async ctx => {
  try {
    const { name, author, isbn } = ctx.request.body;
    const book = new Book({ name, author, isbn });
    await book.save();
    ctx.body = book;
  } catch (err) {
    console.warn(err);
  }
};

const getBooks = async ctx => {
  try {
    const books = await Book.find();
    ctx.body = books;
  } catch (err) {
    console.warn(err);
  }
};

module.exports = { getBooks, postBook };
