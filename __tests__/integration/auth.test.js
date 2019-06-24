const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const app = require('../../src/app');
const User = require('../../src/user/user.model');

const jwtVerifyAsync = promisify(jwt.verify);

describe('Route: Users Auth', () => {
  const server = app.callback();
  const defaultUser = {
    __v: 0,
    name: 'Vitor',
    email: 'vitor@gmail.com',
    password: '123'
  };

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  describe('POST /api/register', () => {
    it('should return a new user with status code 201', async done => {
      const customId = '56cb91bdc3464f14678934ba';
      const newUser = {
        _id: customId,
        ...defaultUser
      };
      const expectedSavedUser = {
        __v: 0,
        _id: customId,
        name: 'Vitor',
        email: 'vitor@gmail.com'
      };

      const response = await request(server)
        .post('/api/register')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body.user).toEqual(expectedSavedUser);
      done();
    });

    it('should return 401 if the user already exists', async done => {
      await User.create(defaultUser);

      const response = await request(server)
        .post('/api/register')
        .send(defaultUser);

      expect(response.status).toBe(401);
      expect(response.text).toBe('User already exists!');
      done();
    });
  });

  describe('POST /api/login', () => {
    beforeEach(async () => {
      await User.create(defaultUser);
    });

    afterAll(async () => {
      await User.deleteMany();
    });

    it('should return a valid jwt token with code 200', async done => {
      const secret = process.env.JWT_SECRET;

      const response = await request(server)
        .post('/api/login')
        .send(defaultUser);

      const decoded = await jwtVerifyAsync(response.body.token, secret);

      expect(response.status).toBe(200);
      expect(decoded.id).toBeTruthy();
      done();
    });

    it('should return 401 if the password is invalid', async done => {
      const response = await request(server)
        .post('/api/login')
        .send({
          ...defaultUser,
          password: 'some incorrect password'
        });

      expect(response.status).toBe(401);
      expect(response.text).toBe('Invalid password');
      done();
    });

    it('should return 401 if the user does not exists', async done => {
      await User.deleteMany();
      const response = await request(server)
        .post('/api/login')
        .send(defaultUser);

      expect(response.status).toBe(401);
      expect(response.text).toBe("User doesn't exists!");
      done();
    });
  });
});
