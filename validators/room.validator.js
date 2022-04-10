const Joi = require('joi');

const createRoomValidator = Joi.object({
  name: Joi.string()
    .min(1)
    .required(),
  members: Joi.array()
    .items(Joi.string()),
});

module.exports = {
  createRoomValidator,
};
