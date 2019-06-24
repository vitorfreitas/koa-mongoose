const KoaRouter = require('koa-router');
const { register, login } = require('./auth.controller');

const router = KoaRouter({
  prefix: '/api'
});

router.post('/register', register);
router.post('/login', login);

module.exports = router;
