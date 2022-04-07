const Joi = require('joi');

const {
  userNameRegExp,
  numberRegExp,
} = require('../consts/regexp');

const createContactValidator = Joi.object({
  myId: Joi.string()
    .min(1)
    .required(),
  firstName: Joi.string()
    .trim()
    .regex(userNameRegExp)
    .required(),
  lastName: Joi.string()
    .trim()
    .regex(userNameRegExp)
    .required(),
  phoneNumber: Joi.string()
    .trim()
    .regex(numberRegExp)
    .required(),
});

module.exports = {
  createContactValidator,
};
