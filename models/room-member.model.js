const mongoose = require('mongoose');
const {
  DB_COLLECTIONS_NAMES: { ROOM_MEMBER, USER, ROOM },
} = require('../consts/db-collection-names');

const roomMemberSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ROOM,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER,
  },
});

module.exports = mongoose.model(ROOM_MEMBER, roomMemberSchema);
