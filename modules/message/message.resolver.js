const messageService = require('./message.service');

const messageQuery = {
  
};

const messageMutation = {
  addMessage: (_, args) => messageService.addMessage(args.input),
};

module.exports = {
  messageQuery,
  messageMutation,
};
