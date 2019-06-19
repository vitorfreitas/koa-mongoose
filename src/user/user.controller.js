const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./user.model');
const secret = process.env.JWT_SECRET;

const verifyPassword = (password, hash) => bcrypt.compare(password, hash);

const postUser = async ctx => {
  try {
    const { name, email, password } = ctx.request.body;
    const user = new User({ name, email, password });
    const token = jwt.sign({ user }, secret);
    await user.save();
    ctx.body = { user, token };
  } catch (err) {
    ctx.body = err.message;
  }
};

const login = async ctx => {
  try {
    const { email, password } = ctx.request.body;
    const user = await User.find({ email });

    if (!user) throw new Error('O usuário não existe!');

    const isMatch = await verifyPassword(password, user.password);

    if (!isMatch) throw new Error('Senha inválida!');

    const token = jwt.sign({ user }, secret);

    ctx.body = { user, token };
  } catch (err) {
    ctx.body = err.message;
  }
};

module.exports = { postUser, login };
