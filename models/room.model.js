const mongoose = require('mongoose');

const {
  DB_COLLECTIONS_NAMES: { ROOM, MESSAGE },
} = require('../consts/db-collection-names');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    src: {
      type: String,
    },
    filename: {
      type: String,
    },
  },
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MESSAGE,
    default: null,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model(ROOM, roomSchema);
