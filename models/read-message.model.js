const mongoose = require('mongoose');

const {
  DB_COLLECTIONS_NAMES: { READ_MESSAGE, MESSAGE, USER, },
} = require('../consts/db-collection-names');

const readMessageSchema = mongoose.Schema({
  message: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MESSAGE,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER,
  },
}, { timestamps: true });

module.exports = mongoose.model(READ_MESSAGE, readMessageSchema);
