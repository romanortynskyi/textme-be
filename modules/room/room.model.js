const mongoose = require('mongoose');

const {
  DB_COLLECTIONS_NAMES: { ROOM },
} = require('../../consts/db-collection-names');

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
});

module.exports = mongoose.model(ROOM, roomSchema);
