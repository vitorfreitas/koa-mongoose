const Book = require("./book.model");

const get = async ctx => {
  try {
    const books = await Book.find();
    ctx.body = books;
  } catch (err) {
    console.warn(err);
  }
};

module.exports = { get };
