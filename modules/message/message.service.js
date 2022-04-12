const RuleError = require('../../errors/rule.error');
const User = require('../../models/user.model');
const Contact = require('./contact.model');
const {
  USER_NOT_FOUND,
} = require('../../error-messages/user.messages');
const {
  STATUS_CODES: { BAD_REQUEST },
} = require('../../consts/status-codes');

class MessageService {
  async addMessage(input) {
    
  }
};

module.exports = new MessageService();
