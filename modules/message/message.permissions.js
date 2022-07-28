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

  createTextMessageValidator,
  createGifMessageValidator,
} = require('../../validators/contact.validator');

const messageQueryPermissions = {
  getMessagesByRoom: hasRoles([USER]),
};

const messageMutationPermissions = {
  addTextMessage: and(
    hasRoles([USER]),
    inputDataValidation(createTextMessageValidator),
  ),
  addGifMessage: and(
    hasRoles([USER]),
    inputDataValidation(createGifMessageValidator),
  ),
};

module.exports = {
  messageQueryPermissions,
  messageMutationPermissions,
};
