const { and } = require('graphql-shield');
const {
  inputDataValidation,
  hasRoles,
} = require('../../utils/rules');
const {
  roles: { USER },
} = require('../../consts');

const {
  createRoomValidator,
} = require('../../validators/room.validator');

const roomQueryPermissions = {
  getRoomsByUser: hasRoles([USER]),
  getRoomById: hasRoles([USER]),
};

const roomMutationPermissions = {
  addRoom: and(
    hasRoles([USER]),
    inputDataValidation(createRoomValidator),
  ),
};

module.exports = {
  roomQueryPermissions,
  roomMutationPermissions,
};
