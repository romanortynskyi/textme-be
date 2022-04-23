const { GraphQLUpload } = require('graphql-upload');

const { userQuery, userMutation } = require('./modules/user/user.resolver');
const { contactQuery, contactMutation } = require('./modules/contact/contact.resolver');
const { roomQuery, roomMutation } = require('./modules/room/room.resolver'); 
const {
  messageQuery,
  messageMutation,
  messageSubscription,
} = require('./modules/message/message.resolver');
const { readMessageMutation } = require('./modules/read-message/read-message.resolver');

const userService = require('./modules/user/user.service');
const messageService = require('./modules/message/message.service');
const contactService = require('./modules/contact/contact.service');
const readMessageService = require('./modules/read-message/read-message.service');

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...userQuery,
    ...contactQuery,
    ...roomQuery,
    ...messageQuery,
  },
  Mutation: {
    ...userMutation,
    ...contactMutation,
    ...roomMutation,
    ...messageMutation,
    ...readMessageMutation,
  },
  Subscription: {
    ...messageSubscription,
  },
  Contact: {
    user: (parent) => userService.getUserById(parent.theirId),
  },
  Room: {
    latestMessage: (parent) => messageService.getMessageById(parent.latestMessage),
  },
  Message: {
    contact: (parent, _, context) => contactService.getContact(parent.user._id, context.user._id),
    isMine: (parent, _, context) => {
      return parent.user._id.toString() === context.user._id.toString()
    },
    myRead: (parent, _, context) => readMessageService.getReadMessage(parent._id, context.user._id),
  },
};

module.exports = resolvers;
