const {
  inputDataValidation,
  hasRoles,
} = require('../../utils/rules');
const {
  roles: { ADMIN },
} = require('../../consts');
const {
  createUserValidator,
  loginUserValidator,
  updateUserValidator,
} = require('../../validators/user.validator');

const userQueryPermissions = {
  getAllUsers: hasRoles([ADMIN]),
  getUserById: hasRoles([ADMIN]),
};

const userMutationPermissions = {
  signUp: inputDataValidation(createUserValidator),
  login: inputDataValidation(loginUserValidator),
  updateUser: inputDataValidation(updateUserValidator),
};

module.exports = {
  userQueryPermissions,
  userMutationPermissions,
};
