const { rule, and } = require('graphql-shield');

const RuleError = require('../errors/rule.error');
const { ITEM_ALREADY_EXISTS } = require('../error-messages/common.messages');
const {
  INVALID_PERMISSIONS,
  USER_NOT_AUTHORIZED,
  WRONG_CREDENTIALS,
} = require('../error-messages/user.messages');
const {
  STATUS_CODES: { FORBIDDEN, UNAUTHORIZED, BAD_REQUEST },
} = require('../consts/status-codes');

const isAuthorized = rule()((parent, args, context, info) =>
  context.user ? true : new RuleError(USER_NOT_AUTHORIZED, UNAUTHORIZED)
);

const hasRoles = roles =>
  and(
    isAuthorized,
    rule()((parent, args, context, info) =>
      roles.includes(context.user.role)
        ? true
        : new RuleError(INVALID_PERMISSIONS, FORBIDDEN)
    )
  );

const isTheSameUser = and(
  isAuthorized,
  rule()((parent, args, context, info) =>
    `${context.user._id}` === args.id
      ? true
      : new RuleError(WRONG_CREDENTIALS, UNAUTHORIZED)
  )
);

const inputDataValidation = (validationSchema) =>
  rule()((_, args) => {
    const { error } = validationSchema.validate(args.input);

    if (error) {
      return new RuleError(error.details[0].message, FORBIDDEN);
    }

    return true;
  });

const checkIfItemExists = (data, currentModel) =>
  rule()(async (_, args) => {
    const foundItem = await currentModel
      .findOne({
        name: {
          $elemMatch: {
            $or: args[data].name.map(({ value }) => ({ value })),
          },
        },
      })
      .exec();

    if (foundItem) {
      return new RuleError(ITEM_ALREADY_EXISTS, BAD_REQUEST);
    }
    return true;
  });

module.exports = {
  hasRoles,
  isAuthorized,
  // isUnlocked,
  isTheSameUser,
  inputDataValidation,
  checkIfItemExists,
};
