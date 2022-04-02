const { shield } = require('graphql-shield');
const {
  userQueryPermissions,
  userMutationPermissions,
} = require('./modules/user/user.permissions');

const permissions = shield(
  {
    Query: {
      ...userQueryPermissions,
    },
    Mutation: {
      ...userMutationPermissions,
    },
  },
  {
    allowExternalErrors: true,
  }
);

module.exports = permissions;
