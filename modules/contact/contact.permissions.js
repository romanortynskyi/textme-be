const { and } = require('graphql-shield');
const {
  inputDataValidation,
  hasRoles,
} = require('../../utils/rules');
const {
  roles: { USER, ADMIN },
} = require('../../consts');

const {
  createContactValidator,
} = require('../../validators/contact.validator');

const contactQueryPermissions = {
  getContactsByUser: hasRoles([USER, ADMIN]),
};

const contactMutationPermissions = {
  addContact: and(
    hasRoles([USER]),
    inputDataValidation(createContactValidator),
  ),
};

module.exports = {
  contactQueryPermissions,
  contactMutationPermissions,
};
