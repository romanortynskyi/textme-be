const RuleError = require('../../errors/rule.error');
const User = require('../../models/user.model');
const Contact = require('../../models/contact.model');
const Room = require('../../models/room.model');
const Message = require('../../models/message.model');
const {
  USER_NOT_FOUND,
} = require('../../error-messages/user.messages');
const {
  STATUS_CODES: { BAD_REQUEST },
} = require('../../consts/status-codes');
const pubsub = require('../../pubsub');

class MessageService {
  async addMessage(input) {
    const {
      type,
      text,
      roomId,
      userId,
    } = input;

    const room = await Room.findById(roomId).exec();

    let message = await Message.create({
      type,
      text,
      room: roomId,
      user: userId,
    });

    message = await message.populate(['user', 'room']);

    room.latestMessage = message._id;

    await room.save();

    pubsub.publish('MESSAGE_CREATED', {
      messageCreated: {
        ...message._doc,
      },
    });

    return message._doc;
  }

  async getMessagesByRoom(id, user) {
    const myId = user._id;

    const messages = await Message
      .find({ room: id })
      .populate(['user', 'room'])
      .exec();
    
    const userIds = [...new Set(messages.map((message) => message.user._id))];

    const contacts = await Contact.find({
      myId,
      theirId: {
        '$in': userIds,
      }
    }).exec();

    const result = messages.map((message) => {
      const contact = contacts.find(contact => contact.theirId.toString() === message.user._id.toString())

      const isMine = message.user._id.toString() === myId.toString();

      return {
        ...message._doc,
        contact,
        isMine,
      };
    });    

    return result;
  }

  async getMessageById(id) {
    const message = await Message
      .findById(id)
      .populate('user')
      .exec();

    return message;
  }
};

module.exports = new MessageService();
