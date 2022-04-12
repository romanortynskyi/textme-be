const messageService = require('./message.service');

const messageQuery = {
  getMessagesByRoom: (_, args, context) => messageService.getMessagesByRoom(args.id, context.user),
};

const messageMutation = {
  addMessage: (_, args) => messageService.addMessage(args.input),
};

module.exports = {
  messageQuery,
  messageMutation,
};
