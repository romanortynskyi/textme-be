const RuleError = require('../../errors/rule.error');
const User = require('../../models/user.model');
const Contact = require('./contact.model');
const {
  USER_NOT_FOUND,
} = require('../../error-messages/user.messages');
const {
  STATUS_CODES: { BAD_REQUEST },
} = require('../../consts/status-codes');

class ContactService {
  async addContact(input) {
    const {
      firstName,
      lastName,
      myId,
      phoneNumber,
    } = input;

    const them = await User.findOne({ phoneNumber }).exec();

    if (!them) {
      throw new RuleError(USER_NOT_FOUND, BAD_REQUEST);
    }

    const contact = await Contact.create({
      myId,
      firstName,
      lastName,
      theirId: them._id,
    });

    return contact;
  }

  async getContactsByUser(id) {
    const user = await User.findById(id).exec();

    if (!user) {
      throw new RuleError(USER_NOT_FOUND, BAD_REQUEST);
    }

    return Contact.find({ myId: id }).exec();
  }
};

module.exports = new ContactService();
