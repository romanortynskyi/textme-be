const mongoose = require('mongoose');

const {
  DB_COLLECTIONS_NAMES: { READ_MESSAGE, MESSAGE, USER, ROOM },
} = require('../consts/db-collection-names');

const readMessageSchema = mongoose.Schema({
  message: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MESSAGE,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ROOM,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER,
  },
}, { timestamps: true });

module.exports = mongoose.model(READ_MESSAGE, readMessageSchema);
