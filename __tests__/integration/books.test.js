const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../../src/app');
const Book = require('../../src/book/book.model');

describe('Route: Books', () => {
  const server = app.callback();
  const customId = '56cb91bdc3464f14678934ba';
  const authToken = jwt.sign({ id: customId }, process.env.JWT_SECRET);
  const defaultBook = {
    __v: 0,
    _id: customId,
    name: 'Learning TDD',
    author: 'Vitor',
    isbn: 123
  };

  beforeEach(async () => {
    await Book.deleteMany();
    await Book.create({ _id: customId, ...defaultBook });
  });

  afterAll(async () => {
    await Book.deleteMany();
    await mongoose.connection.close();
  });

  describe('POST /api/books', () => {
    const customId = '56cb91bdc3464f14678934ca';
    const newBook = {
      _id: customId,
      name: 'Testing POST',
      author: 'Vitor',
      isbn: 456
    };

    it('should return a new book with code 201', async done => {
      const expectedSavedBook = {
        __v: 0,
        _id: '56cb91bdc3464f14678934ca',
        name: 'Testing POST',
        author: 'Vitor',
        isbn: 456
      };

      const response = await request(server)
        .post('/api/books')
        .send(newBook)
        .set('authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(201);
      expect(response.body.book).toEqual(expectedSavedBook);
      done();
    });

    it('should return 401 status code if the books already exists', async done => {
      const response = await request(server)
        .post('/api/books')
        .send(defaultBook);

      expect(response.status).toBe(401);
      done();
    });

    it('should return 401 status code if the authentication token is not specified', async done => {
      const response = await request(server)
        .post('/api/books')
        .send(newBook);

      expect(response.status).toBe(401);
      done();
    });
  });

  describe('PUT /api/books/:id', () => {
    const updatedBook = {
      name: 'Custom name',
      _id: customId,
      __v: 0,
      ...defaultBook
    };

    it('should return the updated book with 200 status code', async done => {
      const response = await request(server)
        .put(`/api/books/${customId}`)
        .send(updatedBook)
        .set('authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.book).toEqual(updatedBook);
      done();
    });

    it('should return 401 status code if the authentication token is not specified', async done => {
      const response = await request(server)
        .put(`/api/books/${customId}`)
        .send(updatedBook);

      expect(response.status).toBe(401);
      done();
    });
  });

  describe('DELETE /api/books/:id', () => {
    it('should delete a book and return 204 status code', async done => {
      const response = await request(server)
        .delete(`/api/books/${customId}`)
        .set('authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(204);
      done();
    });

    it('should return 401 status code if the authentication token is not specified', async done => {
      const response = await request(server).delete(`/api/books/${customId}`);
      expect(response.status).toBe(401);
      done();
    });
  });

  describe('GET /api/books', () => {
    it('should return a list of books', async done => {
      const expectedBook = {
        __v: 0,
        _id: customId,
        ...defaultBook
      };

      const response = await request(server)
        .get('/api/books')
        .set('authorization', `Bearer ${authToken}`);

      expect(response.body).toEqual([expectedBook]);
      done();
    });

    it('should return a single book when an id is specified', async done => {
      const response = await request(server)
        .get(`/api/books/${customId}`)
        .set('authorization', `Bearer ${authToken}`);

      expect(response.body.book).toEqual(defaultBook);
      done();
    });

    it('should return 401 status code if the authentication token is not specified', async done => {
      const response = await request(server).get('/api/books');
      expect(response.status).toBe(401);
      done();
    });
  });
});
