const jwt = require('jsonwebtoken');

const authenticate = async (ctx, next) => {
  const { authorization } = ctx.request.headers;

  try {
    if (!authorization) {
      throw new Error('Missing Authorization Header');
    }

    const [schema, token] = authorization.split(' ');

    if (!schema || !token) {
      throw new Error('Invalid Authorization Header');
    }

    if (schema !== 'Bearer') {
      throw new Error('Invalid schema');
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    ctx.state.id = decoded.id;

    return await next();
  } catch (err) {
    ctx.response.status = 401;
    ctx.body = err.message;
  }
};

module.exports = authenticate;
