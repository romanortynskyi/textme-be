const { and } = require('graphql-shield');
const {
  inputDataValidation,
  hasRoles,
} = require('../../utils/rules');
const {
  roles: { USER },
} = require('../../consts');

const {
  createMessageValidator,
} = require('../../validators/contact.validator');

const messageQueryPermissions = {
  getMessagesByRoom: hasRoles([USER]),
};

const messageMutationPermissions = {
  addMessage: and(
    hasRoles([USER]),
    inputDataValidation(createMessageValidator),
  ),
};

module.exports = {
  messageQueryPermissions,
  messageMutationPermissions,
};
