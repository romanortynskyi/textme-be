const Joi = require('joi');

const createReadMessageValidator = Joi.object({
  messageId: Joi.string()
    .min(1)
    .required(),
  userId: Joi.string()
    .min(1)
    .required(),
});

module.exports = {
  createReadMessageValidator,
};
