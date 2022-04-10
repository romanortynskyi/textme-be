const { GraphQLUpload } = require('graphql-upload');

const { userQuery, userMutation } = require('./modules/user/user.resolver');
const { contactQuery, contactMutation } = require('./modules/contact/contact.resolver');
const { roomQuery, roomMutation } = require('./modules/room/room.resolver'); 

const userService = require('./modules/user/user.service');

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...userQuery,
    ...contactQuery,
    ...roomQuery,
  },
  Mutation: {
    ...userMutation,
    ...contactMutation,
    ...roomMutation,
  },
  Contact: {
    user: (parent) => userService.getUserById(parent.theirId),
  },
};

module.exports = resolvers;
