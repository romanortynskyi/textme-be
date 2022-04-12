const { GraphQLUpload } = require('graphql-upload');

const { userQuery, userMutation } = require('./modules/user/user.resolver');
const { contactQuery, contactMutation } = require('./modules/contact/contact.resolver');
const { roomQuery, roomMutation } = require('./modules/room/room.resolver'); 
const { messageQuery, messageMutation } = require('./modules/message/message.resolver');

const userService = require('./modules/user/user.service');

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
    ...messageMutation
  },
  Contact: {
    user: (parent) => userService.getUserById(parent.theirId),
  },
};

module.exports = resolvers;
