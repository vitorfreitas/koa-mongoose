const Koa = require("koa");
const bodyParser = require("koa-body");

const router = require("./router");
const booksRouter = require("./book/book.routes");

const app = new Koa();

app.use(bodyParser());
app.use(router.routes());
app.use(booksRouter.routes());

module.exports = app;
