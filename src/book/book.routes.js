const KoaRouter = require("koa-router");
const { get } = require("./book.controller");

const router = KoaRouter({
  prefix: "/api/books"
});

router.get("/", get);

module.exports = router;
