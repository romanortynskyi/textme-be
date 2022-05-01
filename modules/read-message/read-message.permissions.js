const { and } = require('graphql-shield');
const {
  inputDataValidation,
  hasRoles,
} = require('../../utils/rules');
const {
  roles: { USER, ADMIN },
} = require('../../consts');

const {
  createReadMessageValidator,
} = require('../../validators/read-message.validator');

const readMessageQueryPermissions = {
  
};

const readMessageMutationPermissions = {
  addReadMessages: and(
    hasRoles([USER]),
    // inputDataValidation(createReadMessageValidator),
  ),
};

module.exports = {
  readMessageQueryPermissions,
  readMessageMutationPermissions,
};
