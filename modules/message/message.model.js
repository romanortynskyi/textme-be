const mongoose = require('mongoose');

const {
  DB_COLLECTIONS_NAMES: { ROOM, MESSAGE, USER },
} = require('../../consts/db-collection-names');

const messageSchema = mongoose.Schema({
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
});

module.exports = mongoose.model(MESSAGE, messageSchema);
