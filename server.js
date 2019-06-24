require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const app = require('./src/app');
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on ${port}`));
