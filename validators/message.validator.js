const Joi = require('joi');

const createMessageValidator = Joi.object({
  userId: Joi.string()
    .min(1)
    .required(),
  text: Joi.string(),
  roomId: Joi.string()
    .required(),
});

const createTextMessageValidator = Joi.object({
  userId: Joi
    .string()
    .min(1)
    .required(),
  text: Joi
    .string()
    .min(1)
    .required(),
  roomId: Joi
    .string()
    .min(1)
    .required(),
});

const createGifMessageValidator = Joi.object({
  userId: Joi
    .string()
    .min(1)
    .required(),
  gifId: Joi
    .string()
    .uri()
    .required(),
  roomId: Joi
    .string()
    .min(1)
    .required(),
})

module.exports = {
  createMessageValidator,
  createTextMessageValidator,
  createGifMessageValidator,
};
