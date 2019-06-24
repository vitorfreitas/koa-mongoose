const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../user/user.model');
const secret = process.env.JWT_SECRET;

const verifyPassword = (password, hash) => bcrypt.compare(password, hash);

const register = async ctx => {
  try {
    const userExists = !!(await User.findOne({
      email: ctx.request.body.email
    }));

    if (userExists) {
      ctx.response.status = 401;
      throw new Error('User already exists!');
    }

    const newUser = new User(ctx.request.body);
    await newUser.save();

    const user = { ...{ ...newUser }._doc };
    delete user.password;

    ctx.response.status = 201;
    ctx.body = { user };
  } catch (err) {
    ctx.body = err.message;
  }
};

const login = async ctx => {
  try {
    const { email, password } = ctx.request.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      ctx.response.status = 401;
      throw new Error("User doesn't exists!");
    }

    const isMatch = await verifyPassword(password, user.password);

    if (!isMatch) {
      ctx.response.status = 401;
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user._id }, secret);

    ctx.body = { token };
  } catch (err) {
    ctx.body = err.message;
  }
};

module.exports = { register, login };
