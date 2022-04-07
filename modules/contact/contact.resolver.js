const contactService = require('./contact.service');

const contactQuery = {
  getContactsByUser: (_, args) => contactService.getContactsByUser(args.id),
};

const contactMutation = {
  addContact: (_, args) => contactService.addContact(args.input),
};

module.exports = {
  contactQuery,
  contactMutation,
};
