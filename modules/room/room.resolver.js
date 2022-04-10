const roomService = require('./room.service');

const roomQuery = {
  getRoomsByUser: (_, args) => roomService.getRoomsByUser(args.id),
  getRoomById: (_, args) => roomService.getRoomById(args.id),
};

const roomMutation = {
  addRoom: (_, args) => roomService.addRoom(args.input, args.image),
};

module.exports = {
  roomQuery,
  roomMutation,
};
