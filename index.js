require('dotenv/config');

const app = require('./src/app');
const { setupMongodb } = require('./src/database');
const port = process.env.PORT || 3000;

setupMongodb();

app.listen(port, () => console.log(`Listening on ${port}`));
