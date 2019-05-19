const KoaRouter = require("koa-router");
const { getBooks, postBook, putBook } = require("./book.controller");

const router = KoaRouter({
  prefix: "/api/books"
});

router.get("/", getBooks);
router.post("/", postBook);
router.put("/:id", putBook);

module.exports = router;
