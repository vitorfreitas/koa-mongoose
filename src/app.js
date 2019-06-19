const Koa = require('koa');
const bodyParser = require('koa-body');

const router = require('./router');
const booksRouter = require('./book/book.routes');
const usersRouter = require('./user/user.routes');

const app = new Koa();

app.use(bodyParser());
app.use(router.routes());
app.use(booksRouter.routes());
app.use(usersRouter.routes());

module.exports = app;
