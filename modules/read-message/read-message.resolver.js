const readMessageService = require('./read-message.service');

const readMessageQuery = {
  
};

const readMessageMutation = {
  addReadMessages: (_, args) => readMessageService.addReadMessages(args.input),
};

module.exports = {
  readMessageQuery,
  readMessageMutation,
};
