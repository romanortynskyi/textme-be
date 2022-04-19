const mongoose = require('mongoose');

const {
  DB_COLLECTIONS_NAMES: { READ_MESSAGE, MESSAGE, USER, },
} = require('../consts/db-collection-names');

const readMessageSchema = mongoose.Schema({
  message: {
    type: String,
    ref: MESSAGE,
  },
  user: {
    type: String,
    ref: USER,
  },
}, { timestamps: true });

module.exports = mongoose.model(READ_MESSAGE, readMessageSchema);
