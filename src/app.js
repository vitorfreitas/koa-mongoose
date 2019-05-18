const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const router = require("./router");
const booksRouter = require("./book/book.routes");

const app = new Koa();

app.use(router.routes());
app.use(booksRouter.routes());
app.use(bodyParser());

module.exports = app;
