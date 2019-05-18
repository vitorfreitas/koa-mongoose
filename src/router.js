const KoaRouter = require("koa-router");

const router = KoaRouter();

router.get("/", ctx => (ctx.body = { message: "Hello Koa" }));

module.exports = router;
