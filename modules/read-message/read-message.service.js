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
  async addReadMessages(input) {
    const items = input;

    const user = await User.findOne({ _id: items[0].userId }).exec();

    if (!user) {
      throw new RuleError(USER_NOT_FOUND, BAD_REQUEST);
    }

    const itemsToInsert = items.map((item) => ({
      user: item.userId,
      room: item.roomId,
      message: item.messageId,
    }));

    const readMessages = await ReadMessage.insertMany(itemsToInsert);

    return readMessages;
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
