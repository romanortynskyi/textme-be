const mongoose = require('mongoose');

const {
  DB_COLLECTIONS_NAMES: { CONTACT, USER: USER_COLLECTION },
} = require('../consts/db-collection-names');

const contactSchema = new mongoose.Schema({
  myId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER_COLLECTION,
  },
  theirId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER_COLLECTION,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

module.exports = mongoose.model(CONTACT, contactSchema);
