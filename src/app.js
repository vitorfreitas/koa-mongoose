require('dotenv/config');
const Koa = require('koa');
const bodyParser = require('koa-body');

const router = require('./router');
const { setupMongodb } = require('./database');
const booksRouter = require('./book/book.routes');
const usersRouter = require('./user/user.routes');
const authRouter = require('./auth/auth.routes');

const app = new Koa();

setupMongodb();
app.use(bodyParser());
app.use(router.routes());
app.use(authRouter.routes());
app.use(booksRouter.routes());
app.use(usersRouter.routes());

module.exports = app;
