const RuleError = require('../../errors/rule.error');
const User = require('../../models/user.model');
const Contact = require('../../models/contact.model');
const {
  USER_NOT_FOUND,
} = require('../../error-messages/user.messages');
const {
  STATUS_CODES: { BAD_REQUEST },
} = require('../../consts/status-codes');

class ReadMessageService {
  async addReadMessage(input) {
    const {
      userId,
      messageId,
    } = input;

    const user = await User.findOne({ _id: userId }).exec();

    if (!user) {
      throw new RuleError(USER_NOT_FOUND, BAD_REQUEST);
    }

    
  }
};

module.exports = new ReadMessageService();
