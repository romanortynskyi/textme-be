const { shield } = require('graphql-shield');
const {
  userQueryPermissions,
  userMutationPermissions,
} = require('./modules/user/user.permissions');
const {
  contactQueryPermissions,
  contactMutationPermissions,
} = require('./modules/user/user.permissions');

const permissions = shield(
  {
    Query: {
      ...userQueryPermissions,
      ...contactQueryPermissions,
    },
    Mutation: {
      ...userMutationPermissions,
      ...contactMutationPermissions,
    },
  },
  {
    allowExternalErrors: true,
  }
);

module.exports = permissions;
