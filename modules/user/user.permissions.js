const {
  inputDataValidation,
  hasRoles,
} = require('../../utils/rules');
const {
  roles: { ADMIN, USER },
} = require('../../consts');
const {
  createUserValidator,
  loginUserValidator,
  updateUserValidator,
} = require('../../validators/user.validator');

const userQueryPermissions = {
  getAllUsers: hasRoles([ADMIN]),
  getUserById: hasRoles([ADMIN]),
  getUserByPhoneNumber: hasRoles([USER]),
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
