const readMessageService = require('./read-message.service');

const readMessageQuery = {
  
};

const readMessageMutation = {
  addReadMessage: (_, args) => readMessageService.addReadMessage(args.input),
};

module.exports = {
  readMessageQuery,
  readMessageMutation,
};
