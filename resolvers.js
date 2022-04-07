const { GraphQLUpload } = require('graphql-upload');

const { userQuery, userMutation } = require('./modules/user/user.resolver');

const { contactQuery, contactMutation } = require('./modules/contact/contact.resolver');

const userService = require('./modules/user/user.service');

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...userQuery,
    ...contactQuery,
  },
  Mutation: {
    ...userMutation,
    ...contactMutation,
  },
  Contact: {
    user: (parent) => userService.getUserById(parent.theirId),
  },
};

module.exports = resolvers;
