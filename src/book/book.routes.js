const KoaRouter = require('koa-router');
const {
  getBooks,
  getBook,
  postBook,
  putBook,
  removeBook
} = require('./book.controller');
const authenticate = require('../auth/authenticate');

const router = KoaRouter({
  prefix: '/api/books'
});

router.get('/', authenticate, getBooks);
router.get('/:id', authenticate, getBook);
router.post('/', authenticate, postBook);
router.put('/:id', authenticate, putBook);
router.delete('/:id', authenticate, removeBook);

module.exports = router;
