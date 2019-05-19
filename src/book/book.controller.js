const Book = require("./book.model");

const postBook = async ctx => {
  try {
    const { name, author, isbn } = ctx.request.body;
    const book = new Book({ name, author, isbn });
    await book.save();
    ctx.body = book;
  } catch (err) {
    ctx.body = err.message;
  }
};

const putBook = async ctx => {
  try {
    const { id } = ctx.params;
    const book = await Book.findOneAndUpdate(
      { _id: id },
      { ...ctx.request.body },
      { new: true }
    );
    ctx.body = book;
  } catch (err) {
    ctx.body = err.message;
  }
};

const getBooks = async ctx => {
  try {
    const books = await Book.find();
    ctx.body = books;
  } catch (err) {
    ctx.body = err.message;
  }
};

module.exports = { getBooks, postBook, putBook };
