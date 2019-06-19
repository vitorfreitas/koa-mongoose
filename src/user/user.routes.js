const KoaRouter = require('koa-router');
const { postUser } = require('./user.controller');

const router = KoaRouter({
  prefix: '/api/users'
});

router.post('/', postUser);

module.exports = router;
