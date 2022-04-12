const Joi = require('joi');

const createMessageValidator = Joi.object({
  userId: Joi.string()
    .min(1)
    .required(),
  text: Joi.string(),
  roomId: Joi.string()
    .required(),
});

module.exports = {
  createMessageValidator,
};
