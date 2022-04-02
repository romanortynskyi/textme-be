const mongoose = require('mongoose');

const connectDB = async () => {
  const { MONGO_URL } = process.env;
  let connection = null;

  try {
    await mongoose.connect(MONGO_URL);
    connection = mongoose.createConnection(MONGO_URL);

    console.info('Connected to DB');
  } catch (err) {
    console.error(`Error connecting to DB: ${err.message}`);
  }

  return connection;
};

module.exports = connectDB;
