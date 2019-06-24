const Book = require('./book.model');

const postBook = async ctx => {
  try {
    const bookExists = !!(await Book.findOne({
      isbn: ctx.request.body.isbn
    }));

    if (bookExists) {
      ctx.response.status = 401;
      throw new Error('Book already exists');
    }

    const book = new Book(ctx.request.body);
    await book.save();
    ctx.response.status = 201;
    ctx.body = { book };
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
    ctx.body = { book };
  } catch (err) {
    ctx.body = err.message;
  }
};

const removeBook = async ctx => {
  try {
    const { id } = ctx.params;
    await Book.findByIdAndDelete(id);
    ctx.response.status = 204;
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

const getBook = async ctx => {
  try {
    const book = await Book.findById(ctx.params.id);
    ctx.body = { book };
  } catch (err) {
    ctx.body = err.message;
  }
};

module.exports = { getBooks, getBook, postBook, putBook, removeBook };
