const Joi = require('joi');

/**
 * Validate create user data.
 */
exports.createUserValidator = (data) => Joi.object({
  name: Joi.string().min(2).max(10).required(),
  year: Joi.number().min(1940).required(),
}).validate(data);
