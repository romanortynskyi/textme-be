const { GraphQLUpload } = require('graphql-upload');

const { userQuery, userMutation } = require('./modules/user/user.resolver');

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...userQuery,
  },
  Mutation: {
    ...userMutation,
  },
};

module.exports = resolvers;
