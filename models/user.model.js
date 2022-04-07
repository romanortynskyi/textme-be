const mongoose = require('mongoose');

const {
  DB_COLLECTIONS_NAMES: { USER: USER_DB },
} = require('../consts/db-collection-names');
const {
  roles: { USER, ADMIN },
} = require('../consts');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  role: {
    type: String,
    enum: [USER, ADMIN],
    default: USER,
  },
  email: {
    type: String,
    lowercase: true,
  },
  phoneNumber: String,
  password: String,
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(USER_DB, userSchema);
