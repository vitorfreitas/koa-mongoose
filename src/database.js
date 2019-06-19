const mongoose = require('mongoose');
const mongoUrl = process.env.MONGO_URL;

const setupMongodb = () => {
  mongoose.connect(mongoUrl, { useNewUrlParser: true });

  mongoose.connection.on('connected', () => console.log('MongoDB connected!'));
};

module.exports = { setupMongodb };
