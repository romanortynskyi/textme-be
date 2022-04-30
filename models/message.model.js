const mongoose = require('mongoose');

const {
  DB_COLLECTIONS_NAMES: { ROOM, MESSAGE, USER },
} = require('../consts/db-collection-names');

const messageSchema = mongoose.Schema({
  type: {
    type: String,
  },
  text: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ROOM,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model(MESSAGE, messageSchema);
