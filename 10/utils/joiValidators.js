const Joi = require('joi');

const { enums } = require('../constants');

const PASSWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;

/**
 * Validate create user data.
 */
exports.createUserValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      birthyear: Joi.number().min(1940).required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
      role: Joi.string().valid(...Object.values(enums.USER_ROLES_ENUM)),
    })
    .validate(data);

/**
 * Validate update user data.
 */
exports.updateUserValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().max(30),
      email: Joi.string().email(),
      birthyear: Joi.number().min(1940),
      role: Joi.string().valid(...Object.values(enums.USER_ROLES_ENUM)),
    })
    .validate(data);

/**
 * Validate signup user data.
 */
exports.signupUserValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      birthyear: Joi.number().min(1940).required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
    })
    .validate(data);

/**
 * Login validator
 */
exports.loginValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(1).max(128).required(),
    })
    .validate(data);

/**
 * Validate update me data.
 */
exports.updateMeValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().max(30),
      email: Joi.string().email(),
      birthyear: Joi.number().min(1940),
      photo: Joi.object(),
    })
    .validate(data);

/**
 * Validate update my password.
 */
exports.updateMyPasswordValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      passwordNew: Joi.string().regex(PASSWD_REGEX).required(),
      passwordCurrent: Joi.string().min(1).max(128).required(),
    })
    .validate(data);
