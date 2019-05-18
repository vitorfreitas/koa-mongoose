const KoaRouter = require("koa-router");
const { getBooks, postBook } = require("./book.controller");

const router = KoaRouter({
  prefix: "/api/books"
});

router.get("/", getBooks);
router.post("/", postBook);

module.exports = router;
