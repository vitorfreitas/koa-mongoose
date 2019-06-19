const mongoose = require('mongoose');
const { mongoUrl } = require('../credentials/database.json');

const setupMongodb = () => {
  mongoose.connect(mongoUrl, { useNewUrlParser: true });

  mongoose.connection.on('connected', () => console.log('MongoDB connected!'));
};

module.exports = { setupMongodb };
