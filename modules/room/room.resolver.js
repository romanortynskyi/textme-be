const roomService = require('./room.service');

const roomQuery = {
  getRoomsByUser: (_, args) => roomService.getRoomsByUser(args.id),
  getRoomById: (_, args, context) => roomService.getRoomById(args.id, context.user._id),
};

const roomMutation = {
  addRoom: (_, args) => roomService.addRoom(args.input, args.image),
};

module.exports = {
  roomQuery,
  roomMutation,
};
