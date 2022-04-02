const userService = require('./user.service');

const userQuery = {
  getAllUsers: (_, args) => userService.getAllUsers(args),
  getUserById: (_, args) => userService.getUserById(args.id),
  getCurrentUser: (_, __, context) => context.user,
};

const userMutation = {
  signUp: (_, args) => userService.signUp(args.input),
  login: (_, args) => userService.login(args.input),
  updateUser: (_, args) => userService.updateUser(args.id, args.input),
};

module.exports = {
  userQuery,
  userMutation,
};
