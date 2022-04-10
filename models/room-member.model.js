const mongoose = require('mongoose');
const {
  DB_COLLECTIONS_NAMES: { ROOM_MEMBER, USER, ROOM },
} = require('../consts/db-collection-names');

const roomMemberSchema = new mongoose.Schema({
  room: {
    type: String,
    ref: ROOM,
  },
  userId: {
    type: String,
    ref: USER,
  },
});

module.exports = mongoose.model(ROOM_MEMBER, roomMemberSchema);
