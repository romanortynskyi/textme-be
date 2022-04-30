const RuleError = require('../../errors/rule.error');
const User = require('../../models/user.model');
const ReadMessage = require('../../models/read-message.model');
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
      roomId,
    } = input;

    const user = await User.findOne({ _id: userId }).exec();

    if (!user) {
      throw new RuleError(USER_NOT_FOUND, BAD_REQUEST);
    }

    const readMessage = await ReadMessage.create({
      user: userId,
      message: messageId,
      room: roomId,
    });

    return readMessage;
  }

  async getReadMessage(messageId, userId) {
    const readMessage = await ReadMessage.findOne({
      user: userId,
      message: messageId,
    }).exec();

    return readMessage;
  }
};

module.exports = new ReadMessageService();
