const Joi = require('joi');

/**
 * Validate create user data.
 */
exports.createUserValidator = (data) => Joi.object().keys({
  name: Joi.string().min(2).max(10),
  email: Joi.string(),
  birthyear: Joi.number().min(1940).required(),
  password: Joi.string().min(4),
  role: Joi.string()
}).validate(data);
